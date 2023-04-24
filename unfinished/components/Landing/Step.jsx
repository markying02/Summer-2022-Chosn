import React from "react";
import "./Step.css";

export const Step = ({ title, description }) => {
  return (
    <div className="stepContainer">
      <p className="stepTitle">{title}</p>
      <p className="stepDescription">{description}</p>
    </div>
  );
};
