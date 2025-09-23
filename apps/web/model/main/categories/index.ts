import { z } from "zod";

export const categorySchema = z.object({
    category: z.string().min(2, "Category name is required").max(255, "Category name must be at most 255 characters long"),
    department_id: z.string().min(1, "Department is required").max(255, "Department must be at most 255 characters long"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;