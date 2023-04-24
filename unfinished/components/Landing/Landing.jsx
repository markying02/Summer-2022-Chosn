import React from "react";
import { Grid, Container } from "semantic-ui-react";
import { Step } from "./Step";
import { Footer } from "./Footer";
import logo from "../../logo.png";
import screen from "../../page3.png";
import { Link } from "react-router-dom";
import "./Landing.css";
import { Helmet } from "react-helmet-async";

export const Landing = ({
  title,
  description,
  signUpBtnText,
  steps,
  metaTitle,
  metaDescription,
}) => {
  return (
    <>
      <Container className="landingContainer">
        <div style={{ minHeight: "calc(81vh - 64px)", marginBottom: "64px" }}>
          <Helmet>
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
          </Helmet>
          <Container>
            <Grid stackable columns={3}>
              <Grid.Column widescreen="2" style={{ maxHeight: "150px" }}>
                <img className="chosnLogo" src={logo} alt="Chosn" />
              </Grid.Column>
              <Grid.Column>
                <h1 className="chosnHeader">{title}</h1>
                <p className="chosnText">{description}</p>
                <Grid style={{ paddingLeft: "24px", paddingTop: "8px" }}>
                  <Link className="submitBtn landingBtn" to="/register">
                    {signUpBtnText}
                  </Link>
                  <p className="accountExistText">
                    Already have an account?
                    <Link className="signInBtn" to="/signin">
                      Sign In
                    </Link>
                  </p>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <img className="screenImage" src={screen} alt="goals" />
              </Grid.Column>
            </Grid>
          </Container>
          <h1 className="chosnWorkHeader">How does Chosn work?</h1>
          <Grid
            centered
            stackable
            columns={3}
            style={{ margin: "0px", padding: "0px" }}
          >
            {steps.map((item) => {
              return (
                <Grid.Column>
                  <Step title={item.title} description={item.text} />
                </Grid.Column>
              );
            })}
          </Grid>
          <div className="joinBtnContainer">
            <Link className="submitBtn joinChosnBtn" to="/register">
              Join Chosn
            </Link>
          </div>
        </div>
        <Footer />
      </Container>
    </>
  );
};

export const DefaultSteps = [
  {
    title: "Step 1",
    text: "CHOOSE What Relationship you want to work on for the next 30 days.",
  },
  { title: "Step 2", text: "CHOOSE 3 Relationship Goals" },
  {
    title: "Step 3",
    text: "Receive 3 weekly, CHOSN Nudges reminding you of action items you can take to accomplish your relationship goals.",
  },
];
