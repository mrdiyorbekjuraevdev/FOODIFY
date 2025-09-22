"use client"
import React, { useCallback } from 'react'
import { Card } from "@foodify/design-system/components/card";
import { Formik, Form } from 'formik';
import { Fields, permissions } from './fields';
import { useWorkerCache } from '@/servers/main/workers';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { workerSchema } from '@/model/main/workers';
import { Button } from '@foodify/design-system/components/button';
import { Divider } from '@foodify/design-system/components/divider';
import { useWorkerFeatures } from '../../features';
import { WorkerFormValues } from '@/model/main/workers';
import { get } from 'lodash';
import Loading from './loading';

const normalizePermissions = (data: { permission: string; actions: string[] }[] | Record<string, string[]>) => {
    // If data is already in the correct format (Record<string, string[]>), return it as is
    if (!Array.isArray(data)) {
        return data;
    }

    // If it's an array, convert it to the Record format
    return data.reduce((acc, { permission, actions }) => {
        acc[permission] = actions;
        return acc;
    }, {} as Record<string, string[]>);
};

export const Body = () => {
    const { worker: { data: worker, isLoading } } = useWorkerCache();
    const { onAddWorker: { mutateAsync: onSubmit, isPending: isPendingAdd }, onUpdateWorker: { mutateAsync: onUpdate, isPending: isPendingUpdate } } = useWorkerFeatures()

    const initialValues = useCallback<() => WorkerFormValues>(() => {
        const isUpdate = Boolean(worker?.data?.user_id);
        return {
            fullname: worker?.data?.fullname ?? "",
            phone: worker?.data?.phone ?? "",
            email: worker?.data?.email ?? "",
            password: worker?.data?.password ?? "",
            role: worker?.data?.role ?? "",
            branch_id: worker?.data?.branch_id ?? "",
            permissions: isUpdate
                ? normalizePermissions(worker?.data?.permissions ?? {})
                : permissions.reduce((acc, { permission, actions }) => {
                    acc[permission] = [...actions];
                    return acc;
                }, {} as Record<string, string[]>),
        };
    }, [worker?.data]);

    if (isLoading) return <Loading />

    return (
        <div className="h-full">
            <Card className="h-full p-4 overflow-y-auto">
                <Formik<WorkerFormValues> enableReinitialize initialValues={initialValues()} validationSchema={toFormikValidationSchema(workerSchema as any)} onSubmit={(values) => {
                    get(worker, "data.user_id") ? onUpdate(values) : onSubmit(values)
                }}>
                    {({ isValid, dirty, values }) => {
                        return (
                            <Form className='space-y-4'>
                                <div className="flex items-center justify-between py-2">
                                    <h2 className="text-2xl font-bold">{get(worker, "data.user_id") ? "Save Changes" : "Add New Worker"}</h2>
                                    <Button color='success' isDisabled={!isValid || !dirty || isPendingAdd || isPendingUpdate} isLoading={isPendingAdd || isPendingUpdate} type="submit" className='text-white'>Save Changes</Button>
                                </div>
                                <Divider />
                                <div className="flex flex-col  gap-4">
                                    <Fields />
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </Card>
        </div>
    )
}
