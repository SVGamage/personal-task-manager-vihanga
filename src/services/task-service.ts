import { Priority, Status } from "@/app/types";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { InputJsonValue } from "@prisma/client/runtime/library";

export default class TaskService {
  public static async getAllTasks(userId: string) {
    return prisma.task.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        title: true,
      },
    });
  }
  public static async getAllTasksWithCategory(pipeline: InputJsonValue[]) {
    return prisma.task.aggregateRaw({ pipeline });
  }

  public static async createNewTask(
    newTask: Prisma.TaskCreateManyInput,
    userId: string
  ) {
    return prisma.$transaction(async (tx) => {
      const task = await tx.task.create({
        data: newTask,
      });

      await tx.taskLog.create({
        data: {
          taskId: task.id,
          userId,
          title: "Task Created",
          action: "CREATED",
        },
      });

      return task;
    });
  }

  public static async updateTask(
    id: string,
    userId: string,
    updatedTask: Prisma.TaskUpdateInput
  ) {
    return prisma.$transaction(async (tx) => {
      const task = await tx.task.update({
        where: {
          id,
          userId,
        },
        data: updatedTask,
      });

      await tx.taskLog.create({
        data: {
          taskId: task.id,
          userId,
          title: "Task Updated",
          action: "UPDATED",
        },
      });

      return task;
    });
  }

  public static async updateStatusOrPriority(
    id: string,
    userId: string,
    valueType: "Status" | "Priority",
    value: Status | Priority
  ) {
    return prisma.$transaction(async (tx) => {
      const task = await tx.task.update({
        where: {
          id,
          userId,
        },
        data: {
          [valueType.toLowerCase()]: value,
        },
      });

      await tx.taskLog.create({
        data: {
          userId,
          taskId: task.id,
          title: `Task ${valueType} Updated`,
          action: "UPDATED",
        },
      });

      return task;
    });
  }

  public static async deleteTask(taskId: string, userId: string) {
    return prisma.$transaction(async (tx) => {
      await tx.taskCategory.deleteMany({
        where: {
          taskId,
        },
      });
      const task = await tx.task.delete({
        where: {
          userId,
          id: taskId,
        },
      });
      await tx.taskLog.create({
        data: {
          userId,
          taskId: task.id,
          title: `${task.title} task deleted`,
          action: "DELETED",
        },
      });

      return task;
    });
  }
}
