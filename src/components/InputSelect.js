import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

function InputSelect(props) {
  const selectedItems = props.selected.map((item) => ({
    value: item,
    label: item,
  }));
  const listItems = props.items.map((item) => ({ value: item, label: item }));
  const animatedComponents = makeAnimated();

  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      name={props.name}
      options={listItems}
      defaultValue={selectedItems}
      onChange={props.handleChartChange}
    />
  );
}

export default InputSelect;
