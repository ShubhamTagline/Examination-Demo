/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { localGet } from "../../reusable/OtherReuse";
import { reuseApi } from "../../reusable/ReuseApi";
import TableData from "../../reusable/TableData";

function GetStudent() {
  const search = useLocation().search;
  const [item, setItem] = useState();
  const [result, setResult] = useState();

  useEffect(() => {
    const userData = async () => {
      const id = new URLSearchParams(search).get("id");
      const data = await reuseApi(
        "get",
        `dashboard/Teachers/viewStudentDetail?id=${id}`,
        null,
        { "access-token": localGet("token") }
      );
         console.log(data)
      if (data.status === 200) {
        alert(data.data.message);
        if (data.data.statusCode === 200) {
          data.data.data[0].Result.map((val) => {
            delete val.__v;
            delete val.studentId;
            delete val._id;
            delete val.studentAnswer
          });

          setResult(data.data.data[0].Result);
          {data.data.data[0].Result && delete data.data.data[0].Result}
          setItem(data.data.data);
        }
      }
    };
    userData();
  }, []);

  return (
    <div className="container">
      <h1>get student</h1>
      {item && (
        <TableData
          headingCol={["id", "name", "Email"]}
          tableData={item}
        ></TableData>
      )}
      {item && (
        <TableData
          headingCol={["Subject Name", "Result Status", "Score", "Rank"]}
          tableData={result}
        ></TableData>
      )}
    </div>
  );
}

export default GetStudent;
