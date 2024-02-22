import { z } from "zod";
import { isCode, nameSchema } from "./utils";

const countrySchema = z.object({
  isoCode: z.string().refine(isCode),
  name: z.array(nameSchema),
  officialLanguages: z.array(z.string().refine(isCode)),
});

export const countryApiResponse = z.array(countrySchema);
