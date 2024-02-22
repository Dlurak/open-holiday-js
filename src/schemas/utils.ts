import { z } from 'zod'

/**
 * Checks if the given string is a valid two-letter code consisting of uppercase letters only.
 *
 * @param code - The string to be checked.
 * @returns True if the string is a valid two-letter code, otherwise false.
 */
export const isCode = (code: string) => /^[A-Z]{2}$/.test(code)

export const nameSchema = z.object({
      language: z.string().refine(isCode),
      text: z.string()
})
