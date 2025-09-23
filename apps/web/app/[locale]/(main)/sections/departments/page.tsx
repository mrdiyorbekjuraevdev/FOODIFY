import { departmentsCache } from "@/servers/main/shared/utils";
import Departments from "@/views/main/sections/departments";
import { parseAsFloat, createLoader, parseAsString } from 'nuqs/server'

const coordinatesSearchParams = {
    page: parseAsFloat.withDefault(1),
    search: parseAsString.withDefault("")
}

const loadSearchParams = createLoader(coordinatesSearchParams)

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>; }) {
    const { page, search } = await loadSearchParams(searchParams)
    await departmentsCache({ branch_id: "1", search, page });
    return (
        <Departments />
    )
}
