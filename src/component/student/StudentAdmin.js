import React from "react";
import { Link } from "react-router-dom";
import Title from "../../shared/Title";

function StudentAdmin() {
  return (
    <div className="App">
      <Title title="Student Admin" />
      <Link to="/showExam" className="m-3">
        View Exam
      </Link>
      <Link to="/studentProfile" className="m-3">
        Student Profile
      </Link>
      <Link to="/resetPassword">Change Password</Link>
    </div>
  );
}

export default StudentAdmin;
