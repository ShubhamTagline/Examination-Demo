import React from "react";
import { useState } from "react";
import { questionAry, subjectAry } from "../../contain/FormAry";
import InputFields from "../../reusable/InputFields";
import OptionField from "../../reusable/OptionField";
import { ButtonField } from "../../reusable/OtherReuse";

function CreateExam() {
  const initialState = {
    question: "",
    opt1: "",
    opt2: "",
    opt3: "",
    opt4: "",
    answer: "",
  };

  const [item, setItem] = useState(initialState);
  const [result, setResult] = useState({
    subjectName: "",
    questions: [],
  });

  const handleChange = (e, index, val) => {
    const name = e.target.name;
    const value = e.target.value;

    const radioAry = [1, 3, 5, 7];
    const mainIndex = index;

    radioAry.map((val, index) =>
      mainIndex === val ? (item.answer = item.opt1) : null
    );

    // if (index === 1) {
    //   item.answer = item.opt1;
    // } else if (index === 3) {
    //   item.answer = item.opt2;
    // } else if (index === 5) {
    //   item.answer = item.opt3;
    // } else if (index === 7) {
    //   item.answer = item.opt4;
    // }

    setItem({
      ...item,
      [name]: value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const optionAry = [];
    optionAry.push(item.opt1, item.opt2, item.opt3, item.opt4);

    const data = {};
    data.question = item.question;
    data.answer = item.answer;
    data.options = optionAry;
    const subject = item.subjectName;
    //problem -2 : i add multiple question that time 2 or third question insert time subjectName == undefined
    let cloneResult = { ...result };
    cloneResult.questions.push(data);
    cloneResult.subjectName = subject;
    setResult(cloneResult);
    //clear question
    setItem(initialState);
  };
  console.log(result);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("submit Btn");
  };
  return (
    <div>
      <h1>Create Exam Module</h1>
      <form onSubmit={handleSubmit}>
        <OptionField
          values={subjectAry}
          name="subjectName"
          onChange={handleChange}
        ></OptionField>
        <br />
        <br />
        <InputFields
          fields={questionAry}
          data={item}
          onChange={handleChange}
        ></InputFields>
        &nbsp;&nbsp;
        <ButtonField
          type="button"
          variant="primary"
          value="Add"
          onClick={handleClick}
        ></ButtonField>
        &nbsp;&nbsp;
        <ButtonField
          type="button"
          variant="primary"
          value="Previous"
          onClick={handleClick}
        ></ButtonField>
        &nbsp;&nbsp;
        <ButtonField
          type="button"
          variant="primary"
          value="Next"
          onClick={handleClick}
        ></ButtonField>
      </form>
    </div>
  );
}

export default CreateExam;
