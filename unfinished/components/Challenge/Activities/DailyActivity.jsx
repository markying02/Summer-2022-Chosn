import React from "react";
import "./DailyActivity.css";
import { Helmet } from "react-helmet-async";
import { Navbar } from "../../Navbar/Navbar";
import { QuestionAnswerComponent } from "./QuestionAnswerComponent";

export const DailyActivity = (props) => {
  const dayData = props.history.location.state.dayData;
  const challengeUserDataId = props.history.location.state.challengeUserDataId;
  const solo = props.history.location.state.solo;

  console.log("SDKJFNSDJKFNDJKSNK DAY DATA");
  console.log(dayData);

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
      <QuestionAnswerComponent
        dayData={dayData}
        challengeUserDataId={challengeUserDataId}
        activityData={
          solo ? dayData.soloActivityData : dayData.partnerActivityData
        }
        resultCount={
          solo ? dayData.soloResultCount : dayData.partnerResultCount
        }
      />
    </div>
  );
};
