import React from "react";
import { ButtonField } from "./OtherReuse";
import propTypes from "prop-types";

function InputFields({ fields, data, errors, onChange, check, submitDisable }) {
  // console.log(check)  //we have to specify condition Here to continue with radio button
 
  return (
    <>
      {fields.data.map((val, index) => {
        return (
          <div key={index}>
            {val.label && <label>{val.label} &nbsp;</label>}
            <input
              type={val.type}
              name={val.name}
              placeholder={val.placeholder}
              checked={check} //val.type === "radio" && data && data[val.name]===
              value={val.value ? val.value : data && data[val.name]}
              {...(val.type === "password" && { autoComplete: "on" })}
              {...(val.name === "emailProfile" || val.name === "answer"
                ? { readOnly: true }
                : { readOnly: false })}
              onChange={(e) => onChange(e, index, val)}
            ></input>
            <div className="errorMsg mb-3">{errors && errors[val.name]}</div>
          </div>
        );
      })}
      {submitDisable ? (
        ""
      ) : (
        <ButtonField
          type="submit"
          variant="primary"
          value="Submit"
        ></ButtonField>
      )}
    </>
  );
}

InputFields.propTypes = {
  fields: propTypes.object,
  data: propTypes.object,
  errors: propTypes.object,
  onChange: propTypes.func,
};

export default InputFields;

//radio button explanation
// http://react.tips/radio-buttons-in-reactjs/
