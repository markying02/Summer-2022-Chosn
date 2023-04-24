import React from "react";

import "./GoalComponent.css";

export const GoalComponent = ({ goalName }) => {
  return (
    <div className="goalComponent">
      <p className="goalComponentText">{goalName}</p>
    </div>
  );
};
