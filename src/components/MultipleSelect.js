import React from 'react';

const MultipleSelect = ({
  type,
  optionsArray,
  displayAttribute,
  setOptions
}) => {
  const handleMultipleChange = e => {
    const { options } = e.target;
    const values = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    setOptions(values);
  };

  const renderOptions = (optionsArray, displayAttribute) => {
    return optionsArray.map(option => (
      <option key={option.id} value={option.id}>
        {option[`${displayAttribute}`]}
      </option>
    ));
  };

  return (
    <>
      <select id={type} name={type} onChange={handleMultipleChange} multiple>
        {renderOptions(optionsArray, displayAttribute)}
      </select>
    </>
  );
};

export default MultipleSelect;
