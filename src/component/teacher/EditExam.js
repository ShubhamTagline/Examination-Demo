/* eslint-disable */
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router";
import { questionAry } from "../../contain/FormAry";
import InputFields from "../../reusable/InputFields";
import { ButtonField, localGet } from "../../reusable/OtherReuse";
import { reuseApi } from "../../reusable/ReuseApi";

function EditExam() {
  const search = useLocation().search;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [result, setResult] = useState();
  const [item, setItem] = useState({
    question: "",
    opt1: "",
    opt2: "",
    opt3: "",
    opt4: "",
    answer: "",
  });

  useEffect(() => {
    const examDetails = async () => {
      const id = new URLSearchParams(search).get("id");
      const response = await reuseApi(
        "get",
        `dashboard/Teachers/examDetail?id=${id}`,
        null,
        { "access-token": localGet("token") }
      );
      console.log(`response`, response.data.data);
       
      let cloneItem = { ...item };
      cloneItem.question =
        response.data.data.questions[currentQuestion].question;
      cloneItem.answer = response.data.data.questions[currentQuestion].answer;
      cloneItem.opt1 = response.data.data.questions[currentQuestion].options[0];
      cloneItem.opt2 = response.data.data.questions[currentQuestion].options[1];
      cloneItem.opt3 = response.data.data.questions[currentQuestion].options[2];
      cloneItem.opt4 = response.data.data.questions[currentQuestion].options[3];
      setItem(cloneItem);
      setResult(response.data.data.questions);
    };
    examDetails();
  }, []);

  console.log(`currentQuestion`, currentQuestion);

  const handleChange = (e) => {
    e.preventDefault();
    console.log(`e.target.name`, e.target.name, e.target.value);
  };

  const handlePage = (page) => {
    setCurrentQuestion(page);
    let cloneItem = { ...item };
    cloneItem.question = result[currentQuestion].question;
    cloneItem.answer = result[currentQuestion].answer;
    cloneItem.opt1 = result[currentQuestion].options[0];
    cloneItem.opt2 = result[currentQuestion].options[1];
    cloneItem.opt3 = result[currentQuestion].options[2];
    cloneItem.opt4 = result[currentQuestion].options[3];
    setItem(cloneItem);
  };

  const handleNext = (e) => {
    e.preventDefault();
    let page = currentQuestion + 1;
    handlePage(page);
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    const page = currentQuestion - 1;
    handlePage(page);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    alert("Edit");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submit");
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
          // errors={item.errors}
        ></InputFields>
        <ButtonField value="Edit" onClick={handleEdit} /> &nbsp;
        <ButtonField value="Next" onClick={handleNext} />
        &nbsp;
        <ButtonField value="Previous" onClick={handlePrevious} />
        &nbsp;
        <ButtonField value="Submit" onClick={handleSubmit} />
        &nbsp;
      </form>
    </div>
  );
}

export default EditExam;
