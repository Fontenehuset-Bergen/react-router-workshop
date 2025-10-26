import { type ForecastLocation } from "@/types/weather";
import { WeatherDay } from "./WeatherDay";

export function WeatherCard({
  forecast: { forecast, name },
}: {
  forecast: ForecastLocation;
}) {
  // Isteden for å hente ut verdier fra index som kan gi oss feil bruker vi heller
  // filter for å være sikker på at vi aldri går out of bounds i arrayen
  const forecastFiltered = forecast.properties.timeseries.filter(
    (_, i) => i % 24 === 1
  );
  return (
    <div className="flex gap-6 p-2 bg-white text-black rounded-md">
      <span className="flex-1 my-auto">{name}</span>
      {forecastFiltered.map((item) => (
        <WeatherDay key={item.time} forecast={item} />
      ))}
    </div>
  );
}
