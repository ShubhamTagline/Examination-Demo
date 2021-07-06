import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signupAry } from "../contain/FormAry";
import InputFields from "../reusable/InputFields";
import {
  alertMsg,
  validateForm,
  validEmail,
  validName,
  validPassword,
  validRole,
} from "../reusable/OtherReuse";
import { reuseApi } from "../reusable/ReuseApi";
import Title from "../reusable/Title";

function SignUp() {
  const initialState = {
    name: "",
    email: "",
    password: "",
    role: "",
    errors: {
      name: " ",
      email: " ",
      password: " ",
      role: " ",
    },
  };

  const [item, setItem] = useState(initialState);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let errors = item.errors;

    switch (name) {
      case "name":
        errors && (errors.name = validName(value));
        break;
      case "email":
        errors && (errors.email = validEmail(value));
        break;
      case "password":
        errors && (errors.password = validPassword(value));
        break;
      case "role":
        errors && (errors.role = validRole(value));
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
      const response = await reuseApi("post", "users/SignUp", item);
      alert(response.data.message);
      if (response.data.statusCode === 200) {
        setItem(initialState);
        e.target.reset();
      }
    } else {
      alertMsg();
    }
  };

  return (
    <>
      <Title title="SignUp" /> <br />
      <form onSubmit={handleClick}>
        <InputFields
          fields={signupAry}
          onChange={handleChange}
          errors={item.errors}
          data={item}
        />
      </form>
      <br />
      <Link to="/signIn"> Already have an Account ? Log In</Link>
    </>
  );
}

export default SignUp;
