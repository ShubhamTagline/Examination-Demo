/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router";
import { ButtonField, localGet } from "../../shared/OtherReuse";
import { reuseApi } from "../../shared/ReuseApi";
import Title from "../../shared/Title";
import Loader from "../../shared/Loader";

function ShowExam() {
  let history = useHistory();
  const [item, setItem] = useState();
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const examData = async () => {
      const response = await reuseApi("get", "student/studentExam", null, {
        "access-token": localGet("token"),
      });
      setLoader(false);
      if (response?.data?.statusCode === 200) {
        setItem(response.data?.data);
      }
    };
    examData();
  }, []);

  return (
    <>
      <Title title="Exam Detail"></Title>
      {loader && <Loader />}
      {item && (
        <Table striped bordered hover size="sm" className="container">
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
    </>
  );
}

export default ShowExam;
