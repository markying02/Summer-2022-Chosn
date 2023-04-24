import React from "react";
import "./RegisterChallenge.css";
import { Helmet } from "react-helmet-async";
import { Navbar } from "../Navbar/Navbar";
import { ChallengePicker } from "./ChallengePicker";

export const PreRegister = () => {
  return (
    <div className="preRegisterContainer">
      <Helmet>
        <title>Join Chosn | Relationship Goals Made Easy</title>
        <meta
          name="description"
          content="Chosn will help you become the best version of yourself. Joining Chosn empowers you with behavioral science for your most important relationships."
        />
      </Helmet>
      <Navbar />
      <ChallengePicker />
    </div>
  );
};
