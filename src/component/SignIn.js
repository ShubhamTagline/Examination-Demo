import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signInAry } from "../contain/FormAry";
import InputFields from "../reusable/InputFields";
import {
  alertMsg,
  localSet,
  validateForm,
  validEmail,
  validPassword,
} from "../reusable/OtherReuse";
import { reuseApi } from "../reusable/ReuseApi";
import Title from "../reusable/Title";

function SignIn() {
  const initialState = {
    email: "",
    password: "",
    errors: {
      email: " ",
      password: " ",
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
      case "password":
        errors && (errors.password = validPassword(value));
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

  const handleClick = async (e) => {
    e.preventDefault();
    if (validateForm(item.errors)) {
      delete item.errors;
      const response = await reuseApi("post", "users/Login", item);
      const list = response.data?.data;
      alert(response.data.message);
      if (response.data.statusCode === 200) {
        localSet("token", list.token);
        localSet("role", list.role);
        setItem(initialState);
        if (list.role === "student") {
          history.push("/studentAdmin");
        } else {
          history.push("/teacherAdmin");
        }
      }
    } else {
      alertMsg();
    }
  };

  return (
    <>
      <Title title="SignIn"></Title>
      <br />
      <form onSubmit={handleClick}>
        <InputFields
          fields={signInAry}
          onChange={handleChange}
          errors={item.errors}
          data={item}
        ></InputFields>
      </form>
      <br />
      <Link to="/"> Don't have an Account ? Sign Up </Link> <br />
      <Link to="/forgot">Forgot Password?</Link>
    </>
  );
}

export default SignIn;
