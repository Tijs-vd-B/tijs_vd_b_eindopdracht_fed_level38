import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryGroup,
  VictoryLabel,
  // VictoryStack,
} from "victory";

function Chart(props) {
  console.log("Chart's props: ", props);

  const calculateAverage = function (numbers) {
    // console.log(numbers);
    // const average = numbers.reduce((total, n) => total + n) / numbers.length;
    return numbers.reduce((total, n) => total + n) / numbers.length;
  };

  const allXRatings = function (toSortOn, type) {
    // console.log(`getting all ${type}-ratings for the assignment: ${toSortOn}`);
    // const toAverage = props.data
    //   .filter((item) => item.assignment === toSortOn)
    //   .map((item) => item[type]);
    // console.log(toAverage);
    return props.data
      .filter((item) => item.assignment === toSortOn)
      .map((item) => item[type]);
  };

  let chartData = [];
  chartData = props.assignments.map((assignment) => ({
    assignment: assignment,
    difficultyRating: calculateAverage(
      allXRatings(assignment, "difficultyRating")
    ),
    enjoymentRating: calculateAverage(
      allXRatings(assignment, "enjoymentRating")
    ),
  }));
  // console.log("chartData = ", chartData);

  // render() {
  return (
    <VictoryChart
      width={1000}
      height={250}
      // adding the material theme provided with Victory
      theme={VictoryTheme.material}
      // domainPadding will add space to each side of VictoryBar to
      // prevent it from overlapping the axis
      domainPadding={50}
      padding={{ top: 5, bottom: 80, right: 20, left: 20 }}
    >
      <VictoryGroup offset={2}>
        <VictoryBar
          labelComponent={<VictoryTooltip />}
          data={chartData}
          x="assignment"
          y="difficultyRating"
          tickValues={[1, 2, 3, 4, 5]}
          tickFormat={chartData.map((item) => item.assignment)}
        />
        <VictoryBar
          labelComponent={<VictoryTooltip />}
          data={chartData}
          x="assignment"
          y="enjoymentRating"
          tickValues={[1, 2, 3, 4, 5]}
          tickFormat={chartData.map((item) => item.assignment)}
        />
      </VictoryGroup>
      <VictoryAxis
        // tickValues specifies both the number of ticks and where
        // they are placed on the axis
        tickLabelComponent={<VictoryLabel angle={90} textAnchor="start" />}
        tickValues={[1, 2, 3, 4, 5]}
        tickFormat={chartData.map((item) => item.assignment)}
      />
      <VictoryAxis dependentAxis />
    </VictoryChart>
  );
  // }
}
export default Chart;
