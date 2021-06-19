import React from "react";
import InputSelect from "../components/InputSelect";
import DataTable from "../components/DataTable";

const Home = (props) => {
  const table = !props.parsed ? (
    ""
  ) : (
    <DataTable
      data={props.data}
      assignments={props.assignments}
      selectedStudents={props.selectedStudents}
    />
  );

  const selectChartBar = !props.parsed ? (
    ""
  ) : (
    <InputSelect
      name="selectedStudents"
      items={props.students}
      placeholder="None"
      selected={props.selectedStudents}
      handleChartChange={props.handleChartChange}
    />
  );

  const numberOfStudents = !props.parsed ? "..." : props.students.length;

  const numberOfAssignments = !props.parsed ? "..." : props.assignments.length;

  return (
    <div className="home-container">
      {selectChartBar}
      <h1> The Table View</h1>
      <div>
        In this Table view we're still keeping track of{" "}
        <b>{numberOfStudents}</b> students.
        <br /> They have given their ratings on how much they enjoyed each
        assignment and how difficult they found them to be.
        <br /> The same <b>{numberOfAssignments}</b> assignments have been
        rated, it is basically the original data stored in a Google spreadsheet
        somewhere...
        <br />
        <br /> Due to the tremendous amount of requests for this type of
        overview we have opted to provide this here.
        <br /> No more going to the Google spreadsheet and looking at the data
        there in a way you could see here even better.
        <br /> Sorting is a feature you'd be hard pressed to find over there.
        <br /> And so is filtering on any student you'd want.
        <br />
        <br />
      </div>
      <br />

      {table}
    </div>
  );
};

export default Home;
