/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  if (!str) return ""
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Truncates a string to a specified length and adds an ellipsis
 * @param str - The string to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated string
 */
export function truncate(str: string, maxLength: number): string {
  if (!str) return ""
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength) + "..."
}

/**
 * Formats a string to title case (capitalizes first letter of each word)
 * @param str - The string to format
 * @returns Title case string
 */
export function toTitleCase(str: string): string {
  if (!str) return ""
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

/**
 * Removes accents from a string
 * @param str - The string to normalize
 * @returns String without accents
 */
export function removeAccents(str: string): string {
  if (!str) return ""
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

/**
 * Formats a string to kebab-case
 * @param str - The string to format
 * @returns Kebab case string
 */
export function toKebabCase(str: string): string {
  if (!str) return ""
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
}

/**
 * Formats a string to camelCase
 * @param str - The string to format
 * @returns Camel case string
 */
export function toCamelCase(str: string): string {
  if (!str) return ""
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
}

/**
 * Formats a string to snake_case
 * @param str - The string to format
 * @returns Snake case string
 */
export function toSnakeCase(str: string): string {
  if (!str) return ""
  return str
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^\w_]+/g, "")
}

/**
 * Generates a random string of specified length
 * @param length - Length of the random string
 * @returns Random string
 */
export function generateRandomString(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}
