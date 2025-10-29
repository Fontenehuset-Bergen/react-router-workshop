import type { ForecastTimeStep } from "@/types/weather";
import { MoveUp, Thermometer } from "lucide-react";

function Compass({ deg }: { deg?: number }) {
  if (!deg) return null;
  return <MoveUp style={{ transform: `rotate(${Number(deg)}deg)` }} />;
}

export function WeatherForecastCard({
  forecast,
}: {
  forecast?: ForecastTimeStep;
}) {
  const date = new Date(forecast?.time!);
  return (
    <span className="grid grid-cols-4 p-4 bg-sky-100 text-black">
      <span>
        <p>
          {date.toLocaleString("no-NB", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
      </span>

      <span className="flex gap-2 my-auto">
        <p>{forecast?.data.instant.details.air_temperature}</p>
        <Thermometer />
      </span>
      <span className="flex gap-2 my-auto">
        <Compass deg={forecast?.data.instant.details.wind_from_direction} />
        {forecast?.data.instant.details.wind_from_direction}
        {`${forecast?.data.instant.details.wind_speed} km`}
      </span>
      <span className="size-8">
        {forecast?.data.next_12_hours?.summary.symbol_code && (
          <img
            src={`/forecast/${forecast?.data.next_12_hours?.summary.symbol_code}.png`}
            className="size-8 my-auto"
          />
        )}
      </span>
    </span>
  );
}
