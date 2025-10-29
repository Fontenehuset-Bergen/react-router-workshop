import * as z from "zod";

export const NewsletterSchema = z.object({
  name: z
    .string("Du må skrive et navn")
    .min(3, "Du må ha et lengre navn")
    .max(50, "Du burde kanskje skifte navn"),
  email: z.email("Din epost er skrevet feil"),
});


export function getErrors<T>(error: z.ZodError<T>) {
    return z.flattenError(error)
}