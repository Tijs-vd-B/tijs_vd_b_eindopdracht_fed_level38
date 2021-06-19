import React, { useState } from "react";

function DataTable(props) {
  const [sortConfig, setSortConfig] = useState(null);

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

  let sortedData = selectedData;
  if (sortConfig !== null) {
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const setButtonText = (name) => {
    if (sortConfig == null || sortConfig.key !== name) return `${name}`;
    else if (sortConfig.direction === "descending") return `${name} ˄`;
    else return `${name} ˅`;
  };

  const listItems = sortedData.map((item) => (
    <tr className="data-table-item" key={item.id} value={item.student}>
      <td>{item.student}</td>
      <td>{item.assignment}</td>
      <td>{item.difficultyRating}</td>
      <td>{item.enjoymentRating}</td>
    </tr>
  ));
  return (
    sortedData.length > 0 && (
      <table className="data-table" style={{ width: "100%" }}>
        <thead>
          <tr className="data-table-header">
            <th className="data-row__item">
              <button type="button" onClick={() => requestSort("student")}>
                {setButtonText("student")}
              </button>
            </th>
            <th className="data-row__item">
              <button type="button" onClick={() => requestSort("assignment")}>
                {setButtonText("assignment")}
              </button>
            </th>
            <th className="data-row__item">
              <button
                type="button"
                onClick={() => requestSort("difficultyRating")}
              >
                {setButtonText("difficultyRating")}
              </button>
            </th>
            <th className="data-row__item">
              <button
                type="button"
                onClick={() => requestSort("enjoymentRating")}
              >
                {setButtonText("enjoymentRating")}
              </button>
            </th>
            {/* <th className="data-row__item">
              <button type="button" onClick={props.handleClickRemoveAlldatas}>
                RemALL
              </button>
            </th> */}
          </tr>
        </thead>
        <tbody>{listItems}</tbody>
      </table>
    )
  );
}

export default DataTable;
