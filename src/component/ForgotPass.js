import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotAry } from "../contain/FormAry";
import InputFields from "../reusable/InputFields";
import { alertMsg, validateForm, validEmail } from "../reusable/OtherReuse";
import { reuseApi } from "../reusable/ReuseApi";
import Title from "../reusable/Title";

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
      <Title title="Forgot Password"></Title> <br />
      <form onSubmit={handleClick}>
        <InputFields
          fields={forgotAry}
          onChange={handleChange}
          errors={item.errors}
          data={item}
        ></InputFields>
      </form> 
      <br />
      <Link to="/signIn">Back to Login?</Link>
    </>
  );
}

export default ForgotPass;
