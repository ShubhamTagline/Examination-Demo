import React, { useEffect } from "react";
import { useState } from "react";
import { questionAry, subjectAry } from "../../contain/FormAry";
import InputFields from "../../reusable/InputFields";
import OptionField from "../../reusable/OptionField";
import { ButtonField, localGet } from "../../reusable/OtherReuse";

function CreateExam() {
  const initialState = {
    question: "",
    opt1: "",
    opt2: "",
    opt3: "",
    opt4: "",
    answer: "",
    option: "",
  };

  const [item, setItem] = useState(initialState);

  const [result, setResult] = useState({
    subjectName: "",
    questions: [],
  });

  // const [checked, setChecked] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleChange = (e, index, val) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "subjectName") {
      result.subjectName = value;
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

    setItem({
      ...item,
      [name]: value,
    });
  };

  const [examData, setExamData] = useState(); // stored localStorage Data for previous and next purpose
  useEffect(() => {
    const localData = JSON.parse(localGet("examPaper"));
    if (localData !== null) {
      setExamData(localData);
    }
  }, []);


  console.log(examData);

  const handleClick = (e) => {
    e.preventDefault();
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
    const localData = JSON.parse(localGet("examPaper"));
    if (localData !== null) {
      setExamData(localData);
    }
    setCurrentQuestion(result.questions.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick(e);
    window.location.reload();
    console.log(result);
    alert("Quiz Successfully Submit");
  };

  const handleNext = (e) => {
    e.preventDefault();

    const data = JSON.parse(localGet("examPaper"));
    console.log(data);

    const page = currentQuestion + 1;
    let dummy = result.questions[page];
    setCurrentQuestion(page);

    let cloneItem = { ...item };
    cloneItem.question = dummy.question;
    cloneItem.answer = dummy.answer;
    cloneItem.opt1 = dummy.options[0];
    cloneItem.opt2 = dummy.options[1];
    cloneItem.opt3 = dummy.options[2];
    cloneItem.opt4 = dummy.options[3];
    setItem(cloneItem);
  };

  const handlePrevious = (e) => {
    e.preventDefault();

    const data = JSON.parse(localGet("examPaper"));
    console.log(data);

    const page = currentQuestion - 1;
    let dummy = result.questions[page];
    setCurrentQuestion(page);

    let cloneItem = { ...item };
    cloneItem.question = dummy.question;
    cloneItem.answer = dummy.answer;
    cloneItem.opt1 = dummy.options[0];
    cloneItem.opt2 = dummy.options[1];
    cloneItem.opt3 = dummy.options[2];
    cloneItem.opt4 = dummy.options[3];
    setItem(cloneItem);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setItem(initialState);
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
        ></OptionField>
        <br />
        <p>{currentQuestion}/15</p>
        <InputFields
          fields={questionAry}
          data={item}
          onChange={handleChange}
          // check={checked}
          submitDisable={true}
        ></InputFields>
        {result.questions.length >= 14 ? (
          <ButtonField type="submit" value="Submit" onClick={handleSubmit} />
        ) : (
          <ButtonField value="Add" onClick={handleClick} />
        )}
        &nbsp;&nbsp;
        {result.questions.length === currentQuestion + 1 ? ( //14 perfect work
          <ButtonField value="Next" disable={true} cursorPoint={true} />
        ) : (
          <ButtonField value="Next" onClick={handleNext} />
        )}
        &nbsp;&nbsp;
        {currentQuestion === 0 ? (
          <ButtonField value="Previous" disable={true} cursorPoint={true} />
        ) : (
          <ButtonField value="Previous" onClick={handlePrevious} />
        )}
        &nbsp;&nbsp;
        <ButtonField value="Reset" onClick={handleReset} />
      </form>
    </div>
  );
}

export default CreateExam;
