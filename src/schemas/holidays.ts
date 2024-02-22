import { z } from "zod";

import { isDate, nameSchema } from "./utils";

const holidayType = z.union([
  z.literal("Public"),
  z.literal("Bank"),
  z.literal("National"),
  z.literal("Regional"),
  z.literal("Local"),
  z.literal("School"),
  z.literal("BackToSchool"),
  z.literal("EndOfLessons"),
]);

const holidaySchema = z.object({
  id: z.string().min(1),
  startDate: z.string().refine(isDate),
  endDate: z.string().refine(isDate),
  type: holidayType,
  name: z.array(nameSchema),
  nationwide: z.boolean(),

  subdivisions: z.optional(
    z.array(
      z.object({
        code: z.string().min(1),
        shortName: z.string().min(1),
      }),
    ),
  ),
  quality: z.optional(z.union([z.literal("Mandatory"), z.literal("Optional")])),
  comment: z.optional(z.array(nameSchema)),
});

export const holidayApiResponse = z.array(holidaySchema);
