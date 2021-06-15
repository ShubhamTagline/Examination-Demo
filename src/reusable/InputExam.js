import React from 'react'

function InputExam({ fields, data, onChange, ...props }) {
  return (
    <div>
      {fields.data.map((val,index) => (
        <div key={index}>
          {val.label && <label>{val.label} &nbsp;</label>}
          <input
            type={val.type}
            name={val.name}
            placeholder={val.placeholder}
            value={val.value ? val.value : data && data[val.name]}
            onChange={(e) => onChange(e,index)}
            {...props}
            className="mb-2"
          />
        </div>
      ))}
    </div>
  );
}

export default InputExam
