import type { Pokedex } from "@/types/pokemon";
import { NavLink, Outlet, useLoaderData } from "react-router";
import type { Route } from "./+types/PokedexLayout";

export async function loader({ request }: Route.LoaderArgs) {
  console.log("Fetching Pokedex");
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0",
    {
      cache: "force-cache",
      signal: request.signal,
    }
  );

  if (!response.ok) {
    throw new Response(`Unable to fetch pokedex`, {
      status: response.status,
      statusText: response.statusText,
    });
  }

  const data: Pokedex = await response.json();
  return data;
}

export default function PokemonLayout() {
  const pokedex = useLoaderData<typeof loader>();

  if (!pokedex) return {};

  return (
    <main>
      <div className="flex gap-2 p-4 bg-red-500">
        <div className="h-64 flex flex-col overflow-y-scroll p-2 bg-slate-400 text-black ">
          {pokedex.results.map((pokemon, index) => (
            <NavLink
              key={pokemon.name}
              to={`/pokedex/${pokemon.name}`}
              className={({ isActive }) =>
                `flex gap-2 py-1 px-2 ${isActive ? "bg-amber-600" : ""} !text-black`
              }
            >
              <span className="w-10">{`#${index + 1}`}</span>
              <span>{pokemon.name}</span>
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div>
    </main>
  );
}
