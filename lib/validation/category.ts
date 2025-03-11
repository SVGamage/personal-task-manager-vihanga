import { z } from "zod";

export const createCategorySchema = z.object({
  userId: z.string().nonempty({
    message: "User ID is required",
  }),
  name: z.string().nonempty({
    message: "Name is required",
  }),
  description: z.string().optional(),
});

export const updateCategorySchema = z
  .object({})
  .merge(createCategorySchema)
  .partial();
