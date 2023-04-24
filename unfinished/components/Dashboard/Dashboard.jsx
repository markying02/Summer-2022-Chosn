import React, { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { Navbar } from "../Navbar/Navbar";
import { API, graphqlOperation } from "aws-amplify";
import { listGoalss, nudgesForUser } from "../../graphql/queries";
import "./Dashboard.css";
import "../Challenge/ChallengeComponent.css";
import { GoalComponent } from "./GoalComponent";
import { Grid } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useGoals } from "../../providers/GoalProvider";
import { useChallengeData } from "../../providers/ChallengeProvider";
import { ChallengePicker } from "../Challenge/ChallengePicker";
import share from "../../assets/share.svg";
import { DayCarousel } from "../DayChallenge/DayCarousel";
import dayjs from "dayjs";

export const Dashboard = () => {
  const { userData } = useAuth();
  const [goalsLoaded, setGoalsLoaded] = useState(false);
  const [nudges, setNudges] = useState();
  const [nudgesLoaded, setNudgesLoaded] = useState(false);
  const [renewGoals, setRenewGoals] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { goals, setGoals, setRelationship } = useGoals();
  const { availableChallenge, challengeUserData, hasAvailableChallengeEnded } =
    useChallengeData();

  const parseRelationship = (relationship) => {
    return relationship === "self"
      ? "Personal"
      : relationship?.charAt(0).toUpperCase() + relationship?.slice(1);
  };

  useEffect(() => {
    API.graphql({ query: listGoalss }).then((goals) => {
      console.log(goals);
      if (goals.data.listGoalss.items.length === 0) {
        setRedirect(true);
      } else {
        const item = goals.data.listGoalss.items[0];
        if (item.thirtyDaysTextSent) {
          setRenewGoals(true);
        }
        const createdAt = dayjs(item.createdAt);

        const queryParams = {
          owner: userData.username,
          sortDirection: "DESC",
          limit: 20,
        };

        const operation = graphqlOperation(nudgesForUser, queryParams);
        API.graphql(operation).then((data) => {
          const filtered = data.data.nudgesForUser.items.filter((nudgeItem) =>
            dayjs(nudgeItem.createdAt).isAfter(createdAt)
          );
          setNudges(filtered);
          setNudgesLoaded(true);
        });

        setGoals([item.goal1, item.goal2, item.goal3]);
        setRelationship(item.relationshipType);
      }
      setGoalsLoaded(true);
    });
  }, [userData.username, setGoals, setRelationship]);

  return (
    <div className="dashboardContainer">
      <Navbar />
      {redirect ? <Redirect to="/goaltype" /> : null}
      <Helmet>
        <title>My Chosn Dashboard | Relationship Goals Made Easy</title>
        <meta
          name="description"
          content="The Chosn Dashboard is where you can find a snapshot of your relationship health. By setting your intentions, we can support you on your journey."
        />
      </Helmet>
      <div className="dashboardGoalContainer">
        <div className="goal-header">
          <p className="dashboardGoalText">
            Your{" "}
            {goalsLoaded && goals?.relationshipType
              ? parseRelationship(goals.relationshipType)
              : ""}{" "}
            Goals:
          </p>
          <Link to="/mygoals">
            <div className="share-circle">
              <img
                src={share}
                alt="Share Goals"
                style={{
                  width: "16px",
                  height: "23px",
                  margin: "1px 0 0 0",
                }}
              />
            </div>
          </Link>
        </div>
        <Grid style={{ margin: 0 }} columns={"equal"}>
          <Grid.Row style={{ margin: "auto", padding: "0 2.5px 0 2.5px" }}>
            <Grid.Column style={{ padding: "2px" }}>
              <GoalComponent goalName={goalsLoaded ? goals[0] : ""} />
            </Grid.Column>
            <Grid.Column style={{ padding: "2px" }}>
              <GoalComponent goalName={goalsLoaded ? goals[1] : ""} />
            </Grid.Column>
            <Grid.Column style={{ padding: "2px" }}>
              <GoalComponent goalName={goalsLoaded ? goals[2] : ""} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

      {renewGoals ? (
        <div className="newGoals">
          <p className="newGoalsText">
            Hey 👋 {userData?.attributes?.given_name}, Congratulations 🥳 for
            making it through 30 days of your{" "}
            {goalsLoaded && goals?.relationshipType
              ? parseRelationship(goals.relationshipType)
              : ""}{" "}
            Goals. What do you want to work on next?{" "}
          </p>
        </div>
      ) : null}
      {renewGoals ? (
        <Link
          className="relationshipTypeNextBtn dashboardRelationshipTypeNextBtn"
          to="/goaltype"
        >
          Set NEW Goals
        </Link>
      ) : null}

      <section className="dashboardChallengesContainer">
        {availableChallenge && challengeUserData ? (
          dayjs.utc().isSameOrBefore(availableChallenge?.endDate) ? (
            challengeUserData.filter((item) =>
              item.partners.length > 0
                ? item.partnerAccept === true
                  ? true
                  : false
                : true
            ).length < 2 ? (
              <ChallengePicker />
            ) : null
          ) : (
            <ChallengePicker />
          )
        ) : null}
      </section>

      {availableChallenge && challengeUserData ? (
        hasAvailableChallengeEnded() ? null : (
          <DayCarousel />
        )
      ) : null}

      <div className="dashboardNudgeContainer">
        <p className="dashboardNudgeTitle">Nudges</p>
        <Grid style={{ margin: 0 }}>
          {nudgesLoaded && nudges && nudges.length > 0 ? (
            nudges.map((nudge) => (
              <Grid.Row className="dashboardNudgeRowContainer" key={nudge.id}>
                <p className="dashboardNudgeRow">{nudge.nudge}</p>
              </Grid.Row>
            ))
          ) : (
            <Grid.Row>
              <p className="noNudgeText">
                You currently have ZERO nudges... check back later
              </p>
            </Grid.Row>
          )}
        </Grid>
      </div>
    </div>
  );
};
