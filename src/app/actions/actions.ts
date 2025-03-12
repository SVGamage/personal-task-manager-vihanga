"use server";

import prisma from "../../../lib/prisma";
import { TaskWithCategory } from "../types";

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
