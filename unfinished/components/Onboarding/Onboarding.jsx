import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Redirect } from "react-router-dom";
import { Form, Grid, Radio, Button } from "semantic-ui-react";
import { useGoals } from "../../providers/GoalProvider";
import "./Onboarding.css";
import alert from "../../assets/alert.svg";

export const Onboarding = (props) => {
  const { identity, setIdentity } = useGoals();
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div
      className="container"
      style={{
        backgroundColor: "#250041",
      }}
    >
      {redirect ? <Redirect to="/tutorial" /> : null}
      <Helmet>
        <title>Tell us about yourself | Chosn Relationship Enrichment</title>
        <meta
          name="description"
          content="We make relevant content to treat you as a unique individual. Welcome to Chosn where we help you be the best version of yourself. Relationship Goals Made Easy."
        />
      </Helmet>
      <Grid centered>
        <Grid.Row>
          <Grid.Column>
            <div className="header1" style={{ marginTop: "72px" }}>
              <header>How do you identify?</header>
            </div>
            <Form style={{ justifyContent: "center" }}>
              <Form.Group style={{ padding: "32px" }}>
                <Radio
                  className="radio"
                  label="Male"
                  name="option1"
                  value="male"
                  checked={identity === "male"}
                  onChange={(event) => {
                    setIdentity("male");
                  }}
                />
              </Form.Group>
              <Form.Group style={{ padding: "32px" }}>
                <Radio
                  className="radio"
                  label="Female"
                  name="option2"
                  value="female"
                  checked={identity === "female"}
                  onChange={(event) => {
                    setIdentity("female");
                  }}
                />
              </Form.Group>
              <Form.Group style={{ padding: "32px" }}>
                <Radio
                  className="radio"
                  label="Non-binary"
                  name="option3"
                  value="nonbinary"
                  checked={identity === "nonbinary"}
                  onChange={(event) => {
                    setIdentity("nonbinary");
                  }}
                />
              </Form.Group>
            </Form>
            {error ? (
              <>
                <div className="identity-error-container">
                  <div className="error-circle">
                    <img
                      src={alert}
                      alt="Warning"
                      style={{
                        width: "14px",
                        height: "14px",
                        margin: "0px 0px 1px 0px",
                      }}
                    ></img>
                  </div>
                  <p className="signin-error">{error}</p>
                </div>
              </>
            ) : null}
            <div className="submitBtnContainer">
              <Button
                className="submitBtn"
                loading={loading}
                onClick={() => {
                  setLoading(true);
                  if (identity === "") {
                    setError("Please select how you identify.");
                    setLoading(false);
                    return;
                  } else {
                    setRedirect(true);
                    setLoading(false);
                  }
                }}
                style={{ float: "left", textAlign: "center" }}
              >
                Continue
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};
