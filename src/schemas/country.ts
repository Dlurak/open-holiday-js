import { z } from 'zod';
import { isCode } from './utils';

const countrySchema = z.object({
  isoCode: z.string().refine(isCode),
  name: z.array(
    z.object({
      language: z.string().refine(isCode),
      text: z.string()
    })
  ),
  officialLanguages: z.array(z.string().refine(isCode))
});

export const countryApiResponse = z.array(countrySchema);
