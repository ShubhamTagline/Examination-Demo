import React from "react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { newPassAry } from "../shared/FormAry";
import FormWithTitle from "../shared/FormWithTitle";
import { alertMsg, validateForm } from "../shared/OtherReuse";
import { reuseApi } from "../shared/ReuseApi";
import { handleCase } from "../shared/ValidCase";

const initialState = {
  password: "",
  ConfirmPassword: "",
  errors: {
    password: " ",
    ConfirmPassword: " ",
  },
};
function NewPassword() {
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

  const search = useLocation().search;
  let history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (validateForm(item.errors)) {
      const token = new URLSearchParams(search).get("token");
      let payLoad = {
        Password: item.password,
        ConfirmPassword: item.ConfirmPassword,
      };
      const response = await reuseApi(
        "post",
        `users/ForgotPassword/Verify?token=${token}`,
        payLoad
      );
      alert(response?.data?.message);
      if (response?.data?.statusCode === 200) {
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
