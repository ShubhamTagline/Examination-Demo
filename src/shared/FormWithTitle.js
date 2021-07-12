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
      {loader && <Loader />}
      <Title title={title} />
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
