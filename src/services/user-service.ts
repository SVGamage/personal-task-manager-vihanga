import prisma from "@/lib/prisma";

export default class UserService {
  public static async getUserByClerkId(clerkUserId: string) {
    return await prisma.user.findUnique({
      where: {
        clerkUserId,
      },
    });
  }

  public static async createUser(clerkUserId: string) {
    return prisma.user.create({
      data: {
        clerkUserId,
      },
    });
  }
}
