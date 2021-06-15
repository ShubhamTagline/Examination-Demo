import React from "react";
import { useState } from "react";
import { questionAry, subjectAry } from "../../contain/FormAry";
import InputFields from "../../reusable/InputFields";
import OptionField from "../../reusable/OptionField";
import { ButtonField } from "../../reusable/OtherReuse";

function CreateExam() {
  const initialState = {
    subjectName: "",
    questions: [
      {
        question: "",
        answer: "",
        options: ["opt1", "opt2", "opt3", "opt4"],
      },
    ],
  };

  const [item, setItem] = useState(initialState);
  const [data,setData]=useState() //we take a data

  const handleChange = (e, index) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(index);

    let cloneItem = { ...item };
    if (index === 0) {
      cloneItem.questions[0].question = value;
      setItem(cloneItem);
    }

    //solve this Problem ???
    if (index === 1) {
      item.questions[0].answer = item.opt1;
    } else if (index === 3) {
      item.answer = item.opt2;
    } else if (index === 5) {
      item.answer = item.opt3;
    } else if (index === 7) {
      item.answer = item.opt4;
    }

    // if (index === 1) {
    //   cloneItem.questions[0].answer = item.opt1;
    // } else if (index === 3) {
    //   cloneItem.questions[0].answer = item.opt2;
    // } else if (index === 5) {
    //   cloneItem.questions[0].answer = item.opt3;
    // } else if (index === 7) {
    //   cloneItem.questions[0].answer = item.opt4;
    // }
    if (name === "subjectName") {
      setItem({ ...item, subjectName: value });
    }
    // setItem({
    //   ...item,
    //    : value,
    // });
  };

  const handleClick = () => {
    console.log(item);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(item);
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
          data={item.questions[0].answer}
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
