/* eslint-disable */
import React, { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router";
import { ButtonField, localGet, showLoader } from "../../reusable/OtherReuse";
import { reuseApi } from "../../reusable/ReuseApi";

function ShowExam() {
  let history = useHistory();
  const [item, setItem] = useState();
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const examData = async () => {
      const response = await reuseApi("get", "student/studentExam", null, {
        "access-token": localGet("token"),
      });
      if (response.data.statusCode === 200) {
        setLoader(false);
        setItem(response.data.data);
      }
    };
    examData();
  }, []);

  return (
    <div className="container">
      <h1>Exam Details</h1>
      {loader && showLoader()}

      {item && (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>SubjectName</th>
              <th>Email</th>
              <th>Notes</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {item.map((val, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{val.subjectName}</td>
                <td>{val.email}</td>
                <td>
                  {val.notes.map((val, index) => (
                    <React.Fragment key={index}>
                      {val}
                      <br />
                    </React.Fragment>
                  ))}
                </td>
                <td>
                  {val.Result.length === 0 ? (
                    <ButtonField
                      variant="success"
                      value="Give Exam"
                      onClick={() => history.push(`/giveExam?id=${val._id}`)}
                    ></ButtonField>
                  ) : (
                    val.Result.map((val, index) => (
                      <React.Fragment key={index}>
                        {`Rank:${val.rank} || Score:${val.score}`}
                      </React.Fragment>
                    ))
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default ShowExam;
