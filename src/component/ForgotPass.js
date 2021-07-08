import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotAry } from "../shared/FormAry";
import FormWithTitle from "../shared/FormWithTitle";
 import { alertMsg, validateForm, validEmail } from "../shared/OtherReuse";
import { reuseApi } from "../shared/ReuseApi";
 
function ForgotPass() {
  const initialState = {
    email: "",
    errors: {
      email: " ",
    },
  };
  const [item, setItem] = useState(initialState);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let errors = item.errors;

    switch (name) {
      case "email":
        errors && (errors.email = validEmail(value));
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

  const handleClick = async (e) => {
    e.preventDefault();
    if (validateForm(item.errors)) {
      delete item.errors;
      const response = await reuseApi("post", "users/ForgotPassword", item);
      alert(response.data.message);
      if (response.data.statusCode === 200) {
        setItem(initialState);
      }
    } else {
      alertMsg();
    }
  };

  return (
    <>
      <FormWithTitle
        title="Forgot Password"
        item={item}
        handleSubmit={handleClick}
        list={forgotAry}
        handleChange={handleChange}
        errors={item.errors}
      />
      <br />
      <Link to="/signIn">Back to Login?</Link>
    </>
  );
}

export default ForgotPass;
