import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { resetPassAry } from "../shared/FormAry";
import FormWithTitle from "../shared/FormWithTitle";
 import {
  alertMsg,
  validateForm,
  validPassword,
  localGet,
} from "../shared/OtherReuse";
import { reuseApi } from "../shared/ReuseApi";
 
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
      <FormWithTitle
        title="Reset Password"
        item={item}
        handleSubmit={handleSubmit}
        list={resetPassAry}
        handleChange={handleChange}
        errors={item.errors}
      />
      <br />
      <Link
        to={localGet("role") === "student" ? "/studentAdmin" : "/teacherAdmin"}
      >
        Back to Home?
      </Link>
    </>
  );
}

export default ResetPass;
