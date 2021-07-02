import React from "react";
import { Link } from "react-router-dom";

function StudentAdmin() {
  return (
    <div className="App">
      <h1>Student Admin Module</h1>
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
