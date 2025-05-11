/**
 * Validates an email address
 * @param email - The email to validate
 * @returns True if the email is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates if a string is empty or only contains whitespace
 * @param str - The string to validate
 * @returns True if the string is empty or only contains whitespace, false otherwise
 */
export function isEmpty(str: string): boolean {
  return !str || str.trim() === ""
}

/**
 * Validates a phone number (simple validation)
 * @param phone - The phone number to validate
 * @returns True if the phone number is valid, false otherwise
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return false
  const phoneRegex = /^\+?[0-9]{8,15}$/
  return phoneRegex.test(phone)
}

/**
 * Validates a date string (YYYY-MM-DD format)
 * @param dateString - The date string to validate
 * @returns True if the date is valid, false otherwise
 */
export function isValidDate(dateString: string): boolean {
  if (!dateString) return false
  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(dateString)) return false
  
  const date = new Date(dateString)
  return !isNaN(date.getTime())
}

/**
 * Validates a password (at least 8 characters, including uppercase, lowercase, and numbers)
 * @param password - The password to validate
 * @returns True if the password is valid, false otherwise
 */
export function isValidPassword(password: string): boolean {
  if (!password) return false
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  return passwordRegex.test(password)
}

/**
 * Validates if a value is within a specified range
 * @param value - The value to validate
 * @param min - The minimum allowed value
 * @param max - The maximum allowed value
 * @returns True if the value is within the range, false otherwise
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

/**
 * Validates if a string has a minimum length
 * @param str - The string to validate
 * @param minLength - The minimum length required
 * @returns True if the string meets the minimum length, false otherwise
 */
export function hasMinLength(str: string, minLength: number): boolean {
  if (!str) return false
  return str.length >= minLength
}

/**
 * Validates if a string has a maximum length
 * @param str - The string to validate
 * @param maxLength - The maximum length allowed
 * @returns True if the string is within the maximum length, false otherwise
 */
export function hasMaxLength(str: string, maxLength: number): boolean {
  if (!str) return true
  return str.length <= maxLength
}

