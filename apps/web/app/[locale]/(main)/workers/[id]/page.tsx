import { workerCache } from "@/servers/main/shared/utils";
import { Worker } from "@/views/main/workers/worker";

export default async function Page({ params }: { params: Promise<{ [key: string]: string | string[] | undefined }>; }) {
    const { id } = await params;

    await workerCache({ branch_id: "1", id: String(id) });
    return <Worker />;
}
