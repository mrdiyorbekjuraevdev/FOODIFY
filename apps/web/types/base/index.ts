export type TBranch = {
    branch_id: string;
    branch: string;
    user_id: string;
    branch_pass: string;
    img: string | null;
    contact_number: string | null;
    address: string | null;
    open_time: string | null;
    close_time: string | null;
    longitude: string | null;
    latitude: string | null;
    description: string | null;
    status: number;
};

type TRole = {
    role_id: string;
    role: string;
    description?: string;
}

type TPermission = {
    permission: string;
    actions: ("read" | "write" | "delete" | "update" | "manage")[];
}

type TUserStatus = "active" | "inactive" | "suspended" | "on_leave";

export type TUser = {
    user_id: string;
    username: string;
    email: string;
    fullname: string;
    phone: string;
    profile_picture?: string;
    role: TRole;
    status: TUserStatus;
    created_at: Date;
    updated_at: Date;
    last_login?: Date;
    department?: string;
    employment_type: "full_time" | "part_time" | "contract";
    shift?: {
        start_time: string;
        end_time: string;
    };
}

export type TUserMe = {
    user: TUser;
    permissions: TPermission[];
    branches: TBranch[];
    roles: TRole[];
}

export type TData<T> = {
    data: T;
    message: string;
    status: number;
}