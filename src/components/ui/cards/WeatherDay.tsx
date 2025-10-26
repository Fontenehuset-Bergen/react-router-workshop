import type { ForecastFeature } from "~/types/weather";
import { WeatherImage } from "../image/WeatherImage";

export function WeatherDay({
  forecast,
}: {
  forecast: ForecastFeature["properties"]["timeseries"][0];
}) {
  return (
    <span className="flex gap-1 items-center">
      <WeatherImage
        weatherName={forecast.data.next_1_hours?.summary?.symbol_code}
      />
      <p className="text-red-500">
        {forecast.data.instant?.details.air_temperature}
      </p>
    </span>
  );
}
