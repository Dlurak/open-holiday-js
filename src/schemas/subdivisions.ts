import { z } from "zod";
import { isCode, nameSchema } from "./utils";

const subdivisionSchema = z.object({
  code: z.string().min(1),
  isoCode: z.string(),
  shortName: z.string().min(1),
  category: z.array(nameSchema),
  name: z.array(nameSchema),
  officialLanguages: z.array(z.string().refine(isCode)),
});

export const subdivisionsApiResponse = z.array(subdivisionSchema);
