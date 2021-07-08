import React, { useEffect } from "react";
import { useState } from "react";
import { profileAry } from "../../shared/FormAry";
import { localGet } from "../../shared/OtherReuse";
import { reuseApi } from "../../shared/ReuseApi";
import FormWithTitle from "../../shared/FormWithTitle";

function StudentProfile() {
  const [item, setItem] = useState();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const studentData = async () => {
      const response = await reuseApi("get", "student/getStudentDetail", null, {
        "access-token": localGet("token"),
      });
      setLoader(false);
      if (response.data.statusCode === 200) {
        setItem({
          name: response.data.data.name,
          emailProfile: response.data.data.email,
        });
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
      const response = await reuseApi("put", "student/studentProfile", item, {
        "access-token": localGet("token"),
      });
      alert(response.data.message);
    }
  };

  return (
    <FormWithTitle
      title="Student Profile"
      loader={loader}
      item={item}
      handleSubmit={handleSubmit}
      list={profileAry}
      handleChange={handleChange}
    />
  );
}

export default StudentProfile;
