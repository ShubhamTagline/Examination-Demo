import React, { useEffect, useState } from "react";
import { localGet } from "../../reusable/OtherReuse";
import { reuseApi } from "../../reusable/ReuseApi";
import TableData from "../../reusable/TableData";
import Title from "../../reusable/Title";
import Loader from "../../reusable/Loader";

function VerifyStudent() {
  const [item, setItem] = useState();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const userData = async () => {
      const response = await reuseApi(
        "get",
        "dashboard/Teachers/StudentForExam",
        null,
        { "access-token": localGet("token") }
      );
        setLoader(false);
        if (response.data.statusCode === 200) {
          setItem(response.data.data);
        }
    };
    userData();
  }, []);

  return (
    <>
      <Title title="Verify Student "/>
      {loader && <Loader />}
      {item && (
        <TableData
          headingCol={["email", "name", "status"]}
          tableData={item}
        ></TableData>
      )}
    </>
  );
}

export default VerifyStudent;
