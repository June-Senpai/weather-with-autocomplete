"use client";

const AutoComplete = ({ autoCompleteState, setSelectedLocality, setInputValue }) => {
  const handleClick = (item) => {
    setSelectedLocality(item);
    setInputValue(item);
  };
  return (
    <div className="">
      {autoCompleteState.map((item, index) => (
        <div key={index} onClick={() => handleClick(item.localityName)} className="">
          {item.localityName}
        </div>
      ))}
    </div>
  );
};
export default AutoComplete;
