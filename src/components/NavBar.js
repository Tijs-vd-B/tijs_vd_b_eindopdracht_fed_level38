import React from "react";
import { Link } from "react-router-dom";

function NavBar(props) {
  console.log(props);
  const studentLink = props.items.map((item) => (
    <li key={item}>
      <Link to={`/students/${item}`}>{item}</Link>
    </li>
  ));

  return (
    <ul className="navBar-list">
      <li key="Home">
        <Link to="/">Home</Link>
      </li>
      {studentLink}
    </ul>
  );
}

export default NavBar;
