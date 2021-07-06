import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { resetPassAry } from "../contain/FormAry";
import InputFields from "../reusable/InputFields";
import {
  alertMsg,
  validateForm,
  validPassword,
  localGet,
} from "../reusable/OtherReuse";
import { reuseApi } from "../reusable/ReuseApi";
import Title from "../reusable/Title";

function ResetPass() {
  const initialState = {
    oldPassword: "",
    Password: "",
    ConfirmPassword: "",
    errors: {
      oldPassword: " ",
      Password: " ",
      ConfirmPassword: " ",
    },
  };

  const [item, setItem] = useState(initialState);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let errors = item.errors;

    switch (name) {
      case "oldPassword":
        errors && (errors.oldPassword = validPassword(value));
        break;
      case "Password":
        errors && (errors.Password = validPassword(value));
        break;
      case "ConfirmPassword":
        errors && (errors.ConfirmPassword = validPassword(value));
        break;
      default:
        break;
    }

    setItem({
      ...item,
      [name]: value,
      errors,
    });
  };

  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm(item.errors)) {
      delete item.errors;
      const response = await reuseApi("post", "users/ResetPassword", item, {
        "access-token": localGet("token"),
      });
      alert(response.data.message);
      if (response.data.statusCode === 200) {
        setItem(initialState);
        localGet("role") === "student"
          ? history.push("/studentAdmin")
          : history.push("/teacherAdmin");
      }
    } else {
      alertMsg();
    }
  };

  return (
    <>
      <Title title="Reset Password" /> <br />
      <form onSubmit={handleSubmit}>
        <InputFields
          fields={resetPassAry}
          onChange={handleChange}
          errors={item.errors}
          data={item}
        ></InputFields>
        <br />
        <br />
        <Link
          to={
            localGet("role") === "student" ? "/studentAdmin" : "/teacherAdmin"
          }
        >
          Back to Home?
        </Link>
      </form>
    </>
  );
}

export default ResetPass;
