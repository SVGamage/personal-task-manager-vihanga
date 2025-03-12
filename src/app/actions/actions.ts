"use server";

import { createTask } from "@/components/new-task-modal";
import prisma from "../../../lib/prisma";
import { CategoryWithTaskCount, TaskWithCategory } from "../types";
import { CreateCategoryFormValues } from "@/components/new-category-modal";

export const getAllTasksWithCategoryNames = async () => {
  const pipeline = [
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
    const result = await prisma.$transaction(async (tx) => {
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

      const taskLog = await tx.taskLog.create({
        data: {
          taskId: task.id,
          action: "CREATED",
        },
      });

      return task;
    });
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
