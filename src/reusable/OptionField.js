import React from "react";

function OptionField({ values, name, onChange, disable }) {
  // console.log(disable)
  return (
    <>
      <select
        name={name}
        disabled={disable}
        onChange={onChange}
        defaultValue="Choose here"
      >
        {values.data.map((val, index) => (
          <React.Fragment key={index}>
            index === 0 ?
            <option disabled hidden>
              Choose here
            </option>
            : null
            <option value={val.item}>{val.item}</option>
          </React.Fragment>
        ))}
      </select>
    </>
  );
}

export default OptionField;
