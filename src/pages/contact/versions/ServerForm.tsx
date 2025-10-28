import type { Route } from "./+types/ClientForm";
import { FormInput } from "@/components/ui/input/FormInput";
import newsletterImage from "@/assets/media/examples/newsletter.jpg";
import { FormSubmitButton } from "@/components/ui/buttons/FormSubmit";
import { sleep } from "@/utils/delay";
import { useActionData } from "react-router";

export async function action({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();

  // Vi kan f.eks skrive til databaser eller gjøre noe annet, men i dette tilfellet logger vi bare ut
  console.log(formData);
  await sleep(1000);

  // Det er smart å returnere statusmeldinger tilbake til brukeren slik at brukeren ser hva som skjer
  return { status: 200, statusText: "Form submitted" };
}

export default function Page() {
  const response = useActionData<typeof action>();
  return (
    <section>
      <p>
        Hvis vi ønsker at data skal bli sendt til serveren kan vi bruke actions
        til å behandle forespørselen server side.
      </p>
      <div className="flex flex-col md:flex-row gap-2">
        <form
          method="post"
          className="flex-1 flex flex-col gap-4 p-2 bg-sky-100 text-black"
        >
          <FormInput name="name" label="Ditt navn" placeholder="Ola nordmann" />
          <FormInput
            name="email"
            label="Din epost"
            placeholder="olanord@vpn.com"
          />
          <FormSubmitButton label="Submit" />
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
