"use server";

import { createTask } from "@/components/new-task-modal";
import prisma from "../../lib/prisma";
import {
  CategoryWithTaskCount,
  SortField,
  Status,
  TaskWithCategory,
} from "../types";
import { CreateCategoryFormValues } from "@/components/new-category-modal";
import { Prisma } from "@prisma/client";

interface GetTasksParams {
  userId: string;
  status?: Status;
  sort?: SortField;
  skip?: number;
  take?: number;
}
export const getAllTasksWithCategoryNames = async ({
  userId,
  status,
  sort,
  skip = 0,
  take = 10,
}: GetTasksParams) => {
  const pipeline = [
    {
      $match: {
        userId: { $oid: userId },
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
  try {
    const tasks = await prisma.task.aggregateRaw({ pipeline });
    return tasks as unknown as TaskWithCategory[];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const createNewTask = async (formData: createTask) => {
  try {
    const result = await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const task = await tx.task.create({
          data: {
            userId: "67d15352c065781b4e6bf32d",
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
      }
    );
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getAllCategories = async () => {
  try {
    const categories: CategoryWithTaskCount[] = await prisma.category.findMany({
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
    const category = await prisma.category.create({
      data: {
        userId: "67d15352c065781b4e6bf32d",
        name: formData.name,
        description: formData.description,
      },
    });
    return category;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getAllTasks = async () => {
  try {
    const tasks = await prisma.task.findMany({
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
    const taskCategories = taskIds.map((taskId) => {
      return {
        taskId,
        categoryId,
      };
    });
    const newTaskCategories = await prisma.taskCategory.createMany({
      data: taskCategories,
    });
    return newTaskCategories;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const getAllTaskLogs = async () => {
  try {
    const taskLogs = await prisma.taskLog.findMany({
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
  userId,
}: {
  categoryId: string;
  userId: string;
}): Promise<TaskWithCategory[]> => {
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
              userId: { $oid: userId },
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

  try {
    const tasks = await prisma.taskCategory.aggregateRaw({ pipeline });
    return tasks as unknown as TaskWithCategory[];
  } catch (err) {
    console.error(err);
    return [];
  }
};
