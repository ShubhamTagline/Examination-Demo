/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { localGet } from "../../shared/OtherReuse";
import { reuseApi } from "../../shared/ReuseApi";
import TableData from "../../shared/TableData";
import TitleWithTable from "../../shared/TitleWithTable";

function GetStudent() {
  const search = useLocation().search;
  const [item, setItem] = useState();
  const [result, setResult] = useState();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const userData = async () => {
      const id = new URLSearchParams(search).get("id");
      const response = await reuseApi(
        "get",
        `dashboard/Teachers/viewStudentDetail?id=${id}`,
        null,
        { "access-token": localGet("token") }
      );
      setLoader(false);
      if (response.data.statusCode === 200) {
        setItem(response.data.data);
        setResult(response.data.data[0].Result);
      }
    };
    userData();
  }, []);

  return (
    <>
      <TitleWithTable
        title="Get Student"
        loader={loader}
        item={item}
        header={["name", "email"]}
      />

      {result && result.length > 0 && (
        <TableData
          headingCol={["subjectName", "score", "rank", "resultStatus"]}
          tableData={result}
        ></TableData>
      )}
    </>
  );
}

export default GetStudent;
