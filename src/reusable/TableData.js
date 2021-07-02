import React from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router";
import { ButtonField, localGet } from "./OtherReuse";
import { reuseApi } from "./ReuseApi";

function TableData({ headingCol, tableData, buttonAction, viewExam }) {
  let history = useHistory();

  const handleDelete = async(id) => {
    const response = await reuseApi(
      "DELETE",
      `dashboard/Teachers/deleteExam?id=${id}`,
      null,
      { "access-token": localGet("token") }
    );
    console.log(`response`, response)
    alert(response.data.message)
    window.location.reload()
  };

  const dataTable =
    tableData &&
    tableData.map((row, index) => {
      let rowData = [];
      let i = 0;
      for (i = 0; i < headingCol.length; i++) {
        rowData.push({
          key: headingCol[i],
          val: row[headingCol[i]],
        });
      }
  
      let studentId = 0;
      return (
        <tr key={index}>
          {rowData.map((data, index) => (
            <td key={index}>
              {data.key === "_id"
                ? (studentId = data.val)
                : Array.isArray(data.val)
                ? data.val.map((aryVal, index) => (
                    <React.Fragment key={index}>
                      {aryVal}
                      <br />
                    </React.Fragment>
                  ))
                : data.val}
            </td>
          ))}
          {buttonAction && (
            <td>
              <ButtonField
                variant="success"
                value="View"
                onClick={() => history.push(`/getStudent?id=${studentId}`)}
              ></ButtonField>
            </td>
          )}
          {viewExam && (
            <>
              <td>
                <ButtonField
                  variant="success"
                  value="View"
                  onClick={() =>
                    history.push(`/viewExamDetail?id=${studentId}`)
                  }
                ></ButtonField>
              </td>
              <td>
                <ButtonField
                  variant="success"
                  value="Edit"
                  onClick={() => history.push(`/editExam?id=${studentId}`)}
                ></ButtonField>
              </td>
              <td>
                <ButtonField
                  variant="danger"
                  value="Delete"
                  onClick={() => handleDelete(studentId)}
                ></ButtonField>
              </td>
            </>
          )}
        </tr>
      );
    });

  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>{headingCol && headingCol.map((val,index) => <th key={index}>{val}</th>)}</tr>
        </thead>
        <tbody>{dataTable}</tbody>
      </Table>
    </div>
  );
}

export default TableData;
