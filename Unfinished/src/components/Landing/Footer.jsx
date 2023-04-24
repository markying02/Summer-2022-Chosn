import React from "react";
import { Grid } from "semantic-ui-react";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footerWrapper">
      <div className="footerContainer">
        <div className="socialContainer">
          <Grid>
            <Grid.Row>
              <Grid.Column width={"5"}>
                <a
                  href="https://www.facebook.com/chosnapp"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "white" }}
                >
                  Facebook
                </a>
              </Grid.Column>
              <Grid.Column width={"5"}>
                <a
                  href="https://www.instagram.com/chosnapp/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "white" }}
                >
                  Instagram
                </a>
              </Grid.Column>
              <Grid.Column width={"5"}>
                <a
                  href="https://twitter.com/chosnapp"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "white" }}
                >
                  Twitter
                </a>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    </div>
  );
};
