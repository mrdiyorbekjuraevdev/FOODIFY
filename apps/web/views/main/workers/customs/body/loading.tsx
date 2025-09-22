import { Table, TableBody, TableCell, TableHeader, TableRow, TableColumn } from "@foodify/design-system/components/table"
import { columns } from ".";
import { Loading as TopContentLoading } from "../body/customs/top-content/loading";
import { Loading as BottomContentLoading } from "../body/customs/bottom-content/loading";
import { Spinner } from "@foodify/design-system/components/spinner";
import { Skeleton } from "@foodify/design-system/components/skeleton";

const Loading = () => {
    return (
        <div>
            <Table
                isHeaderSticky
                aria-label="Example table with custom cells, pagination and sorting"
                bottomContentPlacement="inside"
                topContent={<TopContentLoading />}
                bottomContent={<BottomContentLoading />}
                classNames={{
                    wrapper: "max-h-[calc(100vh-100px)]",
                }}
                selectionMode="multiple"
                topContentPlacement="inside"
                checkboxesProps={{
                    isDisabled: true,
                    classNames: {
                        base: "w-3 h-3"
                    }
                }}
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
                <TableBody isLoading emptyContent={"No users found"} items={[]}>
                    {
                        Array.from({ length: 12 }).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell colSpan={columns.length}>
                                    <Skeleton className="w-full h-8 rounded-lg" />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default Loading
