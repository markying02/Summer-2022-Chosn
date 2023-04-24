import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useGoals } from "../../providers/GoalProvider";
import { RWebShare } from "react-web-share";
import "./FinishedGoal.css";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../providers/AuthProvider";
import logo from "../../assets/logo.svg";
import share from "../../assets/share.svg";

export const FinishedGoal = () => {
  const { goals, relationship } = useGoals();
  const { userData } = useAuth();

  const parseRelationship = () => {
    return relationship === "self"
      ? "Personal"
      : relationship?.charAt(0).toUpperCase() + relationship?.slice(1);
  };

  const getGoalsAsString = () => {
    return goals[0] + " " + goals[1] + " " + goals[2];
  };

  return (
    <div className="finishedGoalContainer">
      <Helmet>
        <title>Your Relationship Goals | Setting Your Intentions</title>
        <meta
          name="description"
          content="Here are your 3 Goals for the next 30 days. Chosn brings behavioral science to your most important relationships by helping you be the best version of yourself."
        />
      </Helmet>
      {goals.length !== 3 ? <Redirect to="/choosegoals" /> : null}
      <header className="finishedGoalHeader">
        <div className="logo-circle-goals">
          <img
            src={logo}
            alt="Chosn"
            style={{
              width: "70px",
              height: "69px",
              margin: "0 3px 0 0px",
            }}
          />
        </div>
        <p className="finishedGoalHeaderText">@Chosnapp</p>
      </header>
      <p className="finishedGoalName">
        {userData?.attributes?.given_name}'s Goals!
      </p>
      <p className="finishedGoalDescription">
        These are your <strong>Chosn {relationship} goals</strong> for the next
        30 days!
      </p>
      {relationship ? null : <Redirect to="/goaltype" />}

      {goals.map((name) => (
        <div className="finished-goal">
          <p key={name} className="finishedGoalText">
            {name}
          </p>
        </div>
      ))}
      <p className="finished-goals-text">#chosngoals</p>

      <RWebShare
        data={{
          text: `Hey 👋 these are my 3 ${parseRelationship()} Goals for the next 30 days. ${getGoalsAsString()} Get your Relationship Goals @ `,
          title: "Share",
          url: "https://chosn.io/getmygoals",
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <Link to="#">
          <div className="share-finished-goals-circle">
            <img
              src={share}
              alt="Share Goals"
              style={{
                width: "20px",
                height: "27px",
                margin: "1px 0 0 0",
              }}
            />
          </div>
        </Link>
      </RWebShare>
      <Link className="finished-goals-text" to="/mydashboard">
        Skip
      </Link>
    </div>
  );
};
