import React, { useState } from "react";
import "./TermsConditions.css";
import { Helmet } from "react-helmet-async";
import logo from "../../assets/logo.svg";
import { terms } from "../../termsConditions";
import { Button } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

export const TermsConditions = () => {
  const [redirect, setRedirect] = useState(false);

  return (
    <div className="preRegisterContainer">
      {redirect ? <Redirect to="/register" /> : null}
      <Helmet>
        <title>Join Chosn | Relationship Goals Made Easy</title>
        <meta
          name="description"
          content="Chosn will help you become the best version of yourself. Joining Chosn empowers you with behavioral science for your most important relationships."
        />
      </Helmet>
      <section className="terms-container">
        <img
          src={logo}
          style={{ width: "100px", height: "100px" }}
          alt="Chosn"
        ></img>
        <h2 className="terms-header">{"Terms & Conditions"}</h2>
        <p className="terms-copy">{terms}</p>
        <Button className="back-btn" onClick={() => setRedirect(true)}>
          Back
        </Button>
      </section>
    </div>
  );
};
