import { createTaskCategories } from "@/app/types";
import prisma from "@/lib/prisma";

export default class TaskCategoryService {
  public static async createTaskCategories(
    taskCategories: createTaskCategories[]
  ) {
    return prisma.taskCategory.createMany({
      data: taskCategories,
    });
  }
  public static async deleteTaskCategory(taskId: string, categoryId: string) {
    return prisma.taskCategory.deleteMany({
      where: {
        taskId,
        categoryId,
      },
    });
  }
}
