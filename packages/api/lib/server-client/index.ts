
interface ServerRequestConfig {
    functionName: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: object | string;
    token?: string | null;
}

export async function serverApi<T>({
    functionName,
    method = "GET",
    body,
    token,
}: ServerRequestConfig): Promise<{ data: T | null; error: string | null }> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/${functionName}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: body ? JSON.stringify(body) : undefined,
            cache: "no-store",
        });

        if (!res.ok) {
            const errorText = await res.text();
            return { data: null, error: errorText };
        }

        const json = (await res.json()) as T;
        return { data: json, error: null };
    } catch (err: any) {
        console.error("serverApi error:", err);
        return { data: null, error: err.message || "Unexpected error" };
    }
}
