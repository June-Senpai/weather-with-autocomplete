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
    <div className="border-b-2">
      {autoCompleteState.map((item, index) => (
        <div key={index} onClick={() => handleClick(item.localityName)} className="">
          {item.localityName}
        </div>
      ))}
    </div>
  );
};
export default AutoComplete;
