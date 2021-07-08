import React from "react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { newPassAry } from "../shared/FormAry";
import FormWithTitle from "../shared/FormWithTitle";
import { alertMsg, validateForm, validPassword } from "../shared/OtherReuse";
import { reuseApi } from "../shared/ReuseApi";
 

function NewPassword() {
  const initialState = {
    Password: "",
    ConfirmPassword: "",
    errors: {
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

  const search = useLocation().search;
  let history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (validateForm(item.errors)) {
      const token = new URLSearchParams(search).get("token");
      delete item.errors;
      const response = await reuseApi(
        "post",
        `users/ForgotPassword/Verify?token=${token}`,
        item
      );
      alert(response.data.message);
      if (response.data.statusCode === 200) {
        history.push("/signIn");
      }
    } else {
      alertMsg();
    }
  };

  return (
    <FormWithTitle
      title="New Password"
      handleSubmit={handleClick}
      item={item}
      list={newPassAry}
      errors={item.errors}
      handleChange={handleChange}
    />
  );
}

export default NewPassword;
