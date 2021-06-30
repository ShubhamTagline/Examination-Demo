import React from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router";
import { ButtonField } from "./OtherReuse";

function TableData({ headingCol, tableData, buttonAction }) {
  let history = useHistory();
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
              {buttonAction && data.key === "_id"
                ? (studentId = data.val)
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
        </tr>
      );
    });
  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>{headingCol && headingCol.map((val) => <th>{val}</th>)}</tr>
        </thead>
        <tbody>{dataTable}</tbody>
      </Table>
    </div>
  );
}

export default TableData;
