import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { resetPassAry } from "../shared/FormAry";
import FormWithTitle from "../shared/FormWithTitle";
import { alertMsg, validateForm, localGet } from "../shared/OtherReuse";
import { reuseApi } from "../shared/ReuseApi";
import { handleCase } from "../shared/ValidCase";

const initialState = {
  oldPassword: "",
  password: "",
  ConfirmPassword: "",
  errors: {
    oldPassword: " ",
    password: " ",
    ConfirmPassword: " ",
  },
};

function ResetPass() {
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

  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm(item.errors)) {
      let payLoad = {
        oldPassword: item.oldPassword,
        Password: item.password,
        ConfirmPassword: item.ConfirmPassword,
      };
      const response = await reuseApi("post", "users/ResetPassword", payLoad, {
        "access-token": localGet("token"),
      });
      alert(response?.data?.message);
      if (response?.data?.statusCode === 200) {
        setItem({ ...initialState });
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
