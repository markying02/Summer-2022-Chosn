import React, { useState } from "react";
import "./DailyActivity.css";
import { useChallengeData } from "../../../providers/ChallengeProvider";
import { Button } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

export const QuestionAnswerComponent = ({
  dayData,
  challengeUserDataId,
  resultCount,
  activityData,
}) => {
  const { availableChallenge, createResultForUserChallengeData } =
    useChallengeData();
  const [answerResults, setAnswerResults] = useState([]);
  const [answerObj, setAnswerObj] = useState();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [redirectSubmit, setRedirectSubmit] = useState(false);
  const [redirectDashboard, setRedirectDashboard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeBtn, setActiveBtn] = useState("none");
  const [error, setError] = useState("");

  const setAnswer = (e) => {
    setActiveBtn(e.target.name);
    setAnswerObj({
      question: questionIndex + 1,
      answer: e.target.name,
      value: e.target.value,
    });
    if (questionIndex === activityData.questions.length - 1) {
      setRedirectSubmit(true);
    }
  };

  const navigateQuestions = (direction) => {
    setActiveBtn("none");

    if (direction === "next") {
      if (answerObj === undefined) {
        setError("Please make a selection.");
      } else {
        setAnswerResults([...answerResults, answerObj]);
        setQuestionIndex(questionIndex + 1);
        setAnswerObj(undefined);
        setError(!error);
      }
    }

    if (
      direction === "next" &&
      questionIndex === activityData.questions.length - 1
    ) {
      if (answerObj === undefined) {
        setError("Please make a selection.");
      }
    }

    if (
      direction === "back" &&
      questionIndex <= activityData.questions.length - 1
    ) {
      answerResults.pop();
      setRedirectSubmit(false);
      setQuestionIndex(questionIndex - 1);
    }

    if (direction === "back" && questionIndex === 0) {
      clearAnswers();
      setRedirectDashboard(true);
    }
  };

  const clearAnswers = () => {
    setAnswerObj({});
    setAnswerResults([]);
  };

  const submitResults = async () => {
    setLoading(true);

    const updatedAnswerResults = [...answerResults, answerObj];

    // loop through all answer results and sum the value
    let totalValue = 0;
    updatedAnswerResults.forEach((answer) => {
      totalValue += parseInt(answer.value);
    });

    let results = activityData.results.filter((result) => {
      const startRange = result.startRange;
      const endRange = result.endRange;
      return totalValue >= startRange && totalValue <= endRange;
    });

    // random result from results
    let randomResults = [];
    for (var i = 0; i < resultCount; i++) {
      let randomResult = results[Math.floor(Math.random() * results.length)];
      randomResults.push(randomResult);

      let index = results.indexOf(randomResult);
      if (index > -1) {
        results.splice(index, 1);
      }
    }

    await createResultForUserChallengeData(
      challengeUserDataId,
      randomResults,
      dayData.id
    );
    setLoading(false);
    setRedirectSubmit(false);
    setRedirectDashboard(true);
  };

  return (
    <>
      {redirectDashboard ? (
        <Redirect to="/mydashboard" />
      ) : (
        <>
          <div className="question-answer-container">
            <h2 className="daily-activity-header">LOVE Challenge</h2>
            <div className="daily-question-box">
              <h3 className="daily-question-header">
                Question {questionIndex + 1} of{" "}
                {availableChallenge ? activityData.questions.length : null}
              </h3>
              <p className="daily-question-text">
                {availableChallenge
                  ? activityData.questions[questionIndex].question
                  : null}
              </p>
            </div>
            <section className="answer-grid">
              {availableChallenge
                ? activityData.questions[questionIndex].answers.map(
                    (answer) => (
                      <button
                        key={answer.answerText}
                        name={answer.answerText}
                        className={
                          activeBtn === answer.answerText
                            ? "btn-active"
                            : "answer-selection"
                        }
                        value={answer.answerValue}
                        onClick={(e) => setAnswer(e)}
                      >
                        {answer.answerText}
                      </button>
                    )
                  )
                : null}
            </section>
            <div className="question-btns">
              {error ? <p className="error-text">{error}</p> : null}
              {redirectSubmit ? (
                <Button
                  className="next-question-btn"
                  loading={loading}
                  onClick={() => submitResults()}
                >
                  {" "}
                  Submit
                </Button>
              ) : (
                <Button
                  className="next-question-btn"
                  onClick={() => navigateQuestions("next")}
                >
                  {" "}
                  Next
                </Button>
              )}
              <p
                style={{ color: "white" }}
                onClick={() => navigateQuestions("back")}
              >
                {"< Back"}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};
