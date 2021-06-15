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
      parsed: false,
    };
  }

  componentDidMount() {
    // this.setState({ loaded: false });
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

  parseData() {
    const assignmentSet = new Set();
    this.state.data.forEach((i) => assignmentSet.add(i.assignment));
    console.log(assignmentSet);
    const studentSet = new Set();
    this.state.data.forEach((i) => studentSet.add(i.student));
    console.log(studentSet);
    this.setState({
      ...this.state,
      assignments: Array.from(assignmentSet),
      students: Array.from(studentSet).sort(),
      parsed: true,
    });
  }

  addSudentInfo() {
    const baseUrl = "https://randomuser.me/";
    const length = this.state.students.length;
    const fetchUrl = `${baseUrl}api/?results=${length}&inc=name,dob,phone,picture&noinfo`;
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ studentInfo: data.results });
        console.log(this.state.studentInfo);
      })
      .catch(console.log);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.loaded !== this.state.loaded) {
      this.parseData();
    }
    if (prevState.students !== this.state.students) {
      this.addSudentInfo();
    }
  }

  render() {
    console.log("updated state --->", this.state);
    const text = !this.state.loaded
      ? "loading..."
      : `${this.state.data.length} records imported!`;
    const chart = !this.state.parsed ? (
      ""
    ) : (
      <Chart data={this.state.data} assignments={this.state.assignments} />
    );
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
