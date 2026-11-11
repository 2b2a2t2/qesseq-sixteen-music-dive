import { z } from "zod";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : null));

export const preorderSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(255),
  name: optionalText(100),
  country: optionalText(80),
  message: optionalText(1000),
  locale: z.enum(["en", "fr"]),
});

export type PreorderInput = z.input<typeof preorderSchema>;
