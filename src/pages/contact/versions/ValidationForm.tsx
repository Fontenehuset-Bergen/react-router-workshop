import type { Route } from "./+types/ClientForm";
import { FormInput } from "@/components/ui/input/FormInput";
import newsletterImage from "@/assets/media/examples/newsletter.jpg";
import { FormSubmitButton } from "@/components/ui/buttons/FormSubmit";
import { useActionData } from "react-router";
import { getError, newsletterSchema } from "@/schema/newsletter";

export async function action({ request }: Route.ClientActionArgs) {
  try {
    // Vi henter ut data fra form vi submitted på siden
    let formData = await request.formData();
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
    };

    console.log("New server request recieved!");
    console.log("Form data:\t", formData);
    console.log("Raw data:\t", data);

    // Vi begynner å validere data
    const validation = newsletterSchema.safeParse(data);
    if (!validation.success) {
      const errors = getError(validation.error);
      console.log("Validation failed:\n", errors);
      return { status: 422, statusText: "Error!", errors };
    }

    // Det er smart å returnere statusmeldinger tilbake til brukeren slik at brukeren ser hva som skjer
    return { status: 200, statusText: "Form submitted!" };
  } catch {
    return { status: 500, statusText: "Something went wrong" };
  }
}

export default function Page() {
  const response = useActionData<typeof action>();

  return (
    <section>
      <p>
        Vi kan også ligge til validering for inputs, både i klienten og på
        serveren. Vi kan da vise tilbakemeldinger hvis feltene ikke er fylt inn
        riktig.
      </p>
      <div className="flex flex-col md:flex-row gap-2">
        <form
          method="post"
          className="flex-1 flex flex-col gap-4 p-2 bg-sky-100 text-black"
        >
          <FormInput
            name="name"
            label="Ditt navn"
            placeholder="Ola nordmann"
            errorMessage={response?.errors?.fieldErrors.name?.join(", ")}
          />
          <FormInput
            name="email"
            label="Din epost"
            placeholder="olanord@vpn.com"
            errorMessage={response?.errors?.fieldErrors.email?.join(", ")}
          />
          <FormSubmitButton
            label={response?.status == 200 ? "Submitted!" : "Submit"}
          />
          <p className="italic text-sm">What did our action respond with?</p>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </form>
        <div className="flex-1">
          <img src={newsletterImage} alt="Picture of our newsletter" />
        </div>
      </div>
    </section>
  );
}
