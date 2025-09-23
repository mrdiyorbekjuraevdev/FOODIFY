import { storagesCache } from "@/servers/main/shared/utils";
import Storages from "@/views/main/sections/storages";
import { parseAsFloat, createLoader, parseAsString } from 'nuqs/server'

const coordinatesSearchParams = {
    page: parseAsFloat.withDefault(1),
    search: parseAsString.withDefault("")
}

const loadSearchParams = createLoader(coordinatesSearchParams)

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>; }) {
    const { page, search } = await loadSearchParams(searchParams)
    await storagesCache({ branch_id: "1", search, page });
    return (
        <Storages />
    )
}
