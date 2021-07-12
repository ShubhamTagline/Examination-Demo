import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signupAry } from "../shared/FormAry";
import FormWithTitle from "../shared/FormWithTitle";
import { alertMsg, validateForm } from "../shared/OtherReuse";
import { reuseApi } from "../shared/ReuseApi";
import { handleCase } from "../shared/ValidCase";

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
function SignUp() {
  const [item, setItem] = useState({ ...initialState });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    let cloneItem = { ...item };
    let data = handleCase(name, value);
    cloneItem.errors[name] = (data && data) || "";

    setItem({
      ...item,
      [name]: value,
      errors: cloneItem.errors,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let payload = {
      name: item.name,
      email: item.email,
      password: item.password,
      role: item.role,
    };
    if (validateForm(item.errors)) {
      const response = await reuseApi("post", "users/SignUp", payload);
      alert(response?.data?.message);
      if (response?.data?.statusCode === 200) {
        setItem({ ...initialState });
        e.target.reset();
      }
    } else {
      alertMsg();
    }
  };

  return (
    <>
      <FormWithTitle
        title="SignUp"
        item={item}
        handleSubmit={handleClick}
        list={signupAry}
        handleChange={handleChange}
        errors={item.errors}
      />
      <br />
      <Link to="/signIn"> Already have an Account ? Log In</Link>
    </>
  );
}

export default SignUp;
