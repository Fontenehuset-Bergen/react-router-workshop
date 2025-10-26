import { type ForecastTimeStep } from "@/types/weather";
import { WeatherImage } from "../images/WeatherImage";

interface WeatherDayProps {
  /**
   * Vi kan bruke TimeseriesEntry, eller navigere gjennom typen som under
   * forecast: WeatherFeature["properties"]["timeseries"][0]
   */
  forecast: ForecastTimeStep;
}

export function WeatherDay({ forecast }: WeatherDayProps) {
  return (
    <span className="flex gap-1 items-center w-full max-w-24">
      <WeatherImage
        weatherName={
          forecast.data.next_12_hours?.summary?.symbol_code ||
          forecast.data.next_6_hours?.summary?.symbol_code ||
          forecast.data.next_1_hours?.summary?.symbol_code
        }
      />
      <p className="text-red-500">
        {forecast.data.instant?.details.air_temperature}
      </p>
    </span>
  );
}
