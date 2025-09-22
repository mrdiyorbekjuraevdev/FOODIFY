type SupportedLang = "uz" | "ru" | "en";

/**
 * Formats a date into localized string
 * @param date - Date object or date string
 * @param lang - "uz" | "ru" | "en"
 * @param options - Optional Intl.DateTimeFormat options
 */
export function formatDate(
    date: Date | string,
    lang: SupportedLang = "en",
    options?: Intl.DateTimeFormatOptions
): string {
    const d = typeof date === "string" ? new Date(date) : date;

    const formatter = new Intl.DateTimeFormat(lang, {
        year: "numeric",
        month: "long",
        day: "numeric",
        ...options,
    });

    return formatter.format(d);
}
