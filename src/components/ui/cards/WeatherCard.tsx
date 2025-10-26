import type { ForecastFeature } from "~/types/weather";
import { WeatherDay } from "./WeatherDay";

export function WeatherCard({ forecast }: { forecast: ForecastFeature }) {
  const forecastFiltered = forecast.properties.timeseries.filter(
    (_, i) => i % 24 === 1
  );
  return (
    <div className="grid grid-cols-5 p-2 bg-sky-100 text-black">
      <span>
        lat {forecast.geometry.coordinates[0]} lon
        {forecast.geometry.coordinates[1]}
      </span>
      {forecastFiltered.map((item) => (
        <WeatherDay key={item.time} forecast={item} />
      ))}
    </div>
  );
}
