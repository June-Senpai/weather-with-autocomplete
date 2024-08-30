type WeatherDataProps = {
  temperature: number | null;
  humidity: number | null;
  wind_speed: number | null;
  wind_direction: number | null;
  rain_intensity: number | null;
  rain_accumulation: number | null;
};

const WeatherCard = ({
  temperature,
  humidity,
  wind_speed,
  wind_direction,
  rain_intensity,
  rain_accumulation,
}: WeatherDataProps) => {
  const displayValue = (value: number | null, unit: string) =>
    value !== null ? `${value}${unit}` : "Data not available";

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-sm mx-16 mt-5">
      <h2 className="text-xl font-bold mb-4">Weather Details</h2>
      <ul className="space-y-2">
        <li>
          <strong>Temperature:</strong> {displayValue(temperature, "°C")}
        </li>
        <li>
          <strong>Humidity:</strong> {displayValue(humidity, "%")}
        </li>
        <li>
          <strong>Wind Speed:</strong> {displayValue(wind_speed, " m/s")}
        </li>
        <li>
          <strong>Wind Direction:</strong> {displayValue(wind_direction, "°")}
        </li>
        <li>
          <strong>Rain Intensity:</strong> {displayValue(rain_intensity, " mm/h")}
        </li>
        <li>
          <strong>Rain Accumulation:</strong> {displayValue(rain_accumulation, " mm")}
        </li>
      </ul>
    </div>
  );
};

export default WeatherCard;
