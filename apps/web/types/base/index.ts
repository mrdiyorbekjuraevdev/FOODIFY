
import { ReactNode, JSX } from "react";

export type PermissionAction = "read" | "add" | "delete" | "update";

export type TRoutes = {
    id: number | string;
    path?: string;
    title?: string;
    isPath?: boolean;
    element?: React.ReactElement | Element | JSX.Element | ReactNode;
    shouldHideWhenClosed?: boolean;
    icon?: ReactNode;
    hasChild?: boolean;
    children?: TRoutes[];
    resource?: string;
    actions?: PermissionAction | PermissionAction[];
};

export type PermissionsMap = Record<string, PermissionAction[]>;

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

export type TUserRole =
    | "MANAGER"
    | "HOSTESS"
    | "CASHIER"
    | "ACCOUNTANT"
    | "WAITER"
    | "BARMEN"
    | "COOK"
    | "RUNNER";

export type TUser = {
    user_id: string;
    username: string;
    email: string;
    fullname: string;
    phone: string;
    profile_picture?: string;
    role: string;
    status?: TUserStatus;
    password?: string;
    joined_at?: string;
    permissions?: PermissionsMap;
    current_branch: string;
    branch_id?: string;
}

export type TUserMe = {
    user: TUser;
    permissions: TPermission[];
    branches: TBranch[];
    role: TUserRole;
}

export type TData<T> = {
    data: {
        data: T;
        pagination: {
            current_page: number;
            pageSize: number;
            total: number;
            total_pages: number;
        };
    };
    message: string;
    status: number;
};

export type TDataSingle<T> = {
    data: T;
    message: string;
    status: number;
};