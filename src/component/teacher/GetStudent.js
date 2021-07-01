/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { localGet, showLoader } from "../../reusable/OtherReuse";
import { reuseApi } from "../../reusable/ReuseApi";
import TableData from "../../reusable/TableData";

function GetStudent() {
  const search = useLocation().search;
  const [item, setItem] = useState();
  const [result, setResult] = useState();
  const [loader,setLoader]=useState(true)

  useEffect(() => {
    const userData = async () => {
      const id = new URLSearchParams(search).get("id");
      const data = await reuseApi(
        "get",
        `dashboard/Teachers/viewStudentDetail?id=${id}`,
        null,
        { "access-token": localGet("token") }
      );
      if (data.status === 200) {
        setLoader(false)
         if (data.data.statusCode === 200) {
          setItem(data.data.data);
          setResult(data.data.data[0].Result);
        }
      }
    };
    userData();
  }, []);
 
  return (
    <div className="container">
      <h1>get student</h1>
      {loader && showLoader()}
      {item && (
        <TableData headingCol={["name", "email"]} tableData={item}></TableData>
      )}
      {(result && result.length>0) && (
        <TableData
          headingCol={["subjectName", "score", "rank", "resultStatus"]}
          tableData={result}
        ></TableData>
      )}
    </div>
  );
}

export default GetStudent;
