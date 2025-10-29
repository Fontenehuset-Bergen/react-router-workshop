import * as z from "zod";

export const newsletterSchema = z.object({
  name: z
    .string("Navn er påkrevd.")
    .trim()
    .min(2, "Navn må være minst 2 tegn."),
  email: z.string("Epost er påkrevd.").trim().email("Ugyldig e-postadresse."),
});

export type NewsletterSchema = z.infer<typeof newsletterSchema>;

/**
 * Helper function for getting error messages in actions
 */
export function getError<T>(err: z.ZodError<T>) {
  return z.flattenError(err);
}
