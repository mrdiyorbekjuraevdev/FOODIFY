"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@foodify/design-system/components/modal";
import { Divider } from "@foodify/design-system/components/divider";
import { Button } from "@foodify/design-system/components/button";
import { Field, FieldProps, Form, Formik } from "formik";
import { useCallback } from "react";
import { FastField } from "formik";
import { Input } from "@foodify/design-system/components/input";
import { useCategoryModalFeatures } from "./features";
import { get } from "lodash";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useCategoryStore } from "@/stores/main/categories";
import { Select, SelectItem } from "@foodify/design-system/components/select";
import { categorySchema } from "@/model/main/categories";
import { useDepartmentsCache } from "@/servers/main/departments";



const CategoryModal = () => {
    const { modal: { open, props }, closeModal } = useCategoryStore();
    const { onAddCategory: { mutateAsync: onAddCategory, isPending }, onUpdateCategory: { mutateAsync: onUpdateCategory, isPending: isUpdatePending } } = useCategoryModalFeatures();
    const { departments: { data: departments, isLoading: isLoadingDepartments } } = useDepartmentsCache()

    const initialValues = useCallback<() => { category: string, department_id: string }>(() => {
        return {
            category: props?.category ?? "",
            department_id: props?.department_id ?? "",
        }
    }, []);


    return (
        <Modal isOpen={open} onClose={closeModal} size="xl">
            <ModalContent>
                <Formik enableReinitialize validationSchema={toFormikValidationSchema(categorySchema as any)} initialValues={initialValues()} onSubmit={(values) => get(props, "category_id") ? onUpdateCategory(values) : onAddCategory(values)}>
                    {({ isValid, dirty }) => {
                        return (
                            <Form className='space-y-4'>
                                <ModalHeader className="flex flex-col gap-1 mb-0" title={get(props, "category_id") ? "Edit Category" : "Add Category"}>
                                    {get(props, "category_id") ? "Edit Category" : "Add Category"}
                                </ModalHeader>
                                <Divider className="w-full" />
                                <ModalBody className="pt-1">
                                    <FastField name="category">
                                        {({ field, meta }: FieldProps) => (
                                            <Input
                                                label="Category name"
                                                labelPlacement="outside"
                                                variant="flat"
                                                placeholder="Enter category name"
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
                                    <Field name="department_id">
                                        {({ field, form, meta }: FieldProps) => {
                                            return (
                                                <Select
                                                    className="w-full"
                                                    radius="sm"
                                                    items={departments?.data?.data?.map(el => ({ label: el.department, key: String(el?.department_id) })) ?? []}
                                                    label="Department"
                                                    labelPlacement="outside"
                                                    placeholder="Select department"
                                                    isClearable
                                                    isLoading={isLoadingDepartments}
                                                    onSelectionChange={(keys) => {
                                                        const selectedKey = Array.from(keys)[0] ?? null;
                                                        const selectedRole = departments?.data?.data?.find(r => String(r.department_id) === selectedKey) ?? null;
                                                        form.setFieldValue(field.name, selectedRole?.department_id);
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
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={() => { closeModal() }}>
                                        Cancel
                                    </Button>
                                    <Button isDisabled={!isValid || !dirty} isLoading={isPending || isUpdatePending} type="submit" color="primary">
                                        {get(props, "category_id") ? "Save changes" : "Add Category"}
                                    </Button>
                                </ModalFooter>
                            </Form>
                        )
                    }}
                </Formik>

            </ModalContent>
        </Modal>
    )
}

export default CategoryModal
