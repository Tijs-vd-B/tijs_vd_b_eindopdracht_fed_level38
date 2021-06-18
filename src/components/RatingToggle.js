import React from "react";

function RatingToggle(props) {
  return (
    <form onChange={props.handleToggleChange} className="rating-toggle">
      <div id="input-container">
        <label>
          Both:
          <input
            type="radio"
            name="ratingToggle"
            id="both"
            value="both"
            defaultChecked
          />
        </label>
        <label>
          Difficulty Rating:
          <input
            type="radio"
            name="ratingToggle"
            id="difficulty"
            value="difficulty"
          />
        </label>
        <label>
          Enjoyment Rating:
          <input
            type="radio"
            name="ratingToggle"
            id="enjoyment"
            value="enjoyment"
          />
        </label>
      </div>
    </form>
  );
}

export default RatingToggle;
