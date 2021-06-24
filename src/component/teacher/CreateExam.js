import React from "react";
import { useState } from "react";
import { questionAry, subjectAry } from "../../contain/FormAry";
import InputFields from "../../reusable/InputFields";
import OptionField from "../../reusable/OptionField";
import {
  ButtonField,
  validateForm,
  validName,
} from "../../reusable/OtherReuse";

function CreateExam() {
  const initialState = {
    question: "",
    opt1: "",
    opt2: "",
    opt3: "",
    opt4: "",
    answer: "",
    errors: {
      subjectName: " ",
      question: " ",
      opt1: " ",
      opt2: " ",
      opt3: " ",
      opt4: " ",
      answer: " ",
    },
  };

  const [item, setItem] = useState(initialState);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [result, setResult] = useState({
    subjectName: "",
    questions: [],
  });

  const handleChange = (e, index) => {
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
      case "subjectName":
        errors.subjectName = validName(value);
        setResult({ ...result, subjectName: value });
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

  const handleClick = (e) => {
    e.preventDefault();
    const validData = (itemVal, question, msg) => {
      if (itemVal === "") {
        let cloneError = { ...item };
        cloneError.errors[question] = msg;
        setItem(cloneError);
      } else {
        item.errors[question] = "";
      }
    };
    const optionMsg = "Please Enter Option";
    validData(result.subjectName, "subjectName", "Please Choose Subject");
    validData(item.question, "question", "Please Enter Question");
    validData(item.opt1, "opt1", optionMsg);
    validData(item.opt2, "opt2", optionMsg);
    validData(item.opt3, "opt3", optionMsg);
    validData(item.opt4, "opt4", optionMsg);
    validData(item.answer, "answer", "Please Select Correct Answer");

    if (validateForm(item.errors)) {
      const optionAry = [];
      optionAry.push(item.opt1, item.opt2, item.opt3, item.opt4);
      const data = {};
      data.question = item.question;
      data.answer = item.answer;
      data.options = optionAry;
      let cloneResult = { ...result };
      cloneResult.questions.push(data);
      setResult(cloneResult);
      localStorage.setItem("examPaper", JSON.stringify(result));
      setItem(initialState);
      setCurrentQuestion(result.questions.length);
      console.log(`Result`, result);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick(e);
    window.location.reload();
    console.log(result);
    alert("Quiz Successfully Submit");
  };

  const handlePage = (page) => {
    let tempData = result.questions[page];
    setCurrentQuestion(page);
    let cloneItem = { ...item };
    cloneItem.question = tempData.question;
    cloneItem.answer = tempData.answer;
    cloneItem.opt1 = tempData.options[0];
    cloneItem.opt2 = tempData.options[1];
    cloneItem.opt3 = tempData.options[2];
    cloneItem.opt4 = tempData.options[3];
    setItem(cloneItem);
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    let page = currentQuestion - 1;
    handlePage(page);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (result.questions.length - currentQuestion === 1) {
      setCurrentQuestion(currentQuestion+1) 
      setItem(initialState)
    }else{
      let page = currentQuestion + 1;
      handlePage(page);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const validateUpdate = (val, newVal) => {
      if (val === " ") {
        let cloneQuestion = { ...item };
        cloneQuestion.errors[newVal] = "";
        setItem(cloneQuestion);
      }
    };
    validateUpdate(item.errors.opt1, "opt1");
    validateUpdate(item.errors.opt2, "opt2");
    validateUpdate(item.errors.opt3, "opt3");
    validateUpdate(item.errors.opt4, "opt4");
    validateUpdate(item.errors.subjectName, "subjectName");
    validateUpdate(item.errors.question, "question");
    validateUpdate(item.errors.answer, "answer");

    if (validateForm(item.errors)) {
      const optionAry = [];
      optionAry.push(item.opt1, item.opt2, item.opt3, item.opt4);
      const data = {};
      data.question = item.question;
      data.answer = item.answer;
      data.options = optionAry;
      let cloneResult = { ...result };
      cloneResult.questions[currentQuestion] = data;
      setResult(cloneResult);
      console.log(`result`, result);
    } else {
      alert("Please Fill Proper Form");
    }
  };

  return (
    <div>
      <h1>Create Exam Module</h1>
      <form>
        <OptionField
          values={subjectAry}
          name="subjectName"
          onChange={handleChange}
          disable={result.questions.length !== 0 ? true : false}
          errors={item.errors.subjectName}
        ></OptionField>
        <p>{currentQuestion + 1}/15</p>
        <InputFields
          fields={questionAry}
          data={item}
          onChange={handleChange}
          submitDisable={true}
          errors={item.errors}
        ></InputFields>
        {result.questions.length >= 14 ? (
          <ButtonField type="submit" value="Submit" onClick={handleSubmit} />
        ) : result.questions.length !== currentQuestion ? (
          <ButtonField value="Update" onClick={handleUpdate} />
        ) : (
          <ButtonField value="Add" onClick={handleClick} />
        )}
        &nbsp;&nbsp;
        {result.questions.length > currentQuestion ? (
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
export default CreateExam;
