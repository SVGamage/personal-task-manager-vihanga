import prisma from "@/lib/prisma";

export default class TaskLogService {
  public static async getAllTaskLogs(userId: string) {
    return prisma.taskLog.findMany({
      where: {
        task: {
          userId,
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
  }
}
