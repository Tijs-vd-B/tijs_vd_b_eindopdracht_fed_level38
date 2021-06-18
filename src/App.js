import React, { Component } from "react";
import "./App.css";
import Tabletop from "tabletop";
import { Switch, Route } from "react-router-dom";
import Chart from "./components/Chart";
import InputSelect from "./components/InputSelect";
import NavBar from "./components/NavBar";
import StudentInfo from "./components/StudentInfo";
import NoMatchPage from "./components/NoMatchPage";
import Home from "./components/Home";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loaded: false,
      parsed: false,
    };
    this.handleChartChange = this.handleChartChange.bind(this);
    // this.handleStudentSelect = this.handleStudentSelect.bind(this);
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
      setSelected: Array.from(studentSet).sort(),
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
        console.log(this.state.studentInfo);
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
    if (prevState.selectOneStudent !== this.state.selectOneStudent) {
      console.log(
        `selectOneStudent was updated to : ${this.state.selectOneStudent}`
      );
      console.log(this.state.selectOneStudent);
      this.handleChartChange(this.state.selectOneStudent);
    }
  }

  handleChartChange = (selectValue) => {
    console.log(`selectValue threw a handleChartChange with this `);
    console.log(selectValue);
    const selectedStudents = selectValue.map((item) => item.value);
    console.log(selectedStudents);
    this.setState({ selectedStudents: selectedStudents });
    // const { name, value } = event.target;
    // this.setState({ [name]: value });
  };

  handleStudentSelect = (value) => {
    console.log([value]);
    this.setState({
      selectOneStudent: [{ value: value, label: value }],
      setSelected: [value],
    });
  };

  render() {
    console.log("updated state --->", this.state);
    const text = !this.state.loaded
      ? "loading..."
      : `${this.state.data.length} records imported!`;
    const chart = !this.state.parsed ? (
      ""
    ) : (
      <Chart
        data={this.state.data}
        assignments={this.state.assignments}
        selectedStudents={this.state.selectedStudents}
      />
    );
    const selectChartBar = !this.state.parsed ? (
      ""
    ) : (
      <InputSelect
        name="selectedStudents"
        items={this.state.students}
        placeholder="None"
        selected={this.state.setSelected}
        handleChange={this.handleChartChange}
        //   defaultValue="Unknown"
      />
    );
    const navBar = !this.state.parsed ? (
      ""
    ) : (
      <NavBar
        name="selectNav"
        items={this.state.students}
        // placeholder="None"
        handleChange={this.handleStudentSelect}
        //   defaultValue="Unknown"
      />
    );
    const studentPage = !this.state.parsed ? (
      ""
    ) : (
      <Route
        path="/students/:studentName"
        children={(props) => (
          <StudentInfo
            {...props}
            students={this.state.students}
            bioData={this.state.studentInfo}
            handleStudentSelect={this.handleStudentSelect}
            onceSelected={this.state.selectOneStudent}
          />
        )}
      />
    );

    return (
      <div className="App">
        <header className="App-header">
          <h1>Student Dashboard</h1>
          <h3>(be informed)</h3>
          {text}
        </header>
        {navBar}
        {chart}
        {selectChartBar}
        <Switch>
          <Route exact path="/" component={Home} />
          {studentPage}
          <Route component={NoMatchPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
