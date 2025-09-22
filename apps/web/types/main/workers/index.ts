import { PermissionsMap } from "@/types/base";

export interface WorkerFormValues {
    fullname: string;
    phone: string;
    email: string;
    password: string;
    role: string;
    branch: string | number;
    permissions: PermissionsMap;
    current_branch: string;
    branch_id?: string;
}