import { type ForecastLocation, type ForecastResponse } from "@/types/weather";
import { WeatherCard } from "../ui/cards/WeatherCard";

export function WeatherExample({ data }: { data?: ForecastLocation[] }) {
  // Vi bruker intl til å lage en formatter som gir oss ukedag navn
  const formatter = new Intl.DateTimeFormat("nb-NO", {
    weekday: "long",
    timeZone: "Europe/Oslo",
  });

  // Vi lager oss en liste for de neste 4 ukedagene som vi kan bruke i komponentet
  const today = new Date();
  const days = Array.from(
    { length: 4 },
    (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      return formatter.format(d);
    },
    []
  );

  return (
    <div className="flex flex-col gap-2 p-2 rounded-md bg-sky-200 text-black">
      <h2>Værmelding eksempel</h2>
      <span className="flex gap-6 text-slate-600 *:p-2">
        <p className="flex-1">Lokasjon</p>
        {days.map((day) => (
          <p key={day} className="w-full max-w-24">
            {day}
          </p>
        ))}
      </span>
      {data?.map((forecast, index) => (
        <WeatherCard key={`forecast-${index}`} forecast={forecast} />
      ))}
    </div>
  );
}
