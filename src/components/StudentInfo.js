import React from "react";
import { Route } from "react-router-dom";
import NoMatchPage from "./NoMatchPage";
import Chart from "./Chart";
import RatingToggle from "./RatingToggle";

function StudentInfo(props) {
  const studentIndex = props.students.indexOf(props.match.params.studentName);

  let studentBio;
  if (studentIndex === -1) {
    studentBio = {};
  } else {
    studentBio = {
      firstname: props.students[studentIndex],
      lastname: props.bioData[studentIndex].name.last,
      age: props.bioData[studentIndex].dob.age,
      phone: props.bioData[studentIndex].phone,
      email: `${props.students[studentIndex].toLowerCase()}.${props.bioData[
        studentIndex
      ].name.last
        .replace(/\s+/g, "") // no spaces
        .toLowerCase()}@example.com`,
      photo: props.bioData[studentIndex].picture.large,
    };
  }

  const chart = !props.parsed ? (
    ""
  ) : (
    <Chart
      data={props.data}
      assignments={props.assignments}
      selectedStudents={[studentBio.firstname]}
      ratingToggle={props.ratingToggle}
    />
  );

  const renderBio = !props.students.includes(props.match.params.studentName) ? (
    <Route component={NoMatchPage} />
  ) : (
    <div className="student-info">
      <h1>
        {studentBio.firstname} {studentBio.lastname}
      </h1>
      <b>age</b> {studentBio.age}
      <br />
      <b>phone</b> {studentBio.phone}
      <br />
      <b>email</b> {studentBio.email}
      <br />
      <br /> <img src={studentBio.photo} alt={studentBio.firstname} />
      <br />
      <hr />
      <RatingToggle handleToggleChange={props.handleToggleChange} /> <hr />
      {chart}
    </div>
  );

  return <>{renderBio}</>;
}

export default StudentInfo;
