import { z } from 'zod'
import { isCode, nameSchema } from './utils'

const languageSchema = z.object({
	isoCode: z.string().refine(isCode),
	name: z.array(nameSchema)
})

export const languagesApiResponse = z.array(languageSchema)
