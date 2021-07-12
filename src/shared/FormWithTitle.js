import React from "react";
import InputFields from "./InputFields";
import Loader from "./Loader";
import Title from "./Title";

function FormWithTitle({
  title,
  loader,
  item,
  handleSubmit,
  list,
  handleChange,
  errors,
  submitDisable,
  curQuestion,
}) {
  return (
    <>
      <Title title={title} />
      {loader && <Loader />}
      <p>{curQuestion}</p>
      {item && (
        <form onSubmit={handleSubmit}>
          <InputFields
            fields={list}
            data={item}
            onChange={handleChange}
            errors={errors}
            submitDisable={submitDisable}
          />
        </form>
      )}
    </>
  );
}

export default FormWithTitle;
