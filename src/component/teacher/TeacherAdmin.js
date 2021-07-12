import React from "react";
import { Link } from "react-router-dom";
import Title from "../../shared/Title";

const data = [
  {
    to: "/createExam",
    title: "Create Exam",
  },
  {
    to: "/viewExam",
    title: "View Exam",
  },
  {
    to: "/showStudent",
    title: "Show Student",
  },
  {
    to: "/createExam",
    title: "Create Exam",
  },
  {
    to: "/verifyStudent",
    title: "Verify Student",
  },
  {
    to: "/resetPassword",
    title: "Change Password",
  },
];
function TeacherAdmin() {
  return (
    <>
      <Title title="Teacher Admin" />
      {data.map((val,index)=>(
      <Link key={index} to={val.to} className="m-3">
        {val.title}
      </Link>
      ))}
    </>
  );
}

export default TeacherAdmin;
