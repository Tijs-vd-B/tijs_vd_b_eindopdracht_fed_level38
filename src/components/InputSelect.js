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
      //   className="song-form-item"
      name={props.name}
      options={listItems}
      defaultValue={selectedItems}
      //   selectValue={props.items[0]}
      //   placeholder={props.placeholder}
      onChange={props.handleChange}
    />
  );
}

export default InputSelect;
