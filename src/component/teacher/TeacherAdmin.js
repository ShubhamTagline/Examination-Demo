import React from "react";
import { Link } from "react-router-dom";
import Title from "../../reusable/Title";

function TeacherAdmin() {
  return (
    <>
      <Title title="Teacher Admin" />
      <Link to="/createExam" className="m-3">
        Create Exam
      </Link>
      <Link to="/viewExam" className="m-3">
        View Exam
      </Link>
      <Link to="/showStudent" className="m-3">
        Show Student
      </Link>
      <Link to="/verifyStudent" className="m-3">
        Verify Student
      </Link>
      <Link to="/resetPassword" className="m-3">
        Change Password
      </Link>
    </>
  );
}

export default TeacherAdmin;
