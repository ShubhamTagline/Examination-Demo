import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signInAry } from "../shared/FormAry";
import FormWithTitle from "../shared/FormWithTitle";
import { alertMsg, localSet, validateForm } from "../shared/OtherReuse";
import { reuseApi } from "../shared/ReuseApi";
import { handleCase } from "../shared/ValidCase";

const initialState = {
  email: "",
  password: "",
  errors: {
    email: " ",
    password: " ",
  },
};

function SignIn() {
  const [item, setItem] = useState({ ...initialState });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    let cloneItem = { ...item };
    let data = handleCase(name, value);
    cloneItem.errors[name] = (data && data) || "";

    setItem({
      ...item,
      [name]: value ? value.trim() && value.replace(/\s+/g, " ") : value,
      errors: cloneItem.errors,
    });
  };

  let history = useHistory();
  const handleClick = async (e) => {
    e.preventDefault();
    if (validateForm(item.errors)) {
      let payload = {
        email: item.email,
        password: item.password,
      };
      const response = await reuseApi("post", "users/Login", payload);
      const list = response?.data.data;
      response.data?.message && alert(response.data?.message);
      if (response?.data?.statusCode === 200) {
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
      <FormWithTitle
        title="SignIn"
        item={item}
        handleSubmit={handleClick}
        list={signInAry}
        handleChange={handleChange}
        errors={item.errors}
      />
      <br />
      <Link to="/"> Don't have an Account ? Sign Up </Link> <br />
      <Link to="/forgot">Forgot Password?</Link>
    </>
  );
}

export default SignIn;
