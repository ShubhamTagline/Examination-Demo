import React from "react";

function OptionField({ values, name, data, onChange, disable, errors }) {
   return (
    <>
      <select
        name={name}
        disabled={disable}
        onChange={onChange}
        defaultValue={data ? data : "Choose here"}
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
      <p className="errorMsg">{errors && errors}</p>
    </>
  );
}

export default OptionField;
