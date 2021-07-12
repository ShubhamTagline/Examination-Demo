/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { localGet } from "../../shared/OtherReuse";
import { reuseApi } from "../../shared/ReuseApi";
import TitleWithTable from "../../shared/TitleWithTable";

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
      setLoader(false);
      if (response?.data?.statusCode === 200) {
        setItem(response.data.data?.questions);
      }
    };
    userData();
  }, []);

  return (
    <TitleWithTable
      title="Exam Paper"
      loader={loader}
      item={item}
      header={["question", "options", "answer"]}
    />
  );
}

export default ViewExamDetail;
