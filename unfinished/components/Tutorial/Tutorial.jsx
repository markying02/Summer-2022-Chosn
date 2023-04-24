import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import tutorial1 from "../../page2.png";
import tutorial2 from "../../page3.png";
import "./Tutorial.css";
import { Helmet } from "react-helmet-async";

const tutorialData = [
  {
    title: "Welcome!",
    description:
      "CHOOSE What Relationship you want to work on for the next 30 days.",
    picture: tutorial1,
  },
  {
    title: "Goals",
    description:
      "Every month we will assess, answer questions, and send you nudges to help you along the way.",
    picture: tutorial2,
  },
];

export const Tutorial = () => {
  const [selected, setSelected] = useState(0);
  const [redirect, setRedirect] = useState(false);
  return (
    <div className="tutorialContainer">
      {redirect ? <Redirect to="/challengeoverview" /> : null}
      <Helmet>
        <title>
          The how-to guide to onboarding Chosn | Relationship Goals Made Easy
        </title>
        <meta
          name="description"
          content="Welcome to Chosn Relationship App where you can enrich your most important relationships. We make your relationship goals easy."
        />
      </Helmet>
      <div className="centerContainer">
        <h1 className="tutorialTitle">{tutorialData[selected].title}</h1>
        <p className="tutorialDescription">
          {tutorialData[selected].description}
        </p>
        <img
          className="tutorialPhoto"
          src={tutorialData[selected].picture}
          alt="Tutorial"
        />
        <div className="flex-container">
          {tutorialData.map((item, index) => {
            return (
              <div
                onClick={() => {
                  setSelected(index);
                }}
                className={
                  selected === index ? "circleBtn selectedBtn" : "circleBtn"
                }
              ></div>
            );
          })}
        </div>
        <Button
          className="submitBtn tutorialNextBtn"
          onClick={() => {
            if (selected + 1 >= tutorialData.length) {
              setRedirect(true);
              return;
            }
            setSelected(selected + 1);
          }}
        >
          Next
        </Button>
        <p className="skipText">
          <Link to="/challengeoverview" className="skipBtn">
            Skip
          </Link>
        </p>
      </div>
    </div>
  );
};
