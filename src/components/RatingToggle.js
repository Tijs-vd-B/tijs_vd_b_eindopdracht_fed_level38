import React from "react";

function RatingToggle(props) {
  return (
    <form onChange={props.handleToggleChange} className="rating-toggle">
      <div id="input-container" styling={{ padding: 15 }}>
        <label
          style={{
            color: "white",
            background: "#282c34",
            padding: 9,
          }}
        >
          Difficulty Rating:
          <input
            type="radio"
            name="ratingToggle"
            id="difficulty"
            value="difficulty"
          />
        </label>
        <label
          style={{
            color: "white",
            background: "#6d7d9c",
            padding: 9,
          }}
        >
          Enjoyment Rating:
          <input
            style={{ color: "gold" }}
            type="radio"
            name="ratingToggle"
            id="enjoyment"
            value="enjoyment"
          />
        </label>
        <label
          style={{
            padding: 9,
          }}
        >
          Both:
          <input
            type="radio"
            name="ratingToggle"
            id="both"
            value="both"
            defaultChecked
          />
        </label>
      </div>
    </form>
  );
}

export default RatingToggle;
