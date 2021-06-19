import React, { Component } from "react";
import "./App.css";
import Tabletop from "tabletop";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import StudentInfo from "./components/StudentInfo";
import NoMatchPage from "./components/NoMatchPage";
import Home from "./components/Home";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      ratingToggle: { difficulty: true, enjoyment: true },
      loaded: false,
      parsed: false,
    };
  }

  componentDidMount() {
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
    const studentSet = new Set();
    this.state.data.forEach((i) => studentSet.add(i.student));
    this.setState({
      ...this.state,
      assignments: Array.from(assignmentSet),
      students: Array.from(studentSet).sort(),
      parsed: true,
      selectedStudents: Array.from(studentSet).sort(),
    });
  }

  addStudentInfo() {
    const baseUrl = "https://randomuser.me/";
    const length = this.state.students.length;
    const fetchUrl = `${baseUrl}api/?results=${length}&inc=name,dob,phone,picture&noinfo`;
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ studentInfo: data.results });
      })
      .catch(console.log);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.loaded !== this.state.loaded) {
      this.parseData();
    }
    if (prevState.students !== this.state.students) {
      this.addStudentInfo();
    }
  }

  handleChartChange = (selectValue) => {
    const newSelectedStudents = selectValue.map((item) => item.value);
    this.setState({ selectedStudents: newSelectedStudents });
  };

  handleToggleChange = (event) => {
    if (event.target.type === "radio") {
      switch (event.target.value) {
        case "difficulty":
          this.setState({
            ratingToggle: { difficulty: true, enjoyment: false },
          });
          break;
        case "enjoyment":
          this.setState({
            ratingToggle: { difficulty: false, enjoyment: true },
          });
          break;
        default:
          this.setState({
            ratingToggle: { difficulty: true, enjoyment: true },
          });
          break;
      }
    }
  };

  render() {
    // console.log("updated state --->", this.state);
    const text = !this.state.loaded
      ? "loading..."
      : `${this.state.data.length} records imported!`;

    const studentPage =
      !this.state.parsed || !this.state.studentInfo ? (
        ""
      ) : (
        <Route
          path="/students/:studentName"
          children={(props) => (
            <StudentInfo
              {...props}
              students={this.state.students}
              bioData={this.state.studentInfo}
              parsed={this.state.parsed}
              data={this.state.data}
              assignments={this.state.assignments}
              ratingToggle={this.state.ratingToggle}
            />
          )}
        />
      );

    return (
      <div className="App">
        <header className="App-header">
          <h1>Student Dashboard</h1>
          <p>{text}</p>
        </header>
        <NavBar
          name="selectNav"
          students={this.state.students}
          parsed={this.state.parsed}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home
                {...props}
                parsed={this.state.parsed}
                data={this.state.data}
                assignments={this.state.assignments}
                selectedStudents={this.state.selectedStudents}
                ratingToggle={this.state.ratingToggle}
                students={this.state.students}
                handleChartChange={this.handleChartChange}
                handleToggleChange={this.handleToggleChange}
              />
            )}
          />
          {studentPage}
          <Route component={NoMatchPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
