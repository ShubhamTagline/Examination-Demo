import React from "react";
import { Link } from "react-router-dom";
import Title from "../../shared/Title";

const data = [
  {
    to: "/showExam",
    title: "View Exam",
  },
  {
    to: "/studentProfile",
    title: "Student Profile",
  },
  {
    to: "/resetPassword",
    title: "Change Password",
  },
];
function StudentAdmin() {
  return (
    <>
      <Title title="Student Admin" />
      {data.map((val,index)=>(
      <Link key={index} to={val.to} className="m-3">
        {val.title}
      </Link>
      ))}
    </>
  );
}

export default StudentAdmin;
