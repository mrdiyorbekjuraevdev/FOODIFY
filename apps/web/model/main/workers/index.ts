import { z } from "zod";

export const workerSchema = z.object({
    fullname: z.string().min(1, "Full name is required"),
    phone: z.string().min(1, "Phone is required"),
    email: z.string().email("Invalid email").optional(),
    password: z.string().min(1, "Password is required"),
    role: z.string().min(1, "Role is required"),
    branch_id: z.string(),
    permissions: z.any(),
});

export type WorkerFormValues = z.infer<typeof workerSchema>;