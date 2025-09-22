"use client"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@foodify/design-system/components/modal";
import { Divider } from "@foodify/design-system/components/divider";
import { Button } from "@foodify/design-system/components/button";
import { FieldProps, Form, Formik } from "formik";
import { useCallback } from "react";
import { FastField } from "formik";
import { Input } from "@foodify/design-system/components/input";
import { useStorageStore } from "@/stores/main/storages";
import { useStorageModalFeatures } from "./features";
import { get } from "lodash";
import { storageSchema } from "@/model/main/storages";
import { toFormikValidationSchema } from "zod-formik-adapter";


const StorageModal = () => {
    const { modal: { open, props }, closeModal } = useStorageStore();
    const { onAddStorage: { mutateAsync: onAddStorage, isPending }, onUpdateStorage: { mutateAsync: onUpdateStorage, isPending: isUpdatePending } } = useStorageModalFeatures();

    const initialValues = useCallback<() => { storage: string }>(() => {
        return {
            storage: props?.storage ?? "",
        }
    }, []);


    return (
        <Modal isOpen={open} onClose={closeModal} size="xl">
            <ModalContent>
                <Formik enableReinitialize validationSchema={toFormikValidationSchema(storageSchema as any)} initialValues={initialValues()} onSubmit={(values) => get(props, "storage_id") ? onUpdateStorage(values) : onAddStorage(values)}>
                    {({ isValid, dirty }) => {
                        return (
                            <Form className='space-y-4'>
                                <ModalHeader className="flex flex-col gap-1 mb-0" title={get(props, "storage_id") ? "Edit Storage" : "Add Storage"}>
                                    {get(props, "storage_id") ? "Edit Storage" : "Add Storage"}
                                </ModalHeader>
                                <Divider className="w-full" />
                                <ModalBody className="pt-1">
                                    <FastField name="storage">
                                        {({ field, meta }: FieldProps) => (
                                            <Input
                                                label="Storage name"
                                                labelPlacement="outside"
                                                variant="flat"
                                                placeholder="Enter storage name"
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

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={() => { closeModal() }}>
                                        Cancel
                                    </Button>
                                    <Button isDisabled={!isValid || !dirty} isLoading={isPending || isUpdatePending} type="submit" color="primary">
                                        {get(props, "storage_id") ? "Save changes" : "Add Storage"}
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

export default StorageModal
