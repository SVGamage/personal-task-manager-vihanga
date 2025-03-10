import { z } from "zod";

export const createTaskLogSchema = z.object({
  taskId: z.string().nonempty({ message: "taskId is required" }),
  userId: z.string().nonempty({ message: "userId is required" }),
  action: z.enum(["CREATED", "UPDATED", "DELETED"], {
    message: "action should be either CREATED, UPDATED or DELETED",
  }),
});

export const updateTaskLogSchema = z
  .object({})
  .merge(createTaskLogSchema)
  .partial();
