/* eslint-disable */
import React, { useEffect } from "react";
import { useState } from "react";
import { questionAry, subjectAry } from "../../shared/FormAry";
import InputFields from "../../shared/InputFields";
import OptionField from "../../shared/OptionField";
import {
  ButtonField,
  localGet,
  localSet,
  validateForm,
  validateFormNext,
} from "../../shared/OtherReuse";
import { reuseApi } from "../../shared/ReuseApi";
import Title from "../../shared/Title";
import { handleCase } from "../../shared/ValidCase";

function CreateExam() {
  const initialError = {
    subjectName: " ",
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
    subjectName: "",
    errors: initialError,
  };

  const storageItem = JSON.parse(localGet("examPaper"));
  const [item, setItem] = useState(initialState);
  const [note, setNote] = useState({ note: [""], errors: " " });
  const [currentQuestion, setCurrentQuestion] = useState(
    (storageItem && storageItem.questions.length) || 0
  );

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

  const showItemStructure = (value, subjectName) => {
    let cloneItem = { ...item };
    cloneItem.question = value.question;
    cloneItem.opt1 = value.options[0];
    cloneItem.opt2 = value.options[1];
    cloneItem.opt3 = value.options[2];
    cloneItem.opt4 = value.options[3];
    cloneItem.answer = value.answer;
    subjectName && (cloneItem.subjectName = subjectName);
    cloneItem.errors = initialError;
    setItem(cloneItem);
  };

  const itemStructure = () => {
    const optionAry = [];
    optionAry.push(item.opt1, item.opt2, item.opt3, item.opt4);
    const data = {};
    data.question = item.question;
    data.answer = item.answer;
    data.options = optionAry;
    return data;
  };

  useEffect(() => {
    storageItem && setCurrentQuestion(currentQuestion - 1);
    if (storageItem) {
      const tempStorage = storageItem.questions[currentQuestion - 1];
      showItemStructure(tempStorage, storageItem.subjectName);
    } else {
      setItem(initialState);
    }
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (storageItem && storageItem?.subjectName) {
      let tempRecord = { ...item };
      tempRecord.subjectName = storageItem.subjectName;
      tempRecord.errors.subjectName = "";
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
      const data = itemStructure();
      if (storageItem) {
        let tempData = { ...storageItem };
        tempData.questions.push(data);
        {
          currentQuestion === 14 && (tempData.notes = note.note);
        }
        localSet("examPaper", JSON.stringify(tempData));
      } else {
        let structureItem = {};
        structureItem.subjectName = item.subjectName;
        structureItem.questions = [];
        structureItem.questions.push(data);
        localSet("examPaper", JSON.stringify(structureItem));
      }
      currentQuestion !== 14 && setItem(initialState);
      const storageResult = JSON.parse(localStorage.getItem("examPaper"));
      setCurrentQuestion(storageResult.questions.length);
    }
  };

  const commonUpdate = () => {
    const tempUpdate = Object.values(item.errors).some((val) => val === "");
    if (tempUpdate && validateFormNext(item.errors)) {
      if (confirm("Are you sure you want to Update Question")) {
        const data = itemStructure();
        const tempData = { ...storageItem };
        currentQuestion === 0 && (tempData.subjectName = item.subjectName);
        tempData.questions[currentQuestion] = data;
        localStorage.setItem("examPaper", JSON.stringify(tempData));
        let cloneItem = { ...item };
        cloneItem.errors = initialError;
        setItem(cloneItem);
      } else {
        const tempVar = storageItem.questions[currentQuestion];
        showItemStructure(tempVar);
      }
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    commonUpdate();
  };

  const handlePage = (page) => {
    setCurrentQuestion(page);
    let tempData = storageItem.questions[page];
    showItemStructure(tempData);
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    if (validateFormNext(item.errors)) {
      commonUpdate();
      let page = currentQuestion - 1;
      handlePage(page);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateFormNext(item.errors)) {
      commonUpdate();
      if (storageItem.questions.length - currentQuestion === 1) {
        setCurrentQuestion(currentQuestion + 1);
        setItem(initialState);
      } else {
        let page = currentQuestion + 1;
        handlePage(page);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFormNext(item.errors)) {
      const data = storageItem;
      storageItem.questions.length === 14 && handleClick(e);
      const response = await reuseApi("post", "dashboard/Teachers/Exam", data, {
        "access-token": localGet("token"),
      });
      window.location.reload();
      alert(response.data.message);
      if (response.data.statusCode === 200) {
        localStorage.removeItem("examPaper");
      }
    }
  };

  const handleNotes = (e, index) => {
    const cloneNote = { ...note };
    if (e.target.value.length > 0) {
      cloneNote.errors = "";
    }
    cloneNote.note[index] = e.target.value;
    setNote(cloneNote);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const cloneNote = { ...note };
    if (note.errors === "") {
      cloneNote.note.push(" ");
      cloneNote.errors = " ";
    } else {
      cloneNote.errors = "Please Fill First";
    }
    setNote(cloneNote);
  };

  const handleDelete = (e, index) => {
    e.preventDefault();
    const cloneNote = { ...note };
    cloneNote.note.length > 0 && cloneNote.note.splice(index, 1);
    cloneNote.errors = " ";
    setNote(cloneNote);
  };

  return (
    <>
      <Title title="Create Exam " />
      <form>
        <OptionField
          values={subjectAry}
          data={storageItem && storageItem.subjectName}
          name="subjectName"
          onChange={handleChange}
          disable={currentQuestion !== 0 ? true : false}
          errors={item.errors.subjectName}
        ></OptionField>
        <p>{currentQuestion >= 15 ? 15 : currentQuestion + 1}/15</p>
        <InputFields
          fields={questionAry}
          data={item}
          onChange={handleChange}
          submitDisable={true}
          errors={item.errors}
        ></InputFields>
        {currentQuestion === 14 ? (
          <>
            {note.note.map((val, index) => {
              return (
                <React.Fragment key={index}>
                  <input
                    name="notes"
                    onChange={(e) => handleNotes(e, index)}
                    placeholder="Enter Exam Notes"
                    value={val}
                  ></input>
                  &nbsp;
                  <ButtonField value="+" onClick={handleAdd} />
                  &nbsp;
                  {note.note.length > 1 && (
                    <ButtonField
                      value="-"
                      onClick={(e) => handleDelete(e, index)}
                    />
                  )}
                  <br />
                </React.Fragment>
              );
            })}
            <div className="errorMsg mb-3">{note.errors}</div>
            <br />
            <ButtonField type="submit" value="Submit" onClick={handleSubmit} />
          </>
        ) : storageItem && storageItem.questions.length !== currentQuestion ? (
          <ButtonField value="Update" onClick={handleUpdate} />
        ) : (
          <ButtonField value="Add" onClick={handleClick} />
        )}
        &nbsp;&nbsp;
        {storageItem &&
        storageItem.questions.length > currentQuestion &&
        currentQuestion !== 14 ? (
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
    </>
  );
}
export default CreateExam;
