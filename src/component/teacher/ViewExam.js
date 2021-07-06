import React, { useEffect, useState } from "react";
import Loader from "../../reusable/Loader";
import { localGet  } from "../../reusable/OtherReuse";
import { reuseApi } from "../../reusable/ReuseApi";
import TableData from "../../reusable/TableData";
import Title from "../../reusable/Title";

function ViewExam() {
  const [item, setItem] = useState();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const userData = async () => {
      const response = await reuseApi("get", "dashboard/Teachers/viewExam", null, {
        "access-token": localGet("token"),
      });
      setLoader(false);
      if (response.data.statusCode === 200) {
        setItem(response.data.data);
      }
    };
    userData();
  }, []);

  return (
    <>
      <Title title="View Exam Details"></Title>
      {loader && <Loader/>}
      {item && <TableData headingCol={["_id", "email", "subjectName","notes"]} tableData={item} buttonAction={false} viewExam={true} ></TableData>}
    </>
  );
}

export default ViewExam;
