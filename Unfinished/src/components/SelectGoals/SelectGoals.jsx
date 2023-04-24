import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Redirect } from "react-router-dom";
import { Grid, Button } from "semantic-ui-react";
import { useGoals } from "../../providers/GoalProvider";
import { Navbar } from "../Navbar/Navbar";
import { GoalCircle } from "./GoalCircle";
import "./SelectGoals.css";

export const SelectGoals = () => {
  const { getAvailableGoals, updateGoals, relationship, identity } = useGoals();
  const availableGoals = getAvailableGoals();
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  return (
    <div className="selectGoalsContainer">
      {redirect ? <Redirect to="/mygoals" /> : null}
      {!relationship ? <Redirect to="/goaltype" /> : null}
      {!identity ? <Redirect to="/identity" /> : null}
      <Helmet>
        <title>Relationship Goals Setting | Relationship Goals Made Easy</title>
        <meta
          name="description"
          content="Now that you have set your priorities for the next 30 days, what areas are to be of focus? Chosn brings behavioral science to your relationship journey."
        />
      </Helmet>
      <Navbar />
      <p className="selectGoalDescription">
        What are 3 goals you want to work on this month?
      </p>
      <Grid>
        <Grid.Row className="goalGrid" centered>
          {availableGoals.map((name) => (
            <Grid.Column width={6} key={name}>
              <GoalCircle name={name} />
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
      <Button
        className="relationshipTypeNextBtn"
        loading={loading}
        onClick={async () => {
          setLoading(true);
          await updateGoals();
          setRedirect(true);
          setLoading(false);
        }}
      >
        Done!
      </Button>
    </div>
  );
};
