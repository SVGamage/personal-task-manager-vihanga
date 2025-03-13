import { z } from "zod";

export const createTaskSchema = z.object({
  userId: z.string().nonempty({ message: "userId is required" }),
  title: z.string().nonempty({ message: "title is required" }),
  description: z.string().optional(),
  status: z.enum(["OPEN", "ONGOING", "COMPLETED"], {
    message: "status should be either OPEN, ONGOING or COMPLETED",
  }),
  dueDate: z
    .string({ message: "dueDate is required" })
    .datetime({ offset: true }),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"], {
    message: "priority should be either LOW, MEDIUM or HIGH",
  }),
});

export const updateTaskSchema = z.object({}).merge(createTaskSchema).partial();
