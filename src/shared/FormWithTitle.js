import React from 'react'
import InputFields from './InputFields';
import Loader from './Loader';
import Title from './Title';

function FormWithTitle({ title, loader, item, handleSubmit, list, handleChange,errors }) {
  return (
    <>
      <Title title={title} />
      {loader && <Loader />}
      {item && (
        <form onSubmit={handleSubmit}>
          <InputFields
            fields={list}
            data={item}
            onChange={handleChange}
            errors={errors}
          />
        </form>
      )}
    </>
  );
}

export default FormWithTitle
