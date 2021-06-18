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
      return +(
        numbers.reduce((total, n) => total + n) / numbers.length
      ).toFixed(2);
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
  console.log(
    `in Charts this is the current selectedStudents: ${props.selectedStudents}`
  );
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

  // render() {
  return (
    <VictoryChart
      width={900}
      height={250}
      // adding the material theme provided with Victory
      // theme={VictoryTheme.material}
      // domainPadding will add space to each side of VictoryBar to
      // prevent it from overlapping the axis
      domainPadding={20}
      maxDomain={{ y: 5 }}
      padding={{ top: 5, bottom: 100, right: 40, left: 40 }}
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
                        style: { fill: "orange", width: 5 },
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
          // tickValues={[1, 2, 3, 4, 5]}
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
                      mutation: () => ({ style: { fill: "gold", width: 5 } }),
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
          interpolation="step"
          data={difficultyLineData}
          x="assignment"
          y="difficultyRating"
          color={"#282c34"}
          // tickValues={[1, 2, 3, 4, 5]}
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
        // tickValues={[1, 2, 3, 4, 5]}
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
  // }
}
export default Chart;
