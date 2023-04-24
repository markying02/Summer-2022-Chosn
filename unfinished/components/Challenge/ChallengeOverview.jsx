import React from "react";
import { Navbar } from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import "../GoalDashboard/GoalDashboard.css";
import { Helmet } from "react-helmet-async";

export const ChallengeOverview = () => {
  return (
    <div className="goalDashboardContainer">
      <Navbar />
      <Helmet>
        <title>
          Welcome to Chosn | Onboarding the best version of yourself
        </title>
        <meta
          name="description"
          content="Let's start by setting your intentions for the next 30 days. Through behavioral science, we help you be the best version of yourself."
        />
      </Helmet>
      <div className="goalDashboardPadding">
        <header className="goalHeader">
          Lets choose an upcoming challenge!
        </header>
        <p className="goalDescription">
          {
            "The Chosn 7-Day Challenge is a curated experience of daily activities & questions created by relationship experts. Throughout a challenge, you will be provided with tools that encourage growth and healthy relationship habits."
          }
        </p>
        <Link className="chooseGoalsBtn" to="/registerchallenge">
          Choose Challenge
        </Link>
      </div>
    </div>
  );
};
