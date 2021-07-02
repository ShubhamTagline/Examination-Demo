/* eslint-disable */
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router";
import { questionAry } from "../../contain/FormAry";
import InputFields from "../../reusable/InputFields";
import {
  ButtonField,
  localGet,
  validateFormNext,
  validName,
} from "../../reusable/OtherReuse";
import { reuseApi } from "../../reusable/ReuseApi";

function EditExam() {
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [result, setResult] = useState();
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
  const [item, setItem] = useState(initialState);

  useEffect(() => {
    const examDetails = async () => {
      const response = await reuseApi(
        "get",
        `dashboard/Teachers/examDetail?id=${id}`,
        null,
        { "access-token": localGet("token") }
      );
      if (response.data.statusCode === 200)
        setResult(response.data.data.questions);
    };
    examDetails();
  }, []);

  const handleChange = (e, index) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    let errors = item.errors;

    switch (name) {
      case "question":
        errors.question = validName(value, "Question");
        break;
      case "opt1":
        errors.opt1 = validName(value, "Option");
        break;
      case "opt2":
        errors.opt2 = validName(value, "Option");
        break;
      case "opt3":
        errors.opt3 = validName(value, "Option");
        break;
      case "opt4":
        errors.opt4 = validName(value, "Option");
        break;
      default:
        break;
    }

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
      errors,
    });
  };

  const handlePage = () => {
    let cloneItem = { ...item };
    cloneItem.question = result[currentQuestion].question;
    cloneItem.answer = result[currentQuestion].answer;
    cloneItem.opt1 = result[currentQuestion].options[0];
    cloneItem.opt2 = result[currentQuestion].options[1];
    cloneItem.opt3 = result[currentQuestion].options[2];
    cloneItem.opt4 = result[currentQuestion].options[3];
    setItem(cloneItem);
  };

  useEffect(() => {
    if (result) handlePage();
  }, [currentQuestion, result]);

  const handleErrors = () => {
    const cloneItem = { ...item };
    cloneItem.errors = initialError;
    setItem(cloneItem);
  };

  const commonUpdate = async () => {
    if (confirm("Are you sure you want to Update Question")) {
      const data = result[currentQuestion];
      data.question = item.question;
      data.answer = item.answer;
      data.options[0] = item.opt1;
      data.options[1] = item.opt2;
      data.options[2] = item.opt3;
      data.options[3] = item.opt4;
      const tempData = { questions: result };
        await reuseApi(
        "put",
        `dashboard/Teachers/editExam?id=${id}`,
        tempData,
        {
          "access-token": localGet("token"),
        }
      );
     }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const tempUpdate = Object.values(item.errors).some((val) => val === "");
    if (tempUpdate) {
      if (validateFormNext(item.errors)) {
        commonUpdate()
        handleErrors();
      }
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateFormNext(item.errors)) {
      let page = currentQuestion + 1;
      setCurrentQuestion(page);
      handleErrors();
      const tempUpdate = Object.values(item.errors).some((val) => val === "");
      if (tempUpdate) {
        commonUpdate();
      }
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    if (validateFormNext(item.errors)) {
      const page = currentQuestion - 1;
      setCurrentQuestion(page);
      handleErrors();
      const tempUpdate = Object.values(item.errors).some((val) => val === "");
      if (tempUpdate) {
        commonUpdate();
      }
    }
  };

  return (
    <div>
      <h1>Edit Exam</h1>
      <p>{currentQuestion + 1}/15</p>
      <form>
        <InputFields
          fields={questionAry}
          data={item}
          onChange={handleChange}
          submitDisable={true}
          errors={item.errors}
        ></InputFields>
        <ButtonField value="Edit" onClick={handleEdit} /> &nbsp;
        {currentQuestion !== 14 ? (
          <ButtonField value="Next" onClick={handleNext} />
        ) : (
          <ButtonField value="Next" disable={true} cursorPoint={true} />
        )}
        &nbsp;&nbsp;
        {currentQuestion === 0 ? (
          <ButtonField value="Previous" disable={true} cursorPoint={true} />
        ) : (
          <ButtonField value="Previous" onClick={handlePrevious} />
        )}
      </form>
    </div>
  );
}

export default EditExam;
