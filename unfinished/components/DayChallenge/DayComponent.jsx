import React from "react";
import { Button } from "semantic-ui-react";
import "./css/DayComponent.css";

export const DayComponent = ({
  day,
  theme,
  btnText,
  btnClick,
  partnerName,
  instructions,
  activity,
  activeIndex,
  maxDay,
  activityType,
  showResults,
  results,
}) => {
  return (
    <div
      className="day-component"
      style={
        activeIndex === day - 1 && day <= maxDay + 1
          ? {
              height: "235px",
              boxShadow: "0px 4.14493px 4.14493px #C4C4C4",
              overflow: "hidden",
            }
          : (activeIndex !== day - 1) & (day <= maxDay + 1)
          ? { height: "215px" }
          : { height: "215px", width: "150px", opacity: ".7" }
      }
    >
      <p className="day-text">
        Day {day}{" "}
        {partnerName && (
          <img
            src={
              "https://ui-avatars.com/api/?&name=" +
              partnerName +
              "&length=" +
              partnerName.split(" ")
            }
            alt="Partner's initials"
            className="day-partner-image"
          />
        )}
      </p>
      <div className="day-content">
        {showResults && results
          ? results.map((result) => (
              <p className="day-box-text">{result.slice(1, -1)}</p>
            ))
          : null}
        {showResults && results && (
          <Button className="day-btn" onClick={() => btnClick && btnClick()}>
            Back
          </Button>
        )}
        {day <= maxDay + 1 && !showResults ? (
          <>
            <p className="day-box-text">
              <strong>Instructions:</strong> {instructions}
            </p>
            <p className="day-box-text">
              <strong>Activity:</strong> {activity}
            </p>
            {activityType === "QUESTIONS" && (
              <Button
                className="day-btn"
                onClick={() => btnClick && btnClick()}
              >
                {btnText}
              </Button>
            )}
          </>
        ) : null}
      </div>
      <p className="day-text">{theme}</p>
    </div>
  );
};
