"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@foodify/design-system/components/modal";
import { Divider } from "@foodify/design-system/components/divider";
import { Button } from "@foodify/design-system/components/button";
import { Field, FieldProps, Form, Formik } from "formik";
import { useCallback } from "react";
import { FastField } from "formik";
import { Input } from "@foodify/design-system/components/input";
import { useDepartmentModalFeatures } from "./features";
import { get } from "lodash";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useDepartmentStore } from "@/stores/main/departments";
import { departmentSchema } from "@/model/main/departments";
import { Select, SelectItem } from "@foodify/design-system/components/select";
import { useStoragesCache } from "@/servers/main/storages";



const DepartmentModal = () => {
    const { modal: { open, props }, closeModal } = useDepartmentStore();
    const { onAddDepartment: { mutateAsync: onAddDepartment, isPending }, onUpdateDepartment: { mutateAsync: onUpdateDepartment, isPending: isUpdatePending } } = useDepartmentModalFeatures();
    const { storages: { data: storages, isLoading: isLoadingStorages } } = useStoragesCache();
    console.log(storages?.data?.data);

    const initialValues = useCallback<() => { department: string, storage_id: string }>(() => {
        return {
            department: props?.department ?? "",
            storage_id: props?.storage_id ?? "",
        }
    }, []);


    return (
        <Modal isOpen={open} onClose={closeModal} size="xl">
            <ModalContent>
                <Formik enableReinitialize validationSchema={toFormikValidationSchema(departmentSchema as any)} initialValues={initialValues()} onSubmit={(values) => get(props, "department_id") ? onUpdateDepartment(values) : onAddDepartment(values)}>
                    {({ isValid, dirty }) => {
                        return (
                            <Form className='space-y-4'>
                                <ModalHeader className="flex flex-col gap-1 mb-0" title={get(props, "department_id") ? "Edit Department" : "Add Department"}>
                                    {get(props, "department_id") ? "Edit Department" : "Add Department"}
                                </ModalHeader>
                                <Divider className="w-full" />
                                <ModalBody className="pt-1">
                                    <FastField name="department">
                                        {({ field, meta }: FieldProps) => (
                                            <Input
                                                label="Department name"
                                                labelPlacement="outside"
                                                variant="flat"
                                                placeholder="Enter department name"
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
                                    <Field name="storage_id">
                                        {({ field, form, meta }: FieldProps) => {
                                            return (
                                                <Select
                                                    className="w-full"
                                                    radius="sm"
                                                    items={storages?.data?.data?.map(el => ({ label: el.storage, key: String(el?.storage_id) })) ?? []}
                                                    label="Storage"
                                                    labelPlacement="outside"
                                                    placeholder="Select Storage"
                                                    isClearable
                                                    isLoading={isLoadingStorages}
                                                    onSelectionChange={(keys) => {
                                                        const selectedKey = Array.from(keys)[0] ?? null;
                                                        const selectedRole = storages?.data?.data?.find(r => String(r.storage_id) === selectedKey) ?? null;
                                                        form.setFieldValue(field.name, selectedRole?.storage_id);
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
                                        {get(props, "department_id") ? "Save changes" : "Add Department"}
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

export default DepartmentModal
