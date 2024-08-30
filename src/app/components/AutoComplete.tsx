"use client";

type LocalityItem = {
  localityId: string;
  localityName: string;
};

type AutoCompleteProps = {
  autoCompleteState: LocalityItem[];
  setSelectedLocality: (locality: LocalityItem) => void;
  setInputValue: (value: string) => void;
};

const AutoComplete = ({
  autoCompleteState,
  setSelectedLocality,
  setInputValue,
}: AutoCompleteProps) => {
  const handleClick = (item) => {
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
