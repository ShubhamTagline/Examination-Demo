import React, { useEffect } from "react";
import { useState } from "react";
import { profileAry } from "../../contain/FormAry";
import InputFields from "../../reusable/InputFields";
import { localGet } from "../../reusable/OtherReuse";
import { reuseApi } from "../../reusable/ReuseApi";

function StudentProfile() {
  const initialState = {
    name: "",
    emailProfile: "",
  };

  const [item, setItem] = useState(initialState);

  useEffect(() => {
    const studentData = async () => {
      const data = await reuseApi("get", "student/getStudentDetail", null, {
        "access-token": localGet("token"),
      });
      if (data.status === 200) {
        alert(data.data.message);
        if (data.data.statusCode === 200) {
          setItem({
            name: data.data.data.name,
            emailProfile: data.data.data.email,
          });
        }
      }
    };
    studentData();
  }, []);

  const handleChange = (e) => {
    setItem({
      ...item,
      name: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    delete item.emailProfile;
    if (item.name === "") {
      alert("Please Enter Your Name");
    } else {
      const data = await reuseApi("put", "student/studentProfile", item, {
        "access-token": localGet("token"),
      });
      if (data.status === 200) {
        alert(data.data.message);
      }
    }
  };

  return (
    <div>
      <h1>Student Profile</h1>
      <form onSubmit={handleSubmit}>
        <InputFields
          fields={profileAry}
          data={item}
          onChange={handleChange}
        ></InputFields>
      </form>
    </div>
  );
}

export default StudentProfile;
