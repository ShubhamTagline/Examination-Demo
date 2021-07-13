/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { questionAry } from "../../shared/FormAry";
import FormWithTitle from "../../shared/FormWithTitle";
import Loader from "../../shared/Loader";
import {
  ButtonField,
  localGet,
  validateFormNext,
} from "../../shared/OtherReuse";
import { reuseApi } from "../../shared/ReuseApi";
import { handleCase } from "../../shared/ValidCase";

function EditExam() {
  const initialError = {
    question: " ",
    opt1: " ",
    opt2: " ",
    opt3: " ",
    opt4: " ",
    answer: " ",
  };
  const initialState = {
    question: "",
    opt1: "",
    opt2: "",
    opt3: "",
    opt4: "",
    answer: "",
    errors: initialError,
  };

  const [item, setItem] = useState({ ...initialState });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [result, setResult] = useState();
  const [loader, setLoader] = useState(true);
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");

  useEffect(() => {
    const examDetails = async () => {
      const response = await reuseApi(
        "get",
        `dashboard/Teachers/examDetail?id=${id}`,
        null,
        { "access-token": localGet("token") }
      );
      setLoader(false);
      if (response.data.statusCode === 200)
        setResult(response.data.data.questions);
    };
    examDetails();
  }, []);

  const handleChange = (e, index) => {
    const name = e.target.name;
    const value = e.target.value;

    let cloneItem = { ...item };
    let data = handleCase(name, value);
    cloneItem.errors[name] = (data && data) || "";

    if (index === 1) {
      item.answer = item.opt1;
    } else if (index === 3) {
      item.answer = item.opt2;
    } else if (index === 5) {
      item.answer = item.opt3;
    } else if (index === 7) {
      item.answer = item.opt4;
    }
    if (item.answer !== "") {
      item.errors.answer = "";
    }

    setItem({
      ...item,
      [name]: value ? value.trim() && value.replace(/\s+/g, " ") : value,
      errors: cloneItem.errors,
    });
  };
  console.log(`item`, item);

  useEffect(() => {
    if (result) {
      let cloneItem = { ...item };
      const listData = result[currentQuestion];
      cloneItem.question = listData.question;
      cloneItem.answer = listData.answer;
      cloneItem.opt1 = listData.options[0];
      cloneItem.opt2 = listData.options[1];
      cloneItem.opt3 = listData.options[2];
      cloneItem.opt4 = listData.options[3];
      setItem(cloneItem);
    }
  }, [currentQuestion, result]);

  const handleErrors = () => {
    const cloneItem = { ...item };
    cloneItem.errors = initialError;
    setItem(cloneItem);
  };

  const updateQuestion = async () => {
    const data = result[currentQuestion];
    data.question = item.question;
    data.answer = item.answer;
    data.options[0] = item.opt1;
    data.options[1] = item.opt2;
    data.options[2] = item.opt3;
    data.options[3] = item.opt4;
    const tempData = { questions: result };
    await reuseApi("put", `dashboard/Teachers/editExam?id=${id}`, tempData, {
      "access-token": localGet("token"),
    });
  };

  const commonUpdate = () => {
    if (confirm("Are you sure you want to Update Question")) {
      updateQuestion();
    }
  };

  const tempUpdate = Object.values(item.errors).some((val) => val === "");
  const handleEdit = async (e) => {
    e.preventDefault();
    if (tempUpdate && validateFormNext(item.errors)) {
      updateQuestion();
      handleErrors();
    }
  };

  const PreviousNext = (e, value) => {
    e.preventDefault();
    if (validateFormNext(item.errors)) {
      setCurrentQuestion(value);
      if (tempUpdate) commonUpdate();
      handleErrors();
    }
  };

  return (
    <>
      {loader && <Loader />}
      {result && (
        <>
          <FormWithTitle
            title="Edit Exam"
            item={item}
            list={questionAry}
            submitDisable={true}
            handleChange={handleChange}
            errors={item.errors}
            curQuestion={`${currentQuestion + 1}/15`}
          />
          <ButtonField value="Edit" onClick={handleEdit} /> &nbsp;
          {currentQuestion !== 14 ? (
            <ButtonField
              value="Next"
              onClick={(e) => PreviousNext(e, currentQuestion + 1)}
            />
          ) : (
            <ButtonField value="Next" disable={true} cursorPoint={true} />
          )}
          &nbsp;&nbsp;
          {currentQuestion === 0 ? (
            <ButtonField value="Previous" disable={true} cursorPoint={true} />
          ) : (
            <ButtonField
              value="Previous"
              onClick={(e) => PreviousNext(e, currentQuestion - 1)}
            />
          )}
        </>
      )}
    </>
  );
}

export default EditExam;
