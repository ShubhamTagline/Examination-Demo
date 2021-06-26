/* eslint-disable */
import React, { useEffect } from "react";
import { useState } from "react";
import { questionAry, subjectAry } from "../../contain/FormAry";
import InputFields from "../../reusable/InputFields";
import OptionField from "../../reusable/OptionField";
import {
  ButtonField,
  validateForm,
  validateFormNext,
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
    subjectName: "",
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

  const storageItem = JSON.parse(localStorage.getItem("examPaper"));

  const [item, setItem] = useState(initialState);
  const [currentQuestion, setCurrentQuestion] = useState(
    (storageItem && storageItem.questions.length) || 0
  );

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
        break;
      default:
        break;
    }

    //Notes Value 
    if(name==="notes"){
      console.log(`notes: `, value)
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

  useEffect(() => {
    storageItem && setCurrentQuestion(currentQuestion - 1);
    if (storageItem) {
      const tempStorage = storageItem && storageItem.questions[currentQuestion - 1];
      let cloneItem = { ...item };
      cloneItem.question = tempStorage.question;
      cloneItem.answer = tempStorage.answer;
      cloneItem.opt1 = tempStorage.options[0];
      cloneItem.opt2 = tempStorage.options[1];
      cloneItem.opt3 = tempStorage.options[2];
      cloneItem.opt4 = tempStorage.options[3];
      cloneItem.subjectName = storageItem.subjectName;
      setItem(cloneItem);
    } else {
      setItem(initialState);
    }
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (storageItem.subjectName) {
      let tempRecord = { ...item };
      item.errors.subjectName = "";
      setItem(tempRecord);
    }
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
    currentQuestion === 0 &&
      validData(item.subjectName, "subjectName", "Please Choose Subject");
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
      let structureItem = {
        subjectName: "",
        questions: [],
      };
      if (storageItem) {
        let tempData = storageItem;
        tempData.questions.push(data);
        localStorage.setItem("examPaper", JSON.stringify(tempData));
      } else {
        structureItem.subjectName = item.subjectName;
        structureItem.questions.push(data);
        localStorage.setItem("examPaper", JSON.stringify(structureItem));
      }
      setItem(initialState);
      const storageResult = JSON.parse(localStorage.getItem("examPaper"));
      setCurrentQuestion(storageResult.questions.length);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick(e);
    localStorage.removeItem("examPaper");
    window.location.reload();
    console.log(storageItem);
    alert("Quiz Successfully Submit");
  };

  const handlePage = (page) => {
    let tempData = storageItem.questions[page];
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
    if (validateFormNext(item.errors)) {
      let page = currentQuestion - 1;
      handlePage(page);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (storageItem.questions.length - currentQuestion === 1) {
      setCurrentQuestion(currentQuestion + 1);
      setItem(initialState);
    } else {
      if (validateFormNext(item.errors)) {
        let page = currentQuestion + 1;
        handlePage(page);
      }
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (validateFormNext(item.errors)) {
      if (confirm("Are you sure you want to Update Question")) {
        const optionAry = [];
        optionAry.push(item.opt1, item.opt2, item.opt3, item.opt4);
        const data = {};
        data.question = item.question;
        data.answer = item.answer;
        data.options = optionAry;
        const tempData = storageItem;
        tempData.subjectName = item.subjectName;
        tempData.questions[currentQuestion] = data;
        localStorage.setItem("examPaper", JSON.stringify(tempData));
      } else {
        let cloneItem = { ...item };
        const tempVar = storageItem.questions[currentQuestion];
        cloneItem.question = storageItem.questions[currentQuestion].question;
        cloneItem.opt1 = tempVar.options[0];
        cloneItem.opt2 = tempVar.options[1];
        cloneItem.opt3 = tempVar.options[2];
        cloneItem.opt4 = tempVar.options[3];
        cloneItem.answer = tempVar.answer;
        setItem(cloneItem);
      }
    }
  };

  return (
    <div>
      <h1>Create Exam Module</h1>
      <form>
        <OptionField
          values={subjectAry}
          data={storageItem && storageItem.subjectName}
          name="subjectName"
          onChange={handleChange}
          disable={currentQuestion !== 0 ? true : false}
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
        {storageItem && storageItem.questions.length === 14 && <textarea placeholder="Enter Notes" name="notes" rows="3" cols="35" onChange={handleChange}></textarea> }
        {storageItem && storageItem.questions.length === 14 ? (
          <ButtonField type="submit" value="Submit" onClick={handleSubmit} />
        ) : storageItem && storageItem.questions.length !== currentQuestion ? (
          <ButtonField value="Update" onClick={handleUpdate} />
        ) : (
          <ButtonField value="Add" onClick={handleClick} />
        )}
        &nbsp;&nbsp;
        {storageItem && storageItem.questions.length > currentQuestion ? (
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


// Today Task 
// 1] Common Logics Resuse Makes a function 
// 2] last question Not Text Area Field Come and push it data in to array.