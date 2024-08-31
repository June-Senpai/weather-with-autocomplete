"use client";

import { CsvItem } from "../util/utils";
import { LocalityItem } from "./Weather";

type AutoCompleteProps = {
  autoCompleteState: LocalityItem[] | CsvItem[];
  setSelectedLocality: (locality: LocalityItem | string) => void;
  setInputValue: (value: string) => void;
};

const AutoComplete = ({
  autoCompleteState,
  setSelectedLocality,
  setInputValue,
}: AutoCompleteProps) => {
  const handleClick = (item: string) => {
    setSelectedLocality(item);
    setInputValue(item);
  };

  return (
    <div className="border-b-2  flex flex-col ">
      {autoCompleteState.map((item, index) => (
        <button
          key={index}
          onClick={() => handleClick(item.localityName)}
          className="flex-1 hover:bg-gray-200 text-left px-4 py-1">
          {item.localityName}
        </button>
      ))}
    </div>
  );
};
export default AutoComplete;
