"use client"
import React from 'react'
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
} from "@foodify/design-system/components/table";
import { roles } from '@/mocks/main/roles';
import { Header } from '../header';
import { useRouter } from 'next/navigation';

const columns = [
    {
        key: "title",
        label: "Title",
    },
    {
        key: "description",
        label: "Description",
    },
];

const Body = () => {
    const { push } = useRouter()
    return (
        <div>
            <Table topContent={<Header />} aria-label="Example table with dynamic content">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={roles}>
                    {(item) => (
                        <TableRow onClick={() => push(`/roles/${item.id}`)} className='hover:bg-[var(--fe-backgorund-hover)] !rounded-md cursor-pointer transition-all duration-250 ease-in-out' key={item.id}>
                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default Body
