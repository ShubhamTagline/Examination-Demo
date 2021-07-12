/* eslint-disable */
import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { examPaper } from "../../shared/FormAry";
import { ButtonField, localGet } from "../../shared/OtherReuse";
import { reuseApi } from "../../shared/ReuseApi";
import Loader from "../../shared/Loader";
import FormWithTitle from "../../shared/FormWithTitle";

const initialState = {
  question: "",
  opt1: "",
  opt2: "",
  opt3: "",
  opt4: "",
  answer: "",
};
function GiveExam() {
  const [item, setItem] = useState({ ...initialState });
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
      setLoader(false);
      if (response.data.statusCode === 200) {
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

  const handleSave = (e) => {
    e.preventDefault();
    if (item.answer) {
      structureItem(item);
      let page = currentQuestion + 1;
      setCurrentQuestion(page);
    } else {
      alert("Please Select Answer");
    }
  };

  const structureItem = (item) => {
    const data = {};
    data.question = item.id;
    data.answer = item.answer;
    if (paper.length <= 6) paper.push(data);
    const cloneList = paper.slice();
    setPaper(cloneList);
    return cloneList;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    structureItem(item);
    if (item.answer) {
      const response = await reuseApi(
        "post",
        `student/giveExam?id=${id}`,
        paper,
        {
          "access-token": localGet("token"),
        }
      );
      alert(response && response.data.message);
    } else {
      alert("Please Select Answer");
    }
  };

  return (
    <>
      {loader && <Loader />}
      {result && (
        <>
          <FormWithTitle
            title="Give Exam"
            item={item}
            list={examPaper}
            handleChange={handleChange}
            submitDisable={true}
            curQuestion={`${currentQuestion + 1}/7`}
          />
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
    </>
  );
}

export default GiveExam;
