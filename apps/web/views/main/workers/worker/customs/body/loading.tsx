"use client"
import { Skeleton } from "@foodify/design-system/components/skeleton";
import { Card } from "@foodify/design-system/components/card";
import { Divider } from "@foodify/design-system/components/divider";
import { Table, TableBody, TableCell, TableHeader, TableRow, TableColumn } from "@foodify/design-system/components/table"
import { permissions } from "./fields";

const Loading = () => {
    return (
        <div>
            {/* <Skeleton className='w-[20%] h-8' /> */}
            <div className="h-full">
                <Card className="h-full p-4 space-y-4">

                    <div className="flex items-center justify-between py-2">
                        <Skeleton className='w-[20%] h-8 rounded-lg' />
                        <Skeleton className='w-[20%] h-8 rounded-lg' />
                    </div>
                    <Divider />
                    <div className="flex flex-col  gap-4">
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(420px,1fr))] gap-4">
                            <Skeleton className='w-full h-12 rounded-lg' />
                            <Skeleton className='w-full h-12 rounded-lg' />
                            <Skeleton className='w-full h-12 rounded-lg' />
                            <Skeleton className='w-full h-12 rounded-lg' />
                            <Skeleton className='w-full h-12 rounded-lg' />
                            <Skeleton className='w-full h-12 rounded-lg' />
                        </div>


                        <div>
                            <Table aria-label="Permissions table" className="shadow-none">
                                <TableHeader>
                                    <TableColumn>Permission</TableColumn>
                                    <TableColumn>Read</TableColumn>
                                    <TableColumn>Add</TableColumn>
                                    <TableColumn>Delete</TableColumn>
                                    <TableColumn>Update</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {permissions.map((permission: any) => (
                                        <TableRow key={permission.permission}>
                                            <TableCell className="capitalize font-medium">
                                                {permission?.permission}
                                            </TableCell>

                                            {permission?.actions?.map((action: string) => (
                                                <TableCell key={action}>
                                                    <Skeleton className='size-5 rounded-lg' />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Loading
