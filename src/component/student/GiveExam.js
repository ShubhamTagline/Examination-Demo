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
  const initialState = {
    question: "",
    opt1: "",
    opt2: "",
    opt3: "",
    opt4: "",
    answer: "",
  };
  const [item, setItem] = useState(initialState);
  const [result, setResult] = useState();
  const [loader, setLoader] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [paper, setPaper] = useState([]);
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");

  useEffect(() => {
    const examPaper = async () => {
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
        setResult(response.data.data);
      }
    };
    examPaper();
  }, []);

  const handleChange = (e, index) => {
    const cloneItem = { ...item };
    if (index === 1) cloneItem.answer = item.opt1;
    if (index === 3) cloneItem.answer = item.opt2;
    if (index === 5) cloneItem.answer = item.opt3;
    if (index === 7) cloneItem.answer = item.opt4;
    setItem(cloneItem);
  };

  useEffect(() => {
    if (result) {
      let cloneItem = { ...item };
      const data = result[currentQuestion];
      cloneItem.question = data.question;
      cloneItem.opt1 = data.options[0];
      cloneItem.opt2 = data.options[1];
      cloneItem.opt3 = data.options[2];
      cloneItem.opt4 = data.options[3];
      cloneItem.id = data._id;
      cloneItem.answer = "";
      setItem(cloneItem);
    }
  }, [currentQuestion, result]);

  const ShowPaper = () => {
    const data = {};
    data.question = item.id;
    data.answer = item.answer;
    let clonePaper = [...paper];
    clonePaper.push(data);
    setPaper(clonePaper);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (item.answer === "") {
      alert("Please Select Answer");
    } else {
      ShowPaper();
      let page = currentQuestion + 1;
      setCurrentQuestion(page);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (item.answer === "") {
      alert("Please Select Answer");
    } else {
      if (paper.length === result.length - 1) {
        ShowPaper();
      }
        const response = await reuseApi(
          "post",
          `student/giveExam?id=${id}`,
          paper,
          {
            "access-token": localGet("token"),
          }
        );
        console.log(`response`, response);
        alert(response && response.data.message);
    }
  };
  console.log(`paper`, paper);
  return (
    <div className="container">
      <h1>Give Exam Page</h1>
      {loader && showLoader()}
      <br />
      {result && (
        <>
          <p>{currentQuestion + 1}/7</p>
          <InputData
            fields={examPaper}
            data={item}
            onChange={handleChange}
          ></InputData>
          <br />
          {currentQuestion < (result && result.length - 1) ? (
            <ButtonField
              variant="primary"
              value="Save & Next"
              onClick={(e) => handleSave(e)}
            />
          ) : (
            <ButtonField
              variant="primary"
              value="Submit"
              onClick={(e) => handleSubmit(e)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default GiveExam;
