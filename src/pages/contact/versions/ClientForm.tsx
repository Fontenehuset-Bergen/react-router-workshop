import type { Route } from "./+types/ClientForm";
import { Form, useActionData, useLoaderData } from "react-router";
import { FormInput } from "@/components/ui/input/FormInput";
import newsletterImage from "@/assets/media/examples/newsletter.jpg";
import { FormSubmitButton } from "@/components/ui/buttons/FormSubmit";
import { sleep } from "@/utils/delay";

export async function clientLoader() {
  let name = localStorage.getItem("name") || "No name";
  let email = localStorage.getItem("email") || "No email";
  return { name, email };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  await sleep(1000);

  let formData = await request.formData();

  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    // Super enkel validering
    if (!email.includes("@")) {
      throw new Error("Epost inneholder ikke @");
    }

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

export default function Page() {
  let data = useLoaderData<typeof clientLoader>();
  let result = useActionData<typeof clientAction>();

  return (
    <section>
      <p>
        Vi kan holde all logikken for formsubmission kjørende i nettleseren uten
        å sende noe til serveren, vi må i så fall bruke &lt;Form&gt; fra
        react-router istedet for html taggen &lt;form&gt; slik at react holder
        data i nettleseren
      </p>
      <div className="flex flex-col md:flex-row gap-2">
        <Form
          method="post"
          className="flex-1 flex flex-col gap-4 p-2 bg-sky-100 text-black"
        >
          <FormInput name="name" label="Ditt navn" placeholder="Ola nordmann" />
          <FormInput
            name="email"
            label="Din epost"
            placeholder="olanord@vpn.com"
          />
          {result && !result.ok && "Noe gikk galt"}
          <FormSubmitButton label="Submit" isSuccess={result?.ok} />
          <p className="italic text-sm">What did our clientLoader find?</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <p className="italic text-sm">
            What did our clientAction respond with?
          </p>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </Form>
        <div className="flex-1">
          <img src={newsletterImage} alt="Picture of our newsletter" />
        </div>
      </div>
    </section>
  );
}
