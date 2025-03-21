import prisma from "@/lib/prisma";

export default class TaskLogService {
  public static async getAllTaskLogs(userId: string) {
    return prisma.taskLog.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  public static async deleteTaskLog(taskLogId: string, userId: string) {
    return prisma.taskLog.delete({
      where: {
        id: taskLogId,
        userId,
      },
    });
  }
}
