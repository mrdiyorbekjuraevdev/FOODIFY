"use client"

import { Table, TableBody, TableCell, TableHeader, TableRow, TableColumn } from "@foodify/design-system/components/table";
import { useCallback, useMemo } from "react";
import TopContent from "./customs/top-content";
import { BottomContent } from "./customs/bottom-content";
import { NameRenderer, ActionsRenderer } from "./customs/renderers";
import { Spinner } from "@foodify/design-system/components/spinner";
import { useStoragesCache } from "@/servers/main/storages";
import { TStorage } from "@/types/main/storages";
import { formatDate } from "@foodify/design-system/utilities";
import { useStorageStore } from "@/stores/main/storages";

export const columns = [
    { name: "STORAGE", uid: "storage" },
    { name: "CREATED AT", uid: "created_at" },
    { name: "ACTIONS", uid: "actions" },
];

const Body = () => {
    const { storages: { data: storages, isLoading } } = useStoragesCache();
    const { selectedKeys, setSelectedKeys } = useStorageStore();

    const cellRenderers: Record<keyof any, (item: TStorage) => React.ReactNode> = {
        storage: (storage: TStorage) => <NameRenderer storage={storage} />,
        actions: (storage: TStorage) => <ActionsRenderer storage={storage} />,
        created_at: (storage: TStorage) => <>{formatDate(storage.created_at)}</>,
    };

    const renderCell = useCallback((storage: TStorage, columnKey: keyof any) => {
        const renderer = cellRenderers[columnKey];
        return renderer ? renderer(storage) : String(storage[columnKey as keyof TStorage] || '-');
    }, []);

    return (
        <div>
            <Table
                isHeaderSticky
                aria-label="Example table with custom cells, pagination and sorting"
                bottomContentPlacement="inside"
                topContent={<TopContent />}
                bottomContent={<BottomContent />}
                classNames={{
                    wrapper: "max-h-[calc(100vh-100px)]",
                }}
                selectionMode="multiple"
                topContentPlacement="inside"
                checkboxesProps={{
                    classNames: {
                        base: "w-0"
                    }
                }}
                selectedKeys={selectedKeys === "all" ? new Set(storages?.data.data.map((s) => String(s.storage_id))) : selectedKeys}
                onSelectionChange={(e) => {
                    if (e === "all") {
                        setSelectedKeys(new Set(storages?.data.data.map((s) => String(s.storage_id))));
                    } else {
                        setSelectedKeys(e);
                    }
                }}
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "actions" ? "end" : "start"}
                            colSpan={column.uid === "actions" ? 2 : 1}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody isLoading={isLoading} loadingContent={<Spinner color="success" />} emptyContent={"No storages found"} items={storages?.data.data || []}>
                    {(item) => (
                        <TableRow key={item?.storage_id} onClick={(e) => e.stopPropagation()}>
                            {(columnKey) => <TableCell onClick={(e) => e.stopPropagation()}>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default Body;