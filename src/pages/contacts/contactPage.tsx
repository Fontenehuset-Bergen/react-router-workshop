import { isRouteErrorResponse, useRouteError } from "react-router";
import type { Route } from "./+types/contactPage";
import contacts from "@/data/contacts/details.json";

export async function loader({ params }: Route.LoaderArgs) {
  const index = Math.abs(Number(params.id));

  if (isNaN(index)) {
    throw new Response("Identifier must be a positive number", { status: 404 });
  }

  if (contacts.length <= index) {
    throw new Response("You don't have that many contacts. Reduce the number", {
      status: 404,
    });
  }

  return contacts.at(index);
}

export default function ContactPage({ loaderData }: Route.ComponentProps) {
  const { name, address, phone } = loaderData!;
  return (
    <section>
      <h1 className="text-center">Contact details</h1>
      <span>
        <p>{name}</p>
        <p>{address}</p>
        <p>{phone}</p>
      </span>
    </section>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1 className="text-center">
          {error.status}
          {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1 className="text-center">Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
