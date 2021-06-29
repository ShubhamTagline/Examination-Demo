import React from "react";
import { ButtonField } from "./OtherReuse";
import propTypes from "prop-types";

function InputFields({ fields, data, errors, onChange,submitDisable}) {
  
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
              value={val.value ? val.value : data && data[val.name]}
              checked={
                data.answer &&
                data[fields?.data[index + 1]?.name] === data.answer
              }
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
      {submitDisable ? null : (
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
//https://stackoverflow.com/questions/48014390/how-to-handle-multiple-radio-button-groups-in-one-component-in-reactjs


//bugs I need to solve
// 1]first question update time subjectName blank error 
// 2]Radio button Update ans need to blank
// 3]previous button when last question not properly work 
// 4]Add notes functionality. (working on It from 3:15 PM) almost done for 6:30 (only Validation Manage some Issue)