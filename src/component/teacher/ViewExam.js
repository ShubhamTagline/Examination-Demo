import React, { useEffect, useState } from "react";
import { localGet, showLoader } from "../../reusable/OtherReuse";
import { reuseApi } from "../../reusable/ReuseApi";
import TableData from "../../reusable/TableData";

function ViewExam() {
  const [item, setItem] = useState();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const userData = async () => {
      const response = await reuseApi("get", "dashboard/Teachers/viewExam", null, {
        "access-token": localGet("token"),
      });
      if (response.status === 200) {
        setLoader(false);
        if (response.data.statusCode === 200) {
           setItem(response.data.data);
        }
      }
    };
    userData();
  }, []);

  return (
    <div className="container">
      <h1>View Exam Details</h1>
      {loader && showLoader()}
      {item && <TableData headingCol={["_id", "email", "subjectName","notes"]} tableData={item} buttonAction={false} viewExam={true} ></TableData>}
    </div>
  );
}

export default ViewExam;
