import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTooltip,
  VictoryGroup,
  VictoryLabel,
  VictoryLine,
  VictoryZoomContainer,
} from "victory";

function Chart(props) {
  let selectedData = [];
  if (props.selectedStudents === undefined) {
    selectedData = props.data;
  } else {
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
      return 0; // return 0 if there is no input, == for type coercion
    } else {
      return +(
        numbers.reduce((total, n) => total + n) / numbers.length
      ).toFixed(2);
    }
  };

  const allXRatings = function (input, toSortOn, type) {
    return input
      .filter((item) => item.assignment === toSortOn)
      .map((item) => item[type]);
  };

  let chartBarData = [];
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

  let chartNulData = [];
  chartNulData = props.assignments.map((assignment) => ({
    assignment: assignment,
    difficultyRating: 0,
    enjoymentRating: 0,
  }));

  let difficultyBarData = props.ratingToggle.difficulty
    ? chartBarData
    : chartNulData;
  let enjoymentBarData = props.ratingToggle.enjoyment
    ? chartBarData
    : chartNulData;
  let difficultyLineData = props.ratingToggle.difficulty
    ? chartAvgData
    : chartNulData;
  let enjoymentLineData = props.ratingToggle.enjoyment
    ? chartAvgData
    : chartNulData;

  return (
    <VictoryChart
      width={900}
      height={250}
      domainPadding={20}
      maxDomain={{ y: 5 }}
      padding={{ top: 10, bottom: 115, right: 40, left: 40 }}
      containerComponent={
        <VictoryZoomContainer zoomDimension="x" minimumZoom={{ x: 6 }} />
      }
    >
      <VictoryGroup offset={4}>
        <VictoryBar
          labelComponent={
            <VictoryTooltip pointerWidth={0} style={{ fill: "#282c34" }} />
          }
          events={[
            {
              target: "data",
              eventHandlers: {
                onMouseOver: () => {
                  return [
                    {
                      target: "data",
                      mutation: () => ({
                        style: { fill: "#90a6d1", width: 5 },
                      }),
                    },
                    {
                      target: "labels",
                      mutation: () => ({ active: true }),
                    },
                  ];
                },
                onMouseOut: () => {
                  return [
                    {
                      target: "data",
                      mutation: () => {},
                    },
                    {
                      target: "labels",
                      mutation: () => ({ active: false }),
                    },
                  ];
                },
              },
            },
          ]}
          labels={chartBarData.map((item) => item.difficultyRating)}
          data={difficultyBarData}
          x="assignment"
          y="difficultyRating"
          color={"#282c34"}
          tickFormat={chartBarData.map((item) => item.assignment)}
        />
        <VictoryBar
          labelComponent={
            <VictoryTooltip pointerWidth={0} style={{ fill: "#6d7d9c" }} />
          }
          events={[
            {
              target: "data",
              eventHandlers: {
                onMouseOver: () => {
                  return [
                    {
                      target: "data",
                      mutation: () => ({
                        style: { fill: "#a1b9e9", width: 5 },
                      }),
                    },
                    {
                      target: "labels",
                      mutation: () => ({ active: true }),
                    },
                  ];
                },
                onMouseOut: () => {
                  return [
                    {
                      target: "data",
                      mutation: () => {},
                    },
                    {
                      target: "labels",
                      mutation: () => ({ active: false }),
                    },
                  ];
                },
              },
            },
          ]}
          labels={chartBarData.map((item) => item.enjoymentRating)}
          data={enjoymentBarData}
          x="assignment"
          y="enjoymentRating"
          color={"#6d7d9c"}
          tickFormat={chartBarData.map((item) => item.assignment)}
        />
      </VictoryGroup>
      <VictoryGroup offset={4}>
        <VictoryLine
          style={{
            data: { strokeWidth: "1" },
            parent: { border: "1px solid #ccc" },
          }}
          interpolation="step"
          data={difficultyLineData}
          x="assignment"
          y="difficultyRating"
          color={"#282c34"}
          tickFormat={chartAvgData.map((item) => item.assignment)}
        />
        <VictoryLine
          style={{
            data: { strokeWidth: "1" },
            parent: { border: "1px solid #ccc" },
          }}
          interpolation="step"
          data={enjoymentLineData}
          x="assignment"
          y="enjoymentRating"
          color={"#6d7d9c"}
          tickFormat={chartAvgData.map((item) => item.assignment)}
        />
      </VictoryGroup>
      <VictoryAxis
        tickLabelComponent={<VictoryLabel angle={60} textAnchor="start" />}
        style={{
          tickLabels: { fontSize: 8, padding: 1 },
          labels: { fontSize: 8, padding: 1 },
        }}
        tickFormat={chartAvgData.map((item) => item.assignment)}
      />
      <VictoryAxis
        dependentAxis
        tickValues={[1, 2, 3, 4, 5]}
        style={{
          tickLabels: { fontSize: 10, padding: 1 },
        }}
      />
    </VictoryChart>
  );
}
export default Chart;
