"use client";
import { useState } from "react";
import { getAutoComplete, getWeatherData } from "../util/serverAction";
import AutoComplete from "./AutoComplete";
import Image from "next/image";
import Button from "./ui/button";
import WeatherCard from "./ui/WeatherCard";
import { CsvItem } from "../util/utils";

type WeatherDataProps = {
  temperature: number;
  humidity: number;
  wind_speed: number;
  wind_direction: number;
  rain_intensity: number;
  rain_accumulation: number;
};

export type LocalityItem = {
  localityId: string;
  localityName: string;
};

const Weather = () => {
  const [weatherState, setWeatherState] = useState<WeatherDataProps | null>(null);
  const [autoCompleteState, setAutoCompleteState] = useState<LocalityItem[] | CsvItem[] | null>(
    null
  );
  const [selectedLocality, setSelectedLocality] = useState<string | LocalityItem | null>(null);
  const [inputValue, setInputValue] = useState("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let localityId;

    if (typeof selectedLocality === "string") {
      localityId = autoCompleteState?.[0]?.localityId;
    } else {
      localityId = selectedLocality?.localityId;
    }
    if (!localityId) {
      return;
    }
    const data = await getWeatherData(localityId);
    setWeatherState(data);
  };

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
    setSelectedLocality(null);

    if (inputValue !== "") {
      const data = await getAutoComplete(inputValue);
      if (data !== undefined) {
        setAutoCompleteState(data);
      }
    } else {
      setAutoCompleteState(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} className="flex gap-5 items-center" autoComplete="off">
        <div className="relative ">
          <input
            type="text"
            name="localityName"
            autoFocus
            value={inputValue}
            onChange={handleOnChange}
            className={` h-[55px] md:w-[500px] w-60 p-2 indent-12 focus:outline-none ${
              !selectedLocality && autoCompleteState
                ? "border-t-2 border-x-2 rounded-t-xl "
                : "border-2 rounded-xl hover:drop-shadow-lg "
            }`}
          />
          <Image
            src={"./Search Icon.svg"}
            height={20}
            width={20}
            alt="Logo"
            className="absolute top-[18px] left-5 "
          />
          <div className="absolute border-x-2 top-12 w-full left-0 rounded-b-md shadow-lg bg-white z-50">
            {!selectedLocality && autoCompleteState && (
              <AutoComplete
                autoCompleteState={autoCompleteState}
                setSelectedLocality={setSelectedLocality}
                setInputValue={setInputValue}
              />
            )}
          </div>
        </div>
        <Button>Search</Button>
      </form>
      {weatherState && <WeatherCard {...weatherState} />}
    </div>
  );
};

export default Weather;
