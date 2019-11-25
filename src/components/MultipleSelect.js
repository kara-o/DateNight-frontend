import React from 'react';

const MultipleSelect = () => {
  const handleMultipleChange = e => {
    const { options } = e.target;
    const values = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    console.log(values);
  };

  return (
    <>
      <label htmlFor='cuisine'> Cuisine(s) </label>
      <select
        id='cuisine'
        name='cuisine'
        onChange={handleMultipleChange}
        multiple
      >
        {renderOptions(cuisines)}
      </select>
      <label htmlFor='neighborhood'> Neighborhood(s) </label>
      <select
        id='neighborhood'
        name='neighborhood'
        onChange={handleMultipleChange}
        multiple
      >
        {renderOptions(neighborhoods)}
      </select>
      <label htmlFor='price'> Price Range </label>
    </>
  );
};

export default MultipleSelect;
