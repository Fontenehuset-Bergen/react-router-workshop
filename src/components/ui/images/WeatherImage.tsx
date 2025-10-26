export function WeatherImage({
  weatherName,
}: {
  weatherName: string | undefined;
}) {
  if (weatherName)
    return <img src={`/forecast/${weatherName}.png`} className="size-10" />;
  return <img src="/forecast/notfound.jpg" className="size-10" />;
}
