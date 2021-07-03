import React, { useEffect } from "react";
import { useState } from "react";
import { profileAry } from "../../contain/FormAry";
import InputFields from "../../reusable/InputFields";
import { localGet, showLoader } from "../../reusable/OtherReuse";
import { reuseApi } from "../../reusable/ReuseApi";

function StudentProfile() {
  const [item, setItem] = useState();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const studentData = async () => {
      const response = await reuseApi("get", "student/getStudentDetail", null, {
        "access-token": localGet("token"),
      });
      if (response.status === 200) {
        setLoader(false);
        if (response.data.statusCode === 200) {
          setItem({
            name: response.data.data.name,
            emailProfile: response.data.data.email,
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
      const response = await reuseApi("put", "student/studentProfile", item, {
        "access-token": localGet("token"),
      });
      alert(response.data.message);
    }
  };

  return (
    <div>
      <h1>Student Profile</h1>
      {loader && showLoader()}
      {item && (
        <form onSubmit={handleSubmit}>
          <InputFields
            fields={profileAry}
            data={item}
            onChange={handleChange}
          />
        </form>
      )}
    </div>
  );
}

export default StudentProfile;
