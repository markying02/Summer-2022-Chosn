import React from "react";
import { Navbar } from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import "./GoalDashboard.css";
import { Helmet } from "react-helmet-async";

export const GoalDashboard = () => {
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
        <header className="goalHeader">Lets choose some goals!</header>
        <p className="goalDescription">
          Answer a few quick questions to define tangible goals to help build
          stronger relationships.
        </p>
        <Link className="chooseGoalsBtn" to="/goaltype">
          Choose Goals
        </Link>
      </div>
    </div>
  );
};
