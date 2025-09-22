"use client"

import { Table, TableBody, TableCell, TableHeader, TableRow, TableColumn } from "@foodify/design-system/components/table";
import { useCallback, useMemo } from "react";
import TopContent from "./customs/top-content";
import { useWorkersCache } from "@/servers/main/workers";
import { TUser } from "@/types/base";
import { BottomContent } from "./customs/bottom-content";
import { NameRenderer, EmailRenderer, PhoneRenderer, RoleRenderer, JoinedAtRenderer, PasswordRenderer, ActionsRenderer } from "./customs/renderers";
import { useWorkersStore } from "@/stores/main/workers";
import { useUserMeCache } from "@/servers/base/user";
import { Spinner } from "@foodify/design-system/components/spinner";

export const columns = [
    { name: "NAME", uid: "fullname" },
    { name: "PHONE", uid: "phone" },
    { name: "ROLE", uid: "role" },
    { name: "EMAIL", uid: "email" },
    { name: "JOINED AT", uid: "joined_at" },
    { name: "PASSWORD", uid: "password" },
    { name: "ACTIONS", uid: "actions" },
];

const Body = () => {
    const { user: { data: user } } = useUserMeCache();

    const { workers: { data: workers, isLoading } } = useWorkersCache();

    const { selectedKeys, setSelectedKeys, clearSelection } = useWorkersStore();

    const cellRenderers: Record<keyof any, (user: TUser) => React.ReactNode> = {
        fullname: (user: TUser) => <NameRenderer user={user} />,
        phone: (user: TUser) => <PhoneRenderer user={user} />,
        role: (user: TUser) => <RoleRenderer user={user} />,
        email: (user: TUser) => <EmailRenderer user={user} />,
        password: (user: TUser) => <PasswordRenderer user={user} />,
        joined_at: (user: TUser) => <JoinedAtRenderer user={user} />,
        actions: (user: TUser) => <ActionsRenderer user={user} />
    };

    const renderCell = useCallback((user: TUser, columnKey: keyof any) => {
        const renderer = cellRenderers[columnKey];
        return renderer ? renderer(user) : String(user[columnKey as keyof TUser] || '-');
    }, []);

    const disabledKeys = workers?.data?.data.filter(r => r?.user_id === user?.user?.user_id).map(r => r.user_id);


    return (
        <div>
            <Table
                isHeaderSticky
                aria-label="Example table with custom cells, pagination and sorting"
                topContent={<TopContent />}
                topContentPlacement="inside"
                bottomContent={<BottomContent />}
                bottomContentPlacement="inside"
                classNames={{
                    wrapper: "max-h-[calc(100vh-100px)]",
                }}
                selectionMode="multiple"
                selectedKeys={selectedKeys === "all" ? new Set(workers?.data.data.filter((s) => s.user_id !== user?.user?.user_id).map((s) => String(s.user_id))) : selectedKeys}
                onSelectionChange={(e) => {
                    if (e === "all") {
                        setSelectedKeys(new Set(workers?.data.data.filter((s) => s.user_id !== user?.user?.user_id).map((s) => String(s.user_id))));
                    } else {
                        setSelectedKeys(e);
                    }
                }}
                disabledKeys={disabledKeys}
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "actions" ? "center" : "start"}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody isLoading={isLoading} loadingContent={<Spinner color="success" />} emptyContent={"No users found"} items={workers?.data?.data || []}>
                    {(item) => (
                        <TableRow key={item?.user_id} onClick={(e) => e.stopPropagation()}>
                            {(columnKey) => <TableCell onClick={(e) => e.stopPropagation()}>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default Body;