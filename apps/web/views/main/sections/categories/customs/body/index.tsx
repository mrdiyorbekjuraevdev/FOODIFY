"use client"

import { Table, TableBody, TableCell, TableHeader, TableRow, TableColumn } from "@foodify/design-system/components/table";
import { useCallback, useMemo } from "react";
import TopContent from "./customs/top-content";
import { BottomContent } from "./customs/bottom-content";
import { NameRenderer, ActionsRenderer } from "./customs/renderers";
import { Spinner } from "@foodify/design-system/components/spinner";
import { useCategoriesCache } from "@/servers/main/categories";
import { TCategory } from "@/types/main/categories";
import { useCategoryStore } from "@/stores/main/categories";

export const columns = [
    { name: "NAME", uid: "category" },
    { name: "DEPARTMENT", uid: "department" },
    { name: "STORAGE", uid: "storage" },
    { name: "FOOD", uid: "food" },
    { name: "CREATED AT", uid: "created_at" },
    { name: "UPDATED AT", uid: "updated_at" },
    { name: "ACTIONS", uid: "actions" },
];

const Body = () => {
    const { categories: { data: categories, isLoading } } = useCategoriesCache();
    const { selectedKeys, setSelectedKeys } = useCategoryStore();

    const cellRenderers: Record<keyof any, (item: TCategory) => React.ReactNode> = {
        category: (category: TCategory) => <NameRenderer category={category} />,
        department: (category: TCategory) => <>{category?.department ?? "-"}</>,
        storage: (category: TCategory) => <>{category?.storage ?? "-"}</>,
        food: (category: TCategory) => <>{category?.food ?? "-"}</>,
        created_at: (category: TCategory) => <>{category?.created_at ?? "-"}</>,
        updated_at: (category: TCategory) => <>{category?.updated_at ?? "-"}</>,
        actions: (category: TCategory) => <ActionsRenderer category={category} />,
    }; 

    const renderCell = useCallback((category: TCategory, columnKey: keyof any) => {
        const renderer = cellRenderers[columnKey];
        return renderer ? renderer(category) : String(category[columnKey as keyof TCategory] || '-');
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
                selectedKeys={selectedKeys === "all" ? new Set(categories?.data.data.map((s) => String(s.category_id))) : selectedKeys}
                onSelectionChange={(e) => {
                    if (e === "all") {
                        setSelectedKeys(new Set(categories?.data.data.map((s) => String(s.category_id))));
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
                <TableBody isLoading={isLoading} loadingContent={<Spinner color="success" />} emptyContent={"No categories found"} items={categories?.data.data || []}>
                    {(item) => (
                        <TableRow key={item?.category_id} onClick={(e) => e.stopPropagation()}>
                            {(columnKey) => <TableCell onClick={(e) => e.stopPropagation()}>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default Body;