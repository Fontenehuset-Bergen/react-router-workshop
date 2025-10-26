import type { Route } from "../+types/root";
import { type ForecastLocation, type ForecastResponse } from "@/types/weather";
import { ButtonExamples } from "@/components/features/ButtonExamples";
import { FadeInExample } from "@/components/features/FadeInExample";
import { ProduceCardExamples } from "@/components/features/ProduceExamples";
import { ProfileExample } from "@/components/features/ProfileExample";
import { RatingExamples } from "@/components/features/RatingExamples";
import { WeatherExample } from "@/components/features/WeatherExample";
import { useLoaderData } from "react-router";
import { sleep } from "@/utils/delay";
import weatherLocations from "@/data/weather/locations.json";

/**
 * Vi kan laste inn siden først med ett resultat
 */
export async function loader({ request }: Route.LoaderArgs) {
  try {
    if (!weatherLocations.length) return [];

    const baseLocation = weatherLocations.at(0)!;

    // Fetch first response
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${baseLocation.lat}&lon=${baseLocation.lon}`;
    const response = await fetch(url, {
      cache: "force-cache",
      signal: request.signal,
    });

    if (!response.ok) {
      console.log(response.status, response.statusText);
      return;
    }

    const data: ForecastResponse = await response.json();

    return [
      { name: baseLocation.name, forecast: data },
    ] satisfies ForecastLocation[];
  } catch (err) {
    return [];
  }
}

/**
 * Vi kan så laste inn flere via client loader når en bruker besøker siden
 */
export async function clientLoader({ request }: Route.LoaderArgs) {
  try {
    const result: ForecastLocation[] = [];

    for (const location of weatherLocations) {
      // Create fake delay to avoid spamming endpoint
      console.log(`fetching forecast for ${location.name}...`);
      await sleep(1000 + Math.random() * 3000);

      const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${location.lat}&lon=${location.lon}`;
      const response = await fetch(url, {
        cache: "force-cache",
        signal: request.signal,
      });

      if (!response.ok) {
        console.log(response.status, response.statusText);
        return;
      }

      const data: ForecastResponse = await response.json();
      result.push({ name: location.name, forecast: data });
    }

    return result satisfies ForecastLocation[];
  } catch (err) {
    return [];
  }
}

// Vi kan overskrive loader med clientLoader resultatet
clientLoader.hydrate = true as const;

export default function Home() {
  const data = useLoaderData<typeof loader>();
  return (
    <main>
      <WeatherExample data={data} />
      <ButtonExamples />
      <ProduceCardExamples />
      <RatingExamples />
      <ProfileExample />
      <FadeInExample />
    </main>
  );
}
