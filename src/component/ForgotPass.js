import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotAry } from "../shared/FormAry";
import FormWithTitle from "../shared/FormWithTitle";
import { alertMsg, validateForm } from "../shared/OtherReuse";
import { reuseApi } from "../shared/ReuseApi";
import { handleCase } from "../shared/ValidCase";

const initialState = {
  email: "",
  errors: {
    email: " ",
  },
};
function ForgotPass() {
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
    if (validateForm(item.errors)) {
      let payLoad = {
        email: item.email,
      };
      const response = await reuseApi("post", "users/ForgotPassword", payLoad);
      alert(response?.data?.message);
      if (response?.data?.statusCode === 200) {
        setItem({ ...initialState });
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
