import * as z from "zod";

export const NewsletterSchema = z.object({
  name: z
    .string("You must write a name")
    .min(3, "You need a longer name")
    .max(50, "You should probably change names, nobody needs a name that lengthy"),
  email: z.email("Your email is written wrong"),
});
