import React from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router";
import { ButtonField } from "./OtherReuse";

function TableData({ headingCol, tableData }) {
  
  let history=useHistory()
  const dataTable =
    tableData &&
    tableData.map((row, index) => {
      let rowData = [];
      let i = 0;
      for (const key in row) {  
        rowData.push({
          key: headingCol[i],
          val: row[key],
        });
        i++;
      }

      let studentId = 0;

      return (
        <tr key={index}>
          {rowData.map((data, index) => (
              <td key={index}>
                {data.val}
                {headingCol.includes("Action") && data.key === "_id"
                  ? (studentId = data.val)
                  : null}
              </td>
          ))}
          {headingCol.includes("Action") && (
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
