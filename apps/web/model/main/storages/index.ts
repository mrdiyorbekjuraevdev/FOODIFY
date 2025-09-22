import { z } from "zod";

export const storageSchema = z.object({
    storage: z.string().min(2, "Storage name is required").max(255, "Storage name must be at most 255 characters long"),
});

export type StorageFormValues = z.infer<typeof storageSchema>;