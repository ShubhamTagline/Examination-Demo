import React, { useEffect, useState } from "react";
import { localGet } from "../../shared/OtherReuse";
import { reuseApi } from "../../shared/ReuseApi";
import TitleWithTable from "../../shared/TitleWithTable";

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
    <TitleWithTable
      title="Verify Student"
      loader={loader}
      item={item}
      header={["email", "name", "status"]}
    />
  );
}

export default VerifyStudent;
