import React from "react";

function OptionField({ values, name, onChange }) {
  return (
    <>
      <select name={name} onChange={onChange} defaultValue="Choose here">
        {values.data.map((val, index) => (
          <React.Fragment key={index}>
           index === 0 ? 
            <option disabled hidden>
              Choose here
            </option> : null
            <option value={val.item}>{val.item}</option>
          </React.Fragment>
        ))}
      </select>
    </>
  );
}

export default OptionField;
