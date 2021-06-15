import React from 'react'
import { Link } from 'react-router-dom';

function TeacherAdmin() {
  return (
    <div>
      <h1>Teacher Admin Module</h1>
      <Link to="/createExam" className="m-3">
        Create Exam
      </Link>
      <Link to="/showStudent" className="m-3">
        Show Student
      </Link>
      <Link to="/verifyStudent">Verify Student</Link>
      <Link to="/resetPassword" className="m-3">
        Change Password
      </Link>
    </div>
  );
}

export default TeacherAdmin
