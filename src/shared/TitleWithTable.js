import React from 'react'
import Loader from './Loader';
import TableData from './TableData';
import Title from './Title';

function TitleWithTable({ title, loader, item, header, btnAction, btnView }) {
  return (
    <>
      <Title title={title} />
      {loader && <Loader />}
      {item && (
        <TableData
          headingCol={header}
          tableData={item}
          buttonAction={btnAction}
          viewExam={btnView}
        ></TableData>
      )}
    </>
  );
}

export default TitleWithTable
