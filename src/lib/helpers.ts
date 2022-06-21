import { BASE_URL } from "@src/lib/constant";
import type { Output } from "@src/lib/types";

export const fetcher = async <T>(
    method: "auth" | "store",
    query: Record<string, string>,
    path?: string,
): Promise<Output<T>> => {
    const url =
        BASE_URL +
        (method === "auth" ? "/app/login" : "/alumno/" + path) +
        `?${Object.entries(query)
            .map(([key, value]) => `${key}=${value}`)
            .join("&")}`;

    const res = await fetch(url, {
        headers: new Headers({
            "Content-Type": "",
        }),
    });

    return await res.json();
};

export const normalizeData = (
    schema: Record<string, unknown>[],
    key: string,
) => {
    return schema.map((item) => ({
        metadata: {
            profesor: item.profesor as string,
            materia: item.materia as string,
        },
        cols: item[key] as [string | number],
    }));
};
