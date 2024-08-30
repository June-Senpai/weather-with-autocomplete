"use server";
import axios from "axios";
import CSVtoJson from "./utils";

export const getWeatherData = async (locality_id: string) => {
  const options = {
    method: "GET",
    url: "https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data",
    params: { locality_id: locality_id },
    headers: { "X-Zomato-Api-Key": process.env.WEATHER_KEY },
  };

  try {
    const { data } = await axios.request(options);
    if (data.status == 200) {
      return data?.locality_weather_data;
    } else {
      return { ...data?.locality_weather_data, message: data?.message };
    }
  } catch (error) {
    console.error(error);
    return "not found";
  }
};

export const getAutoComplete = async (localityName: string) => {
  const localityData = await CSVtoJson();
  return localityData
    ?.filter((item) => {
      if (!item.localityName) {
        return false;
      }
      return item.localityName.toLowerCase().includes(localityName.toLowerCase());
    })
    .slice(0, 10);
};
