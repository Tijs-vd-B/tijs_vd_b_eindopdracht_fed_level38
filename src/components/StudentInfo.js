import React from "react";
import { Route } from "react-router-dom";
import NoMatchPage from "./NoMatchPage";

function StudentInfo(props) {
  console.log(props);
  console.log(!props.items.includes(props.match.params.studentName));

  const studentBio = !props.items.includes(props.match.params.studentName) ? (
    <Route component={NoMatchPage} />
  ) : (
    `${props.match.params.studentName}`
  );
  //   <div>
  //     <h1>Category Component</h1>
  //     {props.match.params.studentName}
  //     <Route
  //       path={`${props.match.path}/:studentName`}
  //       render={(props) => <div>{props.match.params.studentName} category</div>}
  //     />
  //   </div>
  // );
  // return <></>;
  return <>{studentBio}</>;
}

export default StudentInfo;
