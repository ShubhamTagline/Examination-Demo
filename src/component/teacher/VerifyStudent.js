import React, { useEffect, useState } from "react";
import { localGet } from "../../reusable/OtherReuse";
import { reuseApi } from "../../reusable/ReuseApi";
import TableData from "../../reusable/TableData";

function VerifyStudent() {
    const [item, setItem] = useState();
    const [heading, setHeading] = useState();

  useEffect(() => {
    const userData = async () => {
      const data = await reuseApi(
        "get",
        "dashboard/Teachers/StudentForExam",
        null,
        { "access-token": localGet("token") }
      );
      if(data.status===200){
        alert(data.data.message)
        if(data.data.statusCode===200){
          const heading=["Status","_id","name","email"]
          setHeading(heading)
          setItem(data.data.data)
        }
      }
    };
    userData();
  }, []);

  return (
    <div className="container">
      <h1>Verify Student </h1>
      <TableData headingCol={heading} tableData={item}></TableData>
    </div>
  );
}

export default VerifyStudent;
