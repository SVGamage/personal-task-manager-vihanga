"use server";

import { createTask } from "@/components/new-task-modal";
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
import { authenticateAndGetUser } from "@/services/auth-service";
import TaskService from "@/services/task-service";
import CategoryService from "@/services/category-service";
import TaskCategoryService from "@/services/task-category-service";
import TaskLogService from "@/services/task-log-service";
import UserService from "@/services/user-service";
import { UpdateCategoryFormValues } from "@/components/update-category-modal";

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
    const tasks = await TaskService.getAllTasksWithCategory(pipeline);
    return tasks as unknown as TaskWithCategory[];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const createNewTask = async (formData: createTask) => {
  try {
    const user = await authenticateAndGetUser();
    const newTask = {
      userId: user.id,
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      priority: formData.priority,
      status: formData.status,
    };
    const result = await TaskService.createNewTask(newTask, user.id);
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
    const categories: CategoryWithTaskCount[] =
      await CategoryService.getAllCategories(user.id);
    return categories;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const createNewCategory = async (formData: CreateCategoryFormValues) => {
  try {
    const user = await authenticateAndGetUser();
    const newCategory = {
      userId: user.id,
      name: formData.name,
      description: formData.description,
    };
    const category = await CategoryService.createNewCategory(newCategory);
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
    const tasks = await TaskService.getAllTasks(user.id);
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
    const newTaskCategories = await TaskCategoryService.createTaskCategories(
      taskCategories
    );
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
    const taskLogs = await TaskLogService.getAllTaskLogs(user.id);
    return taskLogs;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const deleteTaskLog = async (taskLogId: string) => {
  try {
    const user = await authenticateAndGetUser();
    const result = await TaskLogService.deleteTaskLog(taskLogId, user.id);
    revalidatePath("/logs");
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
};
export const getTasksByCategory = async ({
  categoryId,
}: {
  categoryId: string;
}) => {
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

    const tasks = await TaskCategoryService.getTasksByCategory(pipeline);
    return tasks as unknown as TaskWithCategory[];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const createUser = async (clerkUserId: string) => {
  try {
    const user = await UserService.createUser(clerkUserId);
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
    const updatedTask = {
      title: formValues.title,
      description: formValues.description,
      dueDate: formValues.dueDate,
      priority: formValues.priority,
      status: formValues.status,
    };
    const result = await TaskService.updateTask(taskId, user.id, updatedTask);
    revalidatePath("/tasks");
    revalidatePath("/logs");
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const updateCategory = async (
  categoryId: string,
  formValues: UpdateCategoryFormValues
) => {
  try {
    const user = await authenticateAndGetUser();
    const updatedCategory = {
      name: formValues.name,
      description: formValues.description,
    };
    const result = await CategoryService.updateCategory(
      categoryId,
      user.id,
      updatedCategory
    );
    revalidatePath("/categories");
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const deleteCategory = async (categoryId: string) => {
  try {
    const user = await authenticateAndGetUser();
    const result = await CategoryService.deleteCategory(categoryId, user.id);
    revalidatePath("/categories");
    revalidatePath("/tasks");
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
    const result = await TaskService.updateStatusOrPriority(
      taskId,
      user.id,
      valueType,
      value
    );
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
    const result = await TaskService.deleteTask(taskId, user.id);
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
    const result = await TaskCategoryService.deleteTaskCategory(
      taskId,
      categoryId
    );
    revalidatePath("/tasks");
    revalidatePath(`/categories/${categoryId}`);
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
};
