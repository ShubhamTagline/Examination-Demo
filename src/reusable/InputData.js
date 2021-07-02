import React from 'react'

function InputData({fields,data}) {
  return (
    <div>
      {fields.data.map((val,index)=>{
        return (
          <div key={index}>
            {val.label && <label>{val.label} &nbsp;</label>}
            <input
              type={val.type}
              name={val.name}
              placeholder={val.placeholder}
              className="mb-3"
              value={data[val.name] || ""}
              readOnly
              // checked={
              //   data.answer &&
              //   data[fields?.data[index + 1]?.name] === data.answer
              // }
              // onChange={(e) => onChange(e, index, val)}
            />
            {/* <div className="errorMsg mb-3">{errors && errors[val.name]}</div> */}
          </div>
        );
      })}
    </div>
  )
}

export default InputData
