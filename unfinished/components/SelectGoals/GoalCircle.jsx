import React from "react";
import { useGoals } from "../../providers/GoalProvider";

import "./GoalCircle.css";

export const GoalCircle = ({ name }) => {
  const { goals, setGoals } = useGoals();
  return (
    <div
      className="goal"
      onClick={() => {
        if (goals.includes(name)) {
          goals.splice(goals.indexOf(name), 1);
          setGoals([...goals]);
        } else {
          if (goals.length >= 3) return;
          setGoals([...goals, name]);
        }
      }}
      style={{
        background: goals.includes(name)
          ? "linear-gradient(131.68deg, #E93744 18.42%, #DD1581 85.26%)"
          : "transparent",
      }}
    >
      <p
        className="goalName"
        style={{ fontWeight: goals.includes(name) ? "700" : "normal" }}
      >
        {name}
      </p>
    </div>
  );
};
