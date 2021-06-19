import React from "react";
import Chart from "./Chart";
import RatingToggle from "./RatingToggle";
import InputSelect from "./InputSelect";

const Home = (props) => {
  const chart = !props.parsed ? (
    ""
  ) : (
    <Chart
      data={props.data}
      assignments={props.assignments}
      selectedStudents={props.selectedStudents}
      ratingToggle={props.ratingToggle}
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
      <h1> The Overview</h1>
      <div>
        Keeping track of <b>{numberOfStudents}</b> students.
        <br /> They have given their ratings on how much they enjoyed each
        assignment and how difficult they found them to be.
        <br /> <b>{numberOfAssignments}</b> assignments have been rated.
        <br /> The chart below shows two bars for each assignment, the
        left/darker one shows the difficulty encountered, the right/lighter one
        the enjoyment had.
        <br /> Each bar represents the average of all the selected students
        displayed below.
        <br /> When only one student is selected it shows their specific ratings
        as you would see in their personal page, reachable by selecting them by
        their indivdual name above.
        <br /> The horizontal step-lines always show the average rating of all
        students combined for reference, using the same colors as the bars.
        <br /> The Chart can be zoomed with the scrollwheel and panned
        horizontally through dragging with the mouse (when zoomed in)
        <br />
        <br /> If, like some, you prefer to see the data as a (spreadsheet-like)
        Table you can find a link to such an overview through the link marked
        Table above.
      </div>
      <br />
      <hr />
      <RatingToggle handleToggleChange={props.handleToggleChange} /> <hr />
      {chart}
      <hr />
      {selectChartBar}
    </div>
  );
};

export default Home;
