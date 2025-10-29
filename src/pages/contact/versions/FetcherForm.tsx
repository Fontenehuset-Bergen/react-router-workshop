import type { Route } from "./+types/ClientForm";
import { useFetcher, useLoaderData } from "react-router";
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

  let data = await request.formData();

  try {
    localStorage.setItem("name", data.get("name") as string);
    localStorage.setItem("email", data.get("email") as string);
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

export default function Page() {
  let data = useLoaderData<typeof clientLoader>();
  let fetcher = useFetcher();
  return (
    <section>
      <p>
        Vi kan forbedre form submissions med fetchers for å unngå at siden
        lastes inn på nytt hver gang du trykker submit noe som gir en bedre
        brukeropplevlse hvis du ikke trenger å endre på url etter submission
      </p>
      <div className="flex flex-col md:flex-row gap-2">
        <fetcher.Form
          method="post"
          className="flex-1 flex flex-col gap-4 p-2 bg-sky-100 text-black"
        >
          <FormInput name="name" label="Ditt navn" placeholder="Ola nordmann" />
          <FormInput
            name="email"
            label="Din epost"
            placeholder="olanord@vpn.com"
          />
          <FormSubmitButton
            label={fetcher.state == "idle" ? "Submit" : fetcher.state}
            isSuccess={!!fetcher.data}
          />
          <p className="italic text-sm">What did our clientLoader find?</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <p className="italic text-sm">What is our fetcher doing</p>
          <pre>{JSON.stringify(fetcher, null, 2)}</pre>
        </fetcher.Form>
        <div className="flex-1">
          <img src={newsletterImage} alt="Picture of our newsletter" />
        </div>
      </div>
    </section>
  );
}
