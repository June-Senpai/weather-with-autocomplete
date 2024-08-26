"use client";
import { useState } from "react";
import { getAutoComplete, getWeatherData } from "../util/serverAction";
import AutoComplete from "./AutoComplete";

const Weather = () => {
  const [weatherState, setWeatherState] = useState(null);
  const [autoCompleteState, setAutoCompleteState] = useState(null);
  const [selectedLocality, setSelectedLocality] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const localityId = selectedLocality?.localityId || autoCompleteState[0]?.localityId;
    if (!localityId) {
      return;
    }
    const data = await getWeatherData(localityId);
    setWeatherState(data);
  };

  const handleOnChange = async (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
    setSelectedLocality(null);

    if (inputValue !== "") {
      const data = await getAutoComplete(inputValue);
      setAutoCompleteState(data);
    } else {
      setAutoCompleteState(null);
    }
  };
  console.log(inputValue);

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="localityName"
          autoFocus
          value={inputValue}
          onChange={handleOnChange}
          className="border-2"
        />
        <button type="submit">Click me</button>
        {JSON.stringify(weatherState)}
      </form>
      {selectedLocality ? (
        <div className=""> </div>
      ) : (
        autoCompleteState && (
          <AutoComplete
            autoCompleteState={autoCompleteState}
            setSelectedLocality={setSelectedLocality}
            setInputValue={setInputValue}
          />
        )
      )}
    </div>
  );
};

export default Weather;
