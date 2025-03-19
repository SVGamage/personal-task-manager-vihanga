"use server";

import { createTask } from "@/components/new-task-modal";
import prisma from "../../lib/prisma";
import {
  CategoryWithTaskCount,
  GetTasksParams,
  Priority,
  Status,
  TaskWithCategory,
} from "../types";
import { CreateCategoryFormValues } from "@/components/new-category-modal";
import { revalidatePath } from "next/cache";
import { UpdateTaskFormValues } from "@/components/update-task-modal";
import { authenticateAndGetUser } from "@/services/auth-services";

export const getAllTasksWithCategoryNames = async ({
  status,
  sort,
  skip = 0,
  take = 20,
}: GetTasksParams) => {
  try {
    const user = await authenticateAndGetUser();
    const pipeline = [
      {
        $match: {
          userId: { $oid: user.id },
          ...(status ? { status } : {}),
        },
      },
      {
        $lookup: {
          from: "TaskCategory",
          localField: "_id",
          foreignField: "taskId",
          as: "taskCategories",
        },
      },
      {
        $lookup: {
          from: "Category",
          let: { categoryIds: "$taskCategories.categoryId" },
          pipeline: [
            {
              $match: {
                $expr: { $in: ["$_id", "$$categoryIds"] },
              },
            },
            {
              $project: {
                name: 1,
              },
            },
          ],
          as: "categories",
        },
      },
      ...(sort === "priority"
        ? [
            {
              $project: {
                title: 1,
                description: 1,
                dueDate: 1,
                priority: 1,
                status: 1,
                createdAt: 1,
                taskCategories: 1,
                categories: 1,
                priorityOrder: {
                  $switch: {
                    branches: [
                      { case: { $eq: ["$priority", "HIGH"] }, then: 3 },
                      { case: { $eq: ["$priority", "MEDIUM"] }, then: 2 },
                      { case: { $eq: ["$priority", "LOW"] }, then: 1 },
                    ],
                    default: 0,
                  },
                },
              },
            },
          ]
        : []),
      ...(sort
        ? [
            {
              $sort:
                sort === "priority"
                  ? { priorityOrder: -1 }
                  : sort === "dueDate"
                  ? { dueDate: 1 }
                  : { createdAt: -1 },
            },
          ]
        : []),
      {
        $skip: skip,
      },
      {
        $limit: take,
      },
      {
        $project: {
          id: { $toString: "$_id" },
          title: 1,
          description: 1,
          dueDate: { $toString: "$dueDate" },
          priority: 1,
          status: 1,
          createdAt: { $toString: "$createdAt" },
          categories: {
            $cond: {
              if: { $eq: [{ $size: "$categories" }, 0] },
              then: [],
              else: "$categories.name",
            },
          },
        },
      },
    ];
    const tasks = await prisma.task.aggregateRaw({ pipeline });
    return tasks as unknown as TaskWithCategory[];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const createNewTask = async (formData: createTask) => {
  try {
    const user = await authenticateAndGetUser();
    const result = await prisma.$transaction(async (tx) => {
      const task = await tx.task.create({
        data: {
          userId: user.id,
          title: formData.title,
          description: formData.description,
          dueDate: formData.dueDate,
          priority: formData.priority,
          status: formData.status,
        },
      });

      await tx.taskLog.create({
        data: {
          taskId: task.id,
          title: "Task Created",
          action: "CREATED",
        },
      });

      return task;
    });
    revalidatePath("/tasks");
    revalidatePath("/logs");
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getAllCategories = async () => {
  try {
    const user = await authenticateAndGetUser();
    const categories: CategoryWithTaskCount[] = await prisma.category.findMany({
      where: {
        userId: user.id,
      },
      include: {
        _count: {
          select: { TaskCategory: true },
        },
      },
    });
    return categories;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const createNewCategory = async (formData: CreateCategoryFormValues) => {
  try {
    const user = await authenticateAndGetUser();
    const category = await prisma.category.create({
      data: {
        userId: user.id,
        name: formData.name,
        description: formData.description,
      },
    });
    revalidatePath("/categories");
    return category;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getAllTasks = async () => {
  try {
    const user = await authenticateAndGetUser();
    const tasks = await prisma.task.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        title: true,
      },
    });
    return tasks;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const createTaskCategories = async (
  taskIds: string[],
  categoryId: string
) => {
  try {
    await authenticateAndGetUser();
    const taskCategories = taskIds.map((taskId) => {
      return {
        taskId,
        categoryId,
      };
    });
    const newTaskCategories = await prisma.taskCategory.createMany({
      data: taskCategories,
    });
    revalidatePath(`/categories/${categoryId}`);
    return newTaskCategories;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getAllTaskLogs = async () => {
  try {
    const user = await authenticateAndGetUser();
    const taskLogs = await prisma.taskLog.findMany({
      where: {
        task: {
          userId: user.id,
        },
      },
      include: {
        task: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return taskLogs;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getTasksByCategory = async ({
  categoryId,
}: {
  categoryId: string;
}): Promise<TaskWithCategory[]> => {
  try {
    const user = await authenticateAndGetUser();
    const pipeline = [
      {
        $match: {
          categoryId: { $oid: categoryId },
        },
      },
      {
        $lookup: {
          from: "Task",
          let: { taskId: "$taskId" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$taskId"] },
                userId: { $oid: user.id },
              },
            },
          ],
          as: "task",
        },
      },
      {
        $unwind: {
          path: "$task",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $lookup: {
          from: "TaskCategory",
          localField: "task._id",
          foreignField: "taskId",
          as: "taskCategories",
        },
      },
      {
        $lookup: {
          from: "Category",
          let: { categoryIds: "$taskCategories.categoryId" },
          pipeline: [
            {
              $match: {
                $expr: { $in: ["$_id", "$$categoryIds"] },
              },
            },
            {
              $project: {
                name: 1,
              },
            },
          ],
          as: "categories",
        },
      },
      {
        $project: {
          id: { $toString: "$task._id" },
          title: "$task.title",
          description: "$task.description",
          dueDate: { $toString: "$task.dueDate" },
          priority: "$task.priority",
          status: "$task.status",
          createdAt: { $toString: "$task.createdAt" },
          categories: {
            $cond: {
              if: { $eq: [{ $size: "$categories" }, 0] },
              then: [],
              else: "$categories.name",
            },
          },
        },
      },
    ];

    const tasks = await prisma.taskCategory.aggregateRaw({ pipeline });
    return tasks as unknown as TaskWithCategory[];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const createUser = async (clerkUserId: string) => {
  try {
    const user = await prisma.user.create({
      data: {
        clerkUserId,
      },
    });
    return user;
  } catch (err) {
    console.error(err);
  }
};

export const updateTask = async (
  taskId: string,
  formValues: UpdateTaskFormValues
) => {
  try {
    const user = await authenticateAndGetUser();
    const result = await prisma.$transaction(async (tx) => {
      const task = await tx.task.update({
        where: {
          userId: user.id,
          id: taskId,
        },
        data: {
          title: formValues.title,
          description: formValues.description,
          dueDate: formValues.dueDate,
          priority: formValues.priority,
          status: formValues.status,
        },
      });

      await tx.taskLog.create({
        data: {
          taskId: task.id,
          title: "Task Updated",
          action: "UPDATED",
        },
      });

      return task;
    });
    revalidatePath("/tasks");
    revalidatePath("/logs");
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const updateStatusOrPriority = async (
  taskId: string,
  valueType: "Status" | "Priority",
  value: Status | Priority
) => {
  try {
    const user = await authenticateAndGetUser();
    const result = await prisma.$transaction(async (tx) => {
      const task = await tx.task.update({
        where: {
          userId: user.id,
          id: taskId,
        },
        data: {
          [valueType.toLowerCase()]: value,
        },
      });

      await tx.taskLog.create({
        data: {
          taskId: task.id,
          title: `Task ${valueType} Updated`,
          action: "UPDATED",
        },
      });

      return task;
    });
    revalidatePath("/tasks");
    revalidatePath("/logs");
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const user = await authenticateAndGetUser();
    const result = await prisma.$transaction(async (tx) => {
      await tx.taskCategory.deleteMany({
        where: {
          taskId,
        },
      });
      await tx.taskLog.deleteMany({
        where: {
          taskId,
        },
      });
      const task = await tx.task.delete({
        where: {
          userId: user.id,
          id: taskId,
        },
      });
      await tx.taskLog.create({
        data: {
          taskId: task.id,
          title: `${task.title} task deleted`,
          action: "DELETED",
        },
      });

      return task;
    });
    revalidatePath("/tasks");
    revalidatePath("/logs");
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const deleteTaskCategory = async (
  taskId: string,
  categoryId: string
) => {
  try {
    await authenticateAndGetUser();
    const result = await prisma.taskCategory.deleteMany({
      where: {
        taskId,
        categoryId,
      },
    });
    revalidatePath("/tasks");
    revalidatePath(`/categories/${categoryId}`);
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
};
