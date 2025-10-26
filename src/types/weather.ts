/**
 * Forecast timeseries
 * Base path: /weatherapi/locationforecast/2.0
 */
export interface Forecast {
  /** Metadata for this forecast. */
  meta: ForecastMeta;

  /** Array of forecast steps, each valid at a specific time. */
  timeseries: ForecastTimeStep[];
}

/** Metadata for the forecast. */
export interface ForecastMeta {
  /** Units used for each parameter in the forecast. */
  units: ForecastUnits;

  /**
   * Update time for this forecast.
   * ISO 8601 timestamp (e.g. "2019-12-03T13:52:13Z").
   * @example "2019-12-03T13:52:13Z"
   */
  updated_at: string;
}

/** Units for all supported forecast parameters. Values are unit strings, e.g. "mm", "C", "%". */
export interface ForecastUnits {
  /** @example "hPa" */ air_pressure_at_sea_level?: string;
  /** @example "C"   */ air_temperature?: string;
  /** @example "C"   */ air_temperature_max?: string;
  /** @example "C"   */ air_temperature_min?: string;
  /** @example "%"   */ cloud_area_fraction?: string;
  /** @example "%"   */ cloud_area_fraction_high?: string;
  /** @example "%"   */ cloud_area_fraction_low?: string;
  /** @example "%"   */ cloud_area_fraction_medium?: string;
  /** @example "C"   */ dew_point_temperature?: string;
  /** @example "%"   */ fog_area_fraction?: string;
  /** @example "mm"  */ precipitation_amount?: string;
  /** @example "mm"  */ precipitation_amount_max?: string;
  /** @example "mm"  */ precipitation_amount_min?: string;
  /** @example "%"   */ probability_of_precipitation?: string;
  /** @example "%"   */ probability_of_thunder?: string;
  /** @example "%"   */ relative_humidity?: string;
  /** @example "1"   */ ultraviolet_index_clear_sky_max?: string;
  /** @example "degrees" */ wind_from_direction?: string;
  /** @example "m/s" */ wind_speed?: string;
  /** @example "m/s" */ wind_speed_of_gust?: string;
}

/** Forecast for a specific time step. */
export interface ForecastTimeStep {
  /**
   * The time these forecast values are valid for.
   * ISO 8601 timestamp "YYYY-MM-DDThh:mm:ssZ".
   * @example "2019-12-03T14:00:00Z"
   */
  time: string;

  /** Forecast data blocks for this time step. */
  data: ForecastDataBlock;
}

/** Forecast data blocks grouped by validity window. */
export interface ForecastDataBlock {
  /**
   * Parameters which apply to this exact point in time.
   * (Required by the spec.)
   */
  instant: ForecastTimeInstantBlock;

  /**
   * Parameters with validity over one hour.
   * Will not exist for all time steps.
   * If present, both `summary` and `details` are required by the spec.
   */
  next_1_hours?: ForecastTimePeriodBlock;

  /**
   * Parameters with validity over six hours.
   * Will not exist for all time steps.
   * If present, both `summary` and `details` are required by the spec.
   */
  next_6_hours?: ForecastTimePeriodBlock;

  /**
   * Parameters with validity over twelve hours.
   * Will not exist for all time steps.
   * If present, both `summary` and `details` are required by the spec.
   */
  next_12_hours?: ForecastTimePeriodBlock;
}

/** Weather parameters valid for a specific point in time. */
export interface ForecastTimeInstantBlock {
  /** Instantaneous parameter values. */
  details: ForecastTimeInstant;
}

/** Weather parameters valid for a specified time period (1h/6h/12h). */
export interface ForecastTimePeriodBlock {
  /** Summary of weather conditions for the period. */
  summary: ForecastSummary;

  /** Detailed period values (precip, min/max temps, probabilities, etc.). */
  details: ForecastTimePeriod;
}

/** Summary of weather conditions. */
export interface ForecastSummary {
  /**
   * A identifier that sums up the weather condition for this time period.
   * See documentation for icons/semantics.
   * @example "clearsky_day"
   */
  symbol_code: WeatherSymbol;
}

/**
 * Weather parameters valid for a specific point in time.
 * All properties are optional in the schema unless stated otherwise.
 */
export interface ForecastTimeInstant {
  /** Air pressure at sea level. @example 1017.23 */
  air_pressure_at_sea_level?: number;

  /** Air temperature. @example 17.1 */
  air_temperature?: number;

  /** Amount of sky covered by clouds. @example 95.2 */
  cloud_area_fraction?: number;

  /** Amount of sky covered by clouds at high elevation. @example 95.2 */
  cloud_area_fraction_high?: number;

  /** Amount of sky covered by clouds at low elevation. @example 95.2 */
  cloud_area_fraction_low?: number;

  /** Amount of sky covered by clouds at medium elevation. @example 95.2 */
  cloud_area_fraction_medium?: number;

  /** Dew point temperature at sea level. @example 8.1 */
  dew_point_temperature?: number;

  /** Amount of area covered by fog. @example 95.2 */
  fog_area_fraction?: number;

  /** Amount of humidity in the air. @example 81.1 */
  relative_humidity?: number;

  /**
   * The direction wind is coming from, in degrees clockwise from North.
   * @example 121.3
   */
  wind_from_direction?: number;

  /** Speed of wind. @example 5.9 */
  wind_speed?: number;

  /** Speed of wind gust. @example 15.9 */
  wind_speed_of_gust?: number;
}

/**
 * Weather parameters valid for a specified time period.
 * All properties are optional in the schema unless stated otherwise.
 */
export interface ForecastTimePeriod {
  /** Maximum air temperature in period. @example 17.1 */
  air_temperature_max?: number;

  /** Minimum air temperature in period. @example 11.1 */
  air_temperature_min?: number;

  /** Best estimate for amount of precipitation for this period. @example 1.71 */
  precipitation_amount?: number;

  /** Maximum amount of precipitation for this period. @example 4.32 */
  precipitation_amount_max?: number;

  /** Minimum amount of precipitation for this period. @example 4.32 */
  precipitation_amount_min?: number;

  /** Probability of any precipitation coming for this period. @example 37 */
  probability_of_precipitation?: number;

  /** Probability of any thunder coming for this period. @example 54.32 */
  probability_of_thunder?: number;

  /** Maximum ultraviolet index if sky is clear. @example 1 */
  ultraviolet_index_clear_sky_max?: number;
}

/**
 * Weather symbol codes used in summaries.
 * A curated union of all symbol strings in the spec.
 */
export type WeatherSymbol =
  | "clearsky_day"
  | "clearsky_night"
  | "clearsky_polartwilight"
  | "fair_day"
  | "fair_night"
  | "fair_polartwilight"
  | "lightssnowshowersandthunder_day"
  | "lightssnowshowersandthunder_night"
  | "lightssnowshowersandthunder_polartwilight"
  | "lightsnowshowers_day"
  | "lightsnowshowers_night"
  | "lightsnowshowers_polartwilight"
  | "heavyrainandthunder"
  | "heavysnowandthunder"
  | "rainandthunder"
  | "heavysleetshowersandthunder_day"
  | "heavysleetshowersandthunder_night"
  | "heavysleetshowersandthunder_polartwilight"
  | "heavysnow"
  | "heavyrainshowers_day"
  | "heavyrainshowers_night"
  | "heavyrainshowers_polartwilight"
  | "lightsleet"
  | "heavyrain"
  | "lightrainshowers_day"
  | "lightrainshowers_night"
  | "lightrainshowers_polartwilight"
  | "heavysleetshowers_day"
  | "heavysleetshowers_night"
  | "heavysleetshowers_polartwilight"
  | "lightsleetshowers_day"
  | "lightsleetshowers_night"
  | "lightsleetshowers_polartwilight"
  | "snow"
  | "heavyrainshowersandthunder_day"
  | "heavyrainshowersandthunder_night"
  | "heavyrainshowersandthunder_polartwilight"
  | "snowshowers_day"
  | "snowshowers_night"
  | "snowshowers_polartwilight"
  | "fog"
  | "snowshowersandthunder_day"
  | "snowshowersandthunder_night"
  | "snowshowersandthunder_polartwilight"
  | "lightsnowandthunder"
  | "heavysleetandthunder"
  | "lightrain"
  | "rainshowersandthunder_day"
  | "rainshowersandthunder_night"
  | "rainshowersandthunder_polartwilight"
  | "rain"
  | "lightsnow"
  | "lightrainshowersandthunder_day"
  | "lightrainshowersandthunder_night"
  | "lightrainshowersandthunder_polartwilight"
  | "heavysleet"
  | "sleetandthunder"
  | "lightrainandthunder"
  | "sleet"
  | "lightssleetshowersandthunder_day"
  | "lightssleetshowersandthunder_night"
  | "lightssleetshowersandthunder_polartwilight"
  | "lightsleetandthunder"
  | "partlycloudy_day"
  | "partlycloudy_night"
  | "partlycloudy_polartwilight"
  | "sleetshowersandthunder_day"
  | "sleetshowersandthunder_night"
  | "sleetshowersandthunder_polartwilight"
  | "rainshowers_day"
  | "rainshowers_night"
  | "rainshowers_polartwilight"
  | "snowandthunder"
  | "sleetshowers_day"
  | "sleetshowers_night"
  | "sleetshowers_polartwilight"
  | "cloudy"
  | "heavysnowshowersandthunder_day"
  | "heavysnowshowersandthunder_night"
  | "heavysnowshowersandthunder_polartwilight"
  | "heavysnowshowers_day"
  | "heavysnowshowers_night"
  | "heavysnowshowers_polartwilight";

/* -------------------------------------------------------------------------- */
/* Optional convenience wrappers (useful if you call /compact or /complete)   */
/* -------------------------------------------------------------------------- */

/** GeoJSON point type. */
export interface PointGeometry {
  /** Must be the string literal "Point". */
  type: "Point";

  /**
   * [longitude, latitude, altitude]. All numbers in decimal.
   * Minimum length is 2 (lon, lat). Altitude is optional.
   * @example [60.5, 11.59, 1001]
   */
  coordinates: number[];
}

/** GeoJSON Forecast Timeseries envelope returned by /compact and /complete. */
export interface ForecastResponse {
  /** Must be the string literal "Feature". */
  type: "Feature";

  /** Geometry for the forecast location (GeoJSON Point). */
  geometry: PointGeometry;

  /** Forecast payload (same structure as `Forecast`). */
  properties: Forecast;
}

export interface ForecastLocation {
  name: string;
  forecast: ForecastResponse;
}
