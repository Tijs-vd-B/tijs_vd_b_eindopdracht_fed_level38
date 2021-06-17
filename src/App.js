import React, { Component } from "react";
import "./App.css";
import Tabletop from "tabletop";
import { Switch, Route } from "react-router-dom";
import Chart from "./components/Chart";
import InputSelect from "./components/InputSelect";
import NavBar from "./components/NavBar";
import StudentInfo from "./components/StudentInfo";
import NoMatchPage from "./components/NoMatchPage";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loaded: false,
      parsed: false,
    };
    this.handleChartChange = this.handleChartChange.bind(this);
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
  }

  handleChartChange = (selectValue) => {
    console.log(selectValue);
    const selectedStudents = selectValue.map((item) => item.value);
    console.log(selectedStudents);
    this.setState({ selectedStudents: selectedStudents });
    // const { name, value } = event.target;
    // this.setState({ [name]: value });
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
        // handleChange={this.handleChartChange}
        //   defaultValue="Unknown"
      />
    );
    const studentPage = !this.state.parsed ? (
      ""
    ) : (
      <Route
        path="/students/:studentName"
        render={(props) => (
          <StudentInfo
            {...props}
            students={this.state.students}
            bioData={this.state.studentInfo}
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
export const Home = () => (
  <div>
    <h1> Home Component</h1>
    <div>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </div>
  </div>
);

export default App;
