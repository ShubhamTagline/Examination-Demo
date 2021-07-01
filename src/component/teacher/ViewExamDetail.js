/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { localGet, showLoader } from "../../reusable/OtherReuse";
import { reuseApi } from "../../reusable/ReuseApi";
import TableData from "../../reusable/TableData";

function ViewExamDetail() {
  const [item, setItem] = useState();
  const [loader, setLoader] = useState(true);
  const search = useLocation().search;

  useEffect(() => {
    const userData = async () => {
      const id = new URLSearchParams(search).get("id");
      const response = await reuseApi(
        "get",
        `dashboard/Teachers/examDetail?id=${id}`,
        null,
        { "access-token": localGet("token") }
      );
      if (response.status === 200) {
        setLoader(false);
        if (response.data.statusCode === 200) {
          setItem(response.data.data.questions);
        }
      }
    };
    userData();
  }, []);
  
  return (
    <div className="container">
      <h1>View Exam Details</h1>
      {loader && showLoader()}
      {item && (
        <TableData
          headingCol={["question", "options", "answer"]}
          tableData={item}
        ></TableData>
      )}
    </div>
  );
}

export default ViewExamDetail;
