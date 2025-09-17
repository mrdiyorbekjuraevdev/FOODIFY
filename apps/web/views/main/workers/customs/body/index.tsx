"use client"

import { Table, TableBody, TableCell, TableHeader, TableRow, TableColumn } from "@foodify/design-system/components/table";
import { User } from "@foodify/design-system/components/user";
import { useCallback } from "react";
import TopContent from "./customs/top-content";
import { useWorkersCache } from "@/servers/main/workers";

export const columns = [
    { name: "No", uid: "worker_id" },
    { name: "NAME", uid: "worker" },
    { name: "ACTIONS", uid: "actions" },
];

const WorkerUserCell = ({ user }: { user: any }) => (
    <User
        avatarProps={{
            radius: "lg",
            src: user.avatar,
            fallback: user.worker?.charAt(0) || "U"
        }}
        description={user.phone}
        name={user.worker}
    >
        {user.phone}
    </User>
);

const Body = () => {
    const { workers: { data: workers } } = useWorkersCache();

    // ! TODO: i should update types 
    const cellRenderers: Record<keyof any, (user: any) => React.ReactNode> = {
        worker_id: (user) => <p className="text-sm font-medium">{user.worker_id}</p>,
        worker: (user) => <WorkerUserCell user={user} />,
        actions: (user) => <p>actions</p>,
    };

    const renderCell = useCallback((user: Worker, columnKey: keyof Worker) => {
        const renderer = cellRenderers[columnKey];
        return renderer ? renderer(user) : String(user[columnKey] || '-');
    }, []);

    console.log(workers)

    return (
        <div>
            <Table
                isHeaderSticky
                aria-label="Example table with custom cells, pagination and sorting"
                bottomContentPlacement="inside"
                topContent={<TopContent />}
                classNames={{
                    wrapper: "max-h-[calc(100vh-100px)]",
                }}
                selectionMode="multiple"
                topContentPlacement="inside"
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
                <TableBody emptyContent={"No users found"} items={workers?.data ?? []}>
                    {(item) => (
                        <TableRow key={item?.user_id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default Body;