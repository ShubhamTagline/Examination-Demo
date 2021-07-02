/* eslint-disable */
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { examPaper } from "../../contain/FormAry";
import InputData from "../../reusable/InputData";
import { ButtonField, localGet, showLoader } from "../../reusable/OtherReuse";
import { reuseApi } from "../../reusable/ReuseApi";

function GiveExam() {
  const [item, setItem] = useState();
  const [loader, setLoader] = useState(true);
  const search = useLocation().search;

  useEffect(() => {
    const examPaper = async () => {
      const id = new URLSearchParams(search).get("id");
      const response = await reuseApi(
        "get",
        `student/examPaper?id=${id}`,
        null,
        {
          "access-token": localGet("token"),
        }
      );

      if (response.data.statusCode === 200) {
        setLoader(false);
        setItem(response.data.data);
        let cloneItem={...item}
        cloneItem.question=response.data.data[0].question
        setItem(cloneItem)
      }
    };
    examPaper();
  }, []);

  return (
    <div className="container">
      <h1>Give Exam Page</h1> 
      {loader && showLoader()}
      {console.log(`item`, item)}
      <br />{item && (
        <>
          <InputData fields={examPaper} data={item}></InputData><br />
          <ButtonField
            variant="primary"
            value="Save & Next"
          ></ButtonField> 
        </>
      )}
    </div>
  );
}

export default GiveExam;
