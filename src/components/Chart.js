import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryGroup,
  VictoryLabel,
  VictoryLine,
  // VicontainerComponent,
  VictoryZoomContainer,
  // VictoryStack,
} from "victory";

function Chart(props) {
  console.log("Chart's props: ", props);

  let selectedData = [];
  if (props.selectedStudents === undefined) {
    selectedData = props.data;
    console.log(selectedData);
  } else {
    console.log("apparently selectedStudents is NOT undefined");
    props.selectedStudents.forEach((name) => {
      props.data.filter((item) => {
        if (item.student === name) {
          selectedData = [...selectedData].concat(item);
        }
      });
    });
  }

  const calculateAverage = function (numbers) {
    if (numbers == "") {
      return 0; // return 0 if there is no input
    }
    // const average = numbers.reduce((total, n) => total + n) / numbers.length;
    else {
      return numbers.reduce((total, n) => total + n) / numbers.length;
    }
  };

  const allXRatings = function (input, toSortOn, type) {
    // console.log(`getting all ${type}-ratings for the assignment: ${toSortOn}`);
    // const toAverage = props.data
    //   .filter((item) => item.assignment === toSortOn)
    //   .map((item) => item[type]);
    // if (all === true) {
    //   return props.data
    //     .filter((item) => item.assignment === toSortOn)
    //     .map((item) => item[type]);
    // } else {
    return input
      .filter((item) => item.assignment === toSortOn)
      .map((item) => item[type]);
    // }
  };

  let chartBarData = [];
  console.log(props.selectedStudents);
  console.log(`does the filter work? selectedData = ${selectedData.length}`);
  chartBarData = props.assignments.map((assignment) => ({
    assignment: assignment,
    difficultyRating: calculateAverage(
      allXRatings(selectedData, assignment, "difficultyRating")
    ),
    enjoymentRating: calculateAverage(
      allXRatings(selectedData, assignment, "enjoymentRating")
    ),
  }));

  let chartAvgData = [];
  chartAvgData = props.assignments.map((assignment) => ({
    assignment: assignment,
    difficultyRating: calculateAverage(
      allXRatings(props.data, assignment, "difficultyRating")
    ),
    enjoymentRating: calculateAverage(
      allXRatings(props.data, assignment, "enjoymentRating")
    ),
  }));

  // render() {
  return (
    <VictoryChart
      width={900}
      height={250}
      // adding the material theme provided with Victory
      theme={VictoryTheme.grayscale}
      // domainPadding will add space to each side of VictoryBar to
      // prevent it from overlapping the axis
      domainPadding={10}
      padding={{ top: 5, bottom: 100, right: 40, left: 40 }}
      containerComponent={<VictoryZoomContainer zoomDimension="x" />}
    >
      <VictoryGroup offset={4}>
        <VictoryBar
          labelComponent={<VictoryTooltip pointerWidth={0} />}
          labels={chartBarData.map((item) => item.difficultyRating)}
          data={chartBarData}
          x="assignment"
          y="difficultyRating"
          // tickValues={[1, 2, 3, 4, 5]}
          tickFormat={chartBarData.map((item) => item.assignment)}
        />
        <VictoryBar
          labelComponent={
            <VictoryTooltip pointerWidth={0} style={{ fill: "tomato" }} />
          }
          labels={chartBarData.map((item) => item.enjoymentRating)}
          data={chartBarData}
          x="assignment"
          y="enjoymentRating"
          colorScale={"warm"}
          // tickValues={[1, 2, 3, 4, 5]}
          tickFormat={chartBarData.map((item) => item.assignment)}
        />
      </VictoryGroup>
      <VictoryGroup offset={4}>
        <VictoryLine
          style={{
            data: { strokeWidth: "1" },
            parent: { border: "1px solid #ccc" },
          }}
          data={chartAvgData}
          x="assignment"
          y="difficultyRating"
          // tickValues={[1, 2, 3, 4, 5]}
          tickFormat={chartAvgData.map((item) => item.assignment)}
        />
        <VictoryLine
          style={{
            data: { strokeWidth: "1" },
            parent: { border: "1px solid #ccc" },
          }}
          data={chartAvgData}
          x="assignment"
          y="enjoymentRating"
          colorScale={"warm"}
          // tickValues={[1, 2, 3, 4, 5]}
          tickFormat={chartAvgData.map((item) => item.assignment)}
        />
      </VictoryGroup>
      <VictoryAxis
        // tickValues specifies both the number of ticks and where
        // they are placed on the axis
        tickLabelComponent={<VictoryLabel angle={60} textAnchor="start" />}
        style={{
          tickLabels: { fontSize: 8, padding: 1 },
          labels: { fontSize: 8, padding: 1 },
        }}
        tickValues={[1, 2, 3, 4, 5]}
        tickFormat={chartBarData.map((item) => item.assignment)}
      />
      <VictoryAxis
        dependentAxis
        tickValues={[1, 2, 3, 4]}
        style={{
          tickLabels: { fontSize: 10, padding: 1 },
        }}
      />
    </VictoryChart>
  );
  // }
}
export default Chart;
