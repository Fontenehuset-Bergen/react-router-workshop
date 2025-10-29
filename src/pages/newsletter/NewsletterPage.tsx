import { useActionData, useFetcher } from "react-router";
import type { Route } from "./+types/NewsletterPage";
import { getErrors, NewsletterSchema } from "@/schema/news";
import { Loader } from "lucide-react";

export async function action({ request }: Route.ActionArgs) {
  const data = await request.formData();

  const user = {
    name: data.get("name") as string,
    email: data.get("email") as string,
  };

  const validation = NewsletterSchema.safeParse(user);

  // Fake ventetid 3 sekunder
  await new Promise((resolve) => setTimeout(resolve, 3000));

  if (!validation.success) {
    const errors = getErrors(validation.error);
    return { status: 400, errors: errors };
  }

  return { status: 200 };
}

export default function Page() {
  // const response = useActionData<typeof action>();
  const fetcher = useFetcher<typeof action>();

  const isSubmitting = fetcher.state == "submitting";

  return (
    <main>
      <h1>Newsletter</h1>
      <fetcher.Form method="post" className="flex flex-col gap-4">
        <span className="flex flex-col">
          <label>Type inn your name</label>
          <input
            type="text"
            name="name"
            className="max-w-48 bg-white text-black"
          />
          {fetcher.data?.errors?.fieldErrors.name && (
            <p className="text-red-600">
              {fetcher.data.errors.fieldErrors.name.join(", ")}
            </p>
          )}
        </span>
        <span className="flex flex-col">
          <label>Type inn your email</label>
          <input
            type="text"
            name="email"
            className="max-w-48 bg-white text-black"
          />
          {fetcher.data?.errors?.fieldErrors.email && (
            <p className="text-red-600">
              {fetcher.data.errors.fieldErrors.email.join(", ")}
            </p>
          )}
        </span>
        <button
          type="submit"
          className={`
            flex items-center max-w-48 p-2 border 
            ${fetcher.data?.status == 200 ? "bg-green-600" : "bg-blue-600"}
            ${isSubmitting ? "animate-pulse" : ""}
            bg-red-600
          `}
        >
          {isSubmitting && <Loader className="size-8 animate-spin" />}
          <span>
            {fetcher.data?.status == 200
              ? "Thanks for signing up!"
              : fetcher.state != "idle"
                ? fetcher.state
                : "Sign up for our newsletter"}
          </span>
        </button>
        {fetcher.data?.status == 200 && (
          <p className="text-green-600">Form submitted</p>
        )}
        <pre>{JSON.stringify(fetcher, null, 2)}</pre>
      </fetcher.Form>
    </main>
  );
}
