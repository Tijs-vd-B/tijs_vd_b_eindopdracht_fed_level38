import React, { Component } from "react";
import "./App.css";
import Tabletop from "tabletop";
// import StudentData from "./components/StudentData";
import Chart from "./components/Chart";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loaded: false,
    };
  }

  componentDidMount() {
    this.setState({ loaded: false });
    Tabletop.init({
      key: "1fKX0b0-FMXqo6M0VfPIt7oBYUzgVbxtNXtN790i_mN8", // my-key
      // key: "1SwA98fnmzIFrSjbPDvzUw7JEqW1VE5YUJvchcEL0aUE", // my-key (no-publish test)
      // key: "1BHjq5MjpuSItvVbnQcEdQt_v956-Ks1lr3f_nEFkTks", // WinC-key
      simpleSheet: true,
      parseNumbers: true,
      callback: (googleData) => {
        let cleanData = [];
        googleData.forEach((element) => {
          const newItem = {
            student: element["Wie ben je?"],
            assignment:
              element["Welke opdracht of welk project lever je nu in?"],
            difficultyRating: element["Hoe moeilijk vond je deze opdracht?"],
            enjoymentRating: element["Hoe leuk vond je deze opdracht?"],
          };
          cleanData = [...cleanData].concat(newItem);
        });
        this.setState({
          ...this.state,
          data: cleanData,
          loaded: true,
        });
      },
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.loaded !== this.state.loaded) {
      const assignmentSet = new Set();
      this.state.data.forEach((i) => assignmentSet.add(i.assignment));
      console.log(assignmentSet);
      const studentSet = new Set();
      this.state.data.forEach((i) => studentSet.add(i.student));
      console.log(studentSet);
      this.setState({
        ...this.state,
        assignments: assignmentSet,
        students: studentSet,
      });
    }
  }

  render() {
    console.log("updated state --->", this.state);
    const text = !this.state.loaded
      ? "loading..."
      : `${this.state.data.length} records imported!`;
    const chart = !this.state.loaded ? "" : <Chart data={this.state.data} />;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Student Dashboard</h1>
          <h3>(be informed)</h3>
          {/* <StudentData /> */}
          {text}
        </header>
        {chart}
      </div>
    );
  }
}

export default App;
