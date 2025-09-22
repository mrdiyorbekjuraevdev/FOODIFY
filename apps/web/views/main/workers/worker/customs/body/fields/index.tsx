"use client"
import React, { memo, useCallback } from 'react'
import { FastField, Field, FieldProps, useFormikContext } from 'formik'
import { Input } from '@foodify/design-system/components/input'
import { EyeClosed, MailIcon, Phone } from 'lucide-react'
import { EyeIcon } from '@/assets/icons/signin.icons'
import { Table, TableBody, TableCell, TableHeader, TableRow, TableColumn } from "@foodify/design-system/components/table"
import { Checkbox } from "@foodify/design-system/components/checkbox"
import { Typography } from '@foodify/design-system/components/typography';
import { Select, SelectItem } from "@foodify/design-system/components/select";
import { roles } from '@/mocks/main/roles'
import { useBranchesCache } from '@/servers/base/branches'
import { WorkerFormValues } from '@/model/main/workers'


export const permissions = [
    { permission: "branch", actions: ["read", "add", "delete", "update"] },
    { permission: "cashbox", actions: ["read", "add", "delete", "update"] },
    { permission: "category", actions: ["read", "add", "delete", "update"] },
    { permission: "composition", actions: ["read", "add", "delete", "update"] },
    { permission: "compoundIngredient", actions: ["read", "add", "delete", "update"] },
    { permission: "department", actions: ["read", "add", "delete", "update"] },
    { permission: "food", actions: ["read", "add", "delete", "update"] },
    { permission: "ingredient", actions: ["read", "add", "delete", "update"] },
    { permission: "ingredient_group", actions: ["read", "add", "delete", "update"] },
    { permission: "invoice_group", actions: ["read", "add", "delete", "update"] },
    { permission: "modifier", actions: ["read", "add", "delete", "update"] },
    { permission: "storage", actions: ["read", "add", "delete", "update"] },
    { permission: "storage_action", actions: ["read", "add", "delete", "update"] },
    { permission: "supplier", actions: ["read", "add", "delete", "update"] },
    { permission: "user", actions: ["read", "add", "delete", "update"] }
];

export const Fields = memo(() => {
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const { branches: { data: branches, isLoading } } = useBranchesCache();

    return (
        <div className='space-y-4' >
            <div className='grid grid-cols-[repeat(auto-fit,minmax(420px,1fr))] gap-4'>
                <FastField name="fullname">
                    {({ field, meta }: FieldProps) => (
                        <Input
                            size="lg"
                            label="Full name"
                            labelPlacement="outside"
                            variant="flat"
                            placeholder="Enter your full name"
                            className="w-full"
                            radius="sm"
                            type="text"
                            {...field}
                            isRequired
                            isInvalid={Boolean(meta.error)}
                            errorMessage={meta.error}
                        />
                    )}
                </FastField>
                <FastField name="phone">
                    {({ field, meta }: FieldProps) => (
                        <Input
                            size="lg"
                            label="Phone number"
                            labelPlacement="outside"
                            variant="flat"
                            placeholder="Enter your phone number"
                            endContent={<Phone className='text-zinc-500' />}
                            className="w-full"
                            radius="sm"
                            type="tel"
                            {...field}
                            isRequired
                            isInvalid={Boolean(meta.error)}
                            errorMessage={meta.error}
                        />
                    )}
                </FastField>
                <FastField name="email">
                    {({ field, meta }: FieldProps) => (
                        <Input
                            size="lg"
                            label="Email"
                            labelPlacement="outside"
                            variant="flat"
                            placeholder="Enter your email"
                            endContent={<MailIcon className='text-zinc-500' />}
                            className="w-full"
                            radius="sm"
                            type="email"
                            {...field}
                            isInvalid={Boolean(meta.error)}
                            errorMessage={meta.error}
                        />
                    )}
                </FastField>
                <Field name="password">
                    {({ field, meta }: FieldProps) => (
                        <Input
                            size="lg"
                            label="Password"
                            labelPlacement="outside"
                            variant="flat"
                            placeholder="Enter your password"
                            endContent={
                                <button
                                    className="focus:outline-none cursor-pointer"
                                    type="button"
                                    onClick={toggleVisibility}
                                    aria-label="toggle password visibility"
                                >
                                    {isVisible ? <EyeClosed className='text-zinc-500' /> : <EyeIcon className='text-zinc-500' />}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                            className="w-full"
                            radius="sm"
                            isRequired
                            {...field}
                            isInvalid={Boolean(meta.error)}
                            errorMessage={meta.error}
                        />
                    )}
                </Field>
                <Field name="role">
                    {({ field, form, meta }: FieldProps) => {
                        return (
                            <Select
                                className="w-full"
                                size="lg"
                                items={roles.map(role => ({ label: role.title, key: String(role.id) }))}
                                label="Role"
                                labelPlacement="outside"
                                placeholder="Select role"
                                isClearable
                                onSelectionChange={(keys) => {
                                    const selectedKey = Array.from(keys)[0] ?? null;
                                    const selectedRole = roles.find(r => String(r.id) === selectedKey) ?? null;
                                    form.setFieldValue(field.name, selectedRole?.id);
                                }}
                                selectedKeys={new Set([String(field.value)])}
                                selectionMode="single"
                                isInvalid={Boolean(meta.error)}
                                errorMessage={meta.error}
                            >
                                {(role) => <SelectItem key={role.key}>{role.label}</SelectItem>}
                            </Select>
                        );
                    }}
                </Field>
                <Field name="branch_id">
                    {({ field, form, meta }: FieldProps) => {
                        return (
                            <Select
                                className="w-full"
                                size="lg"
                                items={branches?.map(el => ({ label: el.branch, key: String(el?.branch_id) }))}
                                label="Branch"
                                labelPlacement="outside"
                                placeholder="Select branch"
                                isClearable
                                isLoading={isLoading}
                                onSelectionChange={(keys) => {
                                    const selectedKey = Array.from(keys)[0] ?? null;
                                    const selectedRole = branches?.find(r => String(r.branch_id) === selectedKey) ?? null;
                                    form.setFieldValue(field.name, selectedRole?.branch_id);
                                }}
                                selectedKeys={new Set([String(field.value)])}
                                selectionMode="single"
                                isInvalid={Boolean(meta.error)}
                                errorMessage={meta.error}
                            >
                                {(role) => <SelectItem key={role.key}>{role.label}</SelectItem>}
                            </Select>
                        );
                    }}
                </Field>
            </div>
            <Typography as="h3" className="text-lg font-semibold">Permissions</Typography>
            <PermissionTable />
        </div>
    )
})

export const pageNames: Record<string, string> = {
    branch: "Branches",
    cashbox: "Cashboxes",
    category: "Categories",
    composition: "Compositions",
    compoundIngredient: "Compound Ingredients",
    department: "Departments",
    food: "Foods",
    ingredient: "Ingredients",
    ingredient_group: "Ingredient Groups",
    invoice_group: "Invoice Groups",
    modifier: "Modifiers",
    storage: "Storages",
    storage_action: "Storage Actions",
    supplier: "Suppliers",
    user: "Users",
};


export const PermissionTable = memo(() => {
    const { values } = useFormikContext<WorkerFormValues>();
    console.log(values?.permissions)

    // Build items for Table — each row = { id, actions }
    const items = Object.entries(values?.permissions || {}).map(([permission, actions]) => ({
        id: permission,
        actions: Array.isArray(actions) ? actions : [],
    }));

    // Cell renderers
    const cellRenderers: Record<string, (item: { id: string; actions: string[] }) => React.ReactNode> = {
        permission: (item) => <span className="font-medium">{pageNames[item.id]}</span>,
        read: (item) => renderCheckbox(item, "read"),
        add: (item) => renderCheckbox(item, "add"),
        delete: (item) => renderCheckbox(item, "delete"),
        update: (item) => renderCheckbox(item, "update"),
    };

    // Wrap Checkbox logic
    const renderCheckbox = useCallback(
        (item: { id: string; actions: string[] }, action: string) => (
            <Field name={`permissions.${item.id}`}>
                {({ field, form }: FieldProps) => {
                    const current: string[] = Array.isArray(field.value) ? field.value : [];
                    const isChecked = current.includes(action);

                    const handleChange = (checked: boolean) => {
                        let newValue = [...current];

                        if (action === "read") {
                            if (checked) {
                                // Add "read"
                                if (!newValue.includes("read")) newValue.push("read");
                            } else {
                                // Remove everything but KEEP the key
                                newValue = [];
                            }
                        } else {
                            if (checked) {
                                // Add action (make sure "read" is always present if other actions are selected)
                                if (!newValue.includes("read")) newValue.push("read");
                                newValue.push(action);
                            } else {
                                // Remove only this action
                                newValue = newValue.filter((a) => a !== action);
                            }
                        }

                        form.setFieldValue(field.name, newValue);
                    };

                    return (
                        <Checkbox
                            isSelected={isChecked}
                            onChange={(e) => handleChange(e.target.checked)}
                        />
                    );
                }}
            </Field>
        ),
        []
    );

    // Generic renderer
    const renderCell = useCallback(
        (item: { id: string; actions: string[] }, columnKey: string) => {
            const renderer = cellRenderers[columnKey];
            return renderer ? renderer(item) : null;
        },
        []
    );

    return (
        <Table aria-label="Permissions table" className="shadow-none">
            <TableHeader>
                <TableColumn key="permission" className="capitalize">Permission</TableColumn>
                <TableColumn key="read" className="capitalize">Read</TableColumn>
                <TableColumn key="add" className="capitalize">Add</TableColumn>
                <TableColumn key="delete" className="capitalize">Delete</TableColumn>
                <TableColumn key="update" className="capitalize">Update</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No permissions found" items={items}>
                {(item) => (
                    <TableRow key={item.id} onClick={(e) => e.stopPropagation()}>
                        {(columnKey) => (
                            <TableCell key={columnKey} onClick={(e) => e.stopPropagation()}>
                                {renderCell(item, columnKey as string)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
});