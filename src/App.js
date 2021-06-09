import React, { Component } from "react";
import "./App.css";
import Tabletop from "tabletop";
// import StudentData from "./components/StudentData";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    Tabletop.init({
      // key: "1fKX0b0-FMXqo6M0VfPIt7oBYUzgVbxtNXtN790i_mN8", // my-key
      key: "1SwA98fnmzIFrSjbPDvzUw7JEqW1VE5YUJvchcEL0aUE", // my-key

      // key: "1BHjq5MjpuSItvVbnQcEdQt_v956-Ks1lr3f_nEFkTks", // WinC-key
      simpleSheet: true,
      parseNumbers: true,
      callback: (googleData) => {
        let cleanData = [];
        googleData.forEach((element) => {
          const newItem = {
            name: element["Wie ben je?"],
            excercise:
              element["Welke opdracht of welk project lever je nu in?"],
            difficultyRating: element["Hoe moeilijk vond je deze opdracht?"],
            enjoymentRating: element["Hoe leuk vond je deze opdracht?"],
          };
          cleanData = [...cleanData].concat(newItem);
        });
        this.setState({
          data: cleanData,
        });
      },
    });
  }

  render() {
    console.log("updated state --->", this.state);
    return (
      <div className="App">
        <header className="App-header">
          <h1>Student Dashboard</h1>
          <h3>(be informed)</h3>
          {/* <StudentData /> */}
          {this.state.data.length} records imported!
        </header>
      </div>
    );
  }
}

export default App;
