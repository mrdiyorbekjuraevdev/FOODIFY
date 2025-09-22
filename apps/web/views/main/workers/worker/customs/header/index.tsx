"use client"
import { BreadcrumbItem, Breadcrumbs } from "@foodify/design-system/components/breadcrumbs"
import { useWorkerCache } from '@/servers/main/workers'
import Loading from './loading'

export const Header = () => {
    const { worker: { data: worker, isLoading } } = useWorkerCache();


    if (isLoading) return <Loading />

    return (
        <div className='flex items-center justify-between'>
            <Breadcrumbs variant="solid">
                <BreadcrumbItem href="/workers">Workers</BreadcrumbItem>
                <BreadcrumbItem>{worker?.data?.fullname ?? "Worker"}</BreadcrumbItem>
            </Breadcrumbs>
        </div>
    )
}
