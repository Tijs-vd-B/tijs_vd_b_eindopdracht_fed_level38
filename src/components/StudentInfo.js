import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import NoMatchPage from "./NoMatchPage";

function StudentInfo(props) {
  console.log(props);
  console.log(
    "is he in da list?",
    props.students.includes(props.match.params.studentName)
  );

  console.log(props.bioData);

  const studentIndex = props.students.indexOf(props.match.params.studentName);
  console.log(`this students index is: ${studentIndex}`);

  let studentBio = {
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

  const renderBio = !props.students.includes(props.match.params.studentName) ? (
    <Route component={NoMatchPage} />
  ) : (
    <div className="student-info">
      Studentname: {studentBio.firstname} {studentBio.lastname}
      <br />
      Age: {studentBio.age}
      <br />
      Phone: {studentBio.phone}
      <br />
      Email: {studentBio.email}
      <br /> <img src={studentBio.photo} alt={studentBio.firstname} />
    </div>
  );
  // let updateSelectedStudent = {
  //   value: props.students[studentIndex],
  //   label: props.students[studentIndex],
  // };
  // useEffect(() => {
  //   props.handleStudentSelect(studentBio.firstname);
  // }, []);

  return <>{renderBio}</>;
  // return <>renderBio</>;
}

export default StudentInfo;
