/**
 * Formats a date string to a localized date format
 * @param dateString - The date string to format
 * @param locale - The locale to use for formatting (default: 'es-ES')
 * @returns Formatted date string
 */
export function formatDate(dateString: string, locale = "es-ES"): string {
  if (!dateString) return ""

  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  } catch (error) {
    console.error("Error formatting date:", error)
    return dateString
  }
}

/**
 * Formats a date string to a localized date and time format
 * @param dateString - The date string to format
 * @param locale - The locale to use for formatting (default: 'es-ES')
 * @returns Formatted date and time string
 */
export function formatDateTime(dateString: string, locale = "es-ES"): string {
  if (!dateString) return ""

  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  } catch (error) {
    console.error("Error formatting date and time:", error)
    return dateString
  }
}

/**
 * Formats a date string to a relative time format (e.g., "2 days ago")
 * @param dateString - The date string to format
 * @param locale - The locale to use for formatting (default: 'es-ES')
 * @returns Relative time string
 */
export function formatRelativeTime(dateString: string, locale = "es-ES"): string {
  if (!dateString) return ""

  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" })

    if (diffInSeconds < 60) {
      return rtf.format(-diffInSeconds, "second")
    } else if (diffInSeconds < 3600) {
      return rtf.format(-Math.floor(diffInSeconds / 60), "minute")
    } else if (diffInSeconds < 86400) {
      return rtf.format(-Math.floor(diffInSeconds / 3600), "hour")
    } else if (diffInSeconds < 2592000) {
      return rtf.format(-Math.floor(diffInSeconds / 86400), "day")
    } else if (diffInSeconds < 31536000) {
      return rtf.format(-Math.floor(diffInSeconds / 2592000), "month")
    } else {
      return rtf.format(-Math.floor(diffInSeconds / 31536000), "year")
    }
  } catch (error) {
    console.error("Error formatting relative time:", error)
    return dateString
  }
}

/**
 * Converts a date string to ISO format (YYYY-MM-DD)
 * @param dateString - The date string to convert
 * @returns ISO formatted date string
 */
export function toISODateString(dateString: string): string {
  if (!dateString) return ""

  try {
    const date = new Date(dateString)
    return date.toISOString().split("T")[0]
  } catch (error) {
    console.error("Error converting to ISO date:", error)
    return dateString
  }
}

/**
 * Extracts time from a date string (HH:MM)
 * @param dateString - The date string to extract time from
 * @returns Time string in HH:MM format
 */
export function extractTimeFromDate(dateString: string): string {
  if (!dateString) return ""

  try {
    const date = new Date(dateString)
    return date.toTimeString().slice(0, 5)
  } catch (error) {
    console.error("Error extracting time from date:", error)
    return ""
  }
}

/**
 * Combines date and time strings into a single ISO date string
 * @param dateString - The date string (YYYY-MM-DD)
 * @param timeString - The time string (HH:MM)
 * @returns Combined ISO date string
 */
export function combineDateAndTime(dateString: string, timeString: string): string {
  if (!dateString) return ""

  try {
    const combinedString = `${dateString}T${timeString || "00:00"}`
    return new Date(combinedString).toISOString()
  } catch (error) {
    console.error("Error combining date and time:", error)
    return dateString
  }
}
