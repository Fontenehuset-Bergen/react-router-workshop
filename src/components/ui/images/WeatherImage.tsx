interface WeatherImageProps {
  weatherName: string | undefined;
}

export function WeatherImage({ weatherName = "undefined" }: WeatherImageProps) {
  return <img src={`/forecast/${weatherName}.png`} className="size-10" />;
}
