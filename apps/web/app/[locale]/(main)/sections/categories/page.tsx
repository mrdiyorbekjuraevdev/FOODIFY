import { categoriesCache } from "@/servers/main/shared/utils";
import Categories from "@/views/main/sections/categories";
import { parseAsFloat, createLoader, parseAsString } from 'nuqs/server'

const coordinatesSearchParams = {
    page: parseAsFloat.withDefault(1),
    search: parseAsString.withDefault("")
}

const loadSearchParams = createLoader(coordinatesSearchParams)

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>; }) {
    const { page, search } = await loadSearchParams(searchParams)
    await categoriesCache({ branch_id: "1", search, page });
    return (
        <Categories />
    )
}
