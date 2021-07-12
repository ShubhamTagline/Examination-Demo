import React from "react";
import { useState, useEffect } from "react";
import { localGet } from "../../shared/OtherReuse";
import { reuseApi } from "../../shared/ReuseApi";
import TitleWithTable from "../../shared/TitleWithTable";

function ShowStudent() {
  const [item, setItem] = useState();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const userData = async () => {
      const response = await reuseApi("get", "dashboard/Teachers", null, {
        "access-token": localGet("token"),
      });
      setLoader(false);
      if (response?.data?.statusCode === 200) {
        setItem(response.data?.data);
      }
    };
    userData();
  }, []);

  return (
    <TitleWithTable
      title="Show All Student"
      loader={loader}
      item={item}
      header={["_id", "name", "email", "status"]}
      btnAction={true}
    />
  );
}

export default ShowStudent;
