import { z } from "zod";

export const departmentSchema = z.object({
    department: z.string().min(2, "Department name is required").max(255, "Department name must be at most 255 characters long"),
    storage_id: z.string().min(1, "Storage is required").max(255, "Storage must be at most 255 characters long"),
});

export type DepartmentFormValues = z.infer<typeof departmentSchema>;