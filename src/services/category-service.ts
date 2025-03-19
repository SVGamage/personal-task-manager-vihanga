import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export default class CategoryService {
  public static async getAllCategories(userId: string) {
    return prisma.category.findMany({
      where: {
        userId,
      },
      include: {
        _count: {
          select: { TaskCategory: true },
        },
      },
    });
  }

  public static async createNewCategory(
    newCategory: Prisma.CategoryCreateManyInput
  ) {
    return prisma.category.create({
      data: newCategory,
    });
  }
}
