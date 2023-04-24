import React, { useState } from "react";
import "./ChallengeComponent.css";
import "./ChallengePicker.css";
import { Link } from "react-router-dom";
import { useChallengeData } from "../../providers/ChallengeProvider";
import { PartnerInviteComponent } from "./PartnerInviteComponent";
import { ChallengeComponent } from "./ChallengeComponent";
import { RegisterChallenge } from "./RegisterChallenge";
import { useAuth } from "../../providers/AuthProvider";

import dayjs from "dayjs";

export const ChallengePicker = () => {
  const {
    challengeUserData,
    challenges,
    availableChallenge,
    hasAvailableChallengeStarted,
  } = useChallengeData();
  const { userData } = useAuth();
  const [registering, setRegistering] = useState(false);
  const [visible, setVisible] = useState(true);
  const pathname = window.location.pathname;

  const challengeStartDate = dayjs(availableChallenge.startDate);
  const challengeEndDate = dayjs(availableChallenge.endDate);
  const nth = function (d) {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  return (
    <>
      {pathname === "/mydashboard" && (
        <>
          <div
            className="relationshipTypeNextBtn dashboardRelationshipTypeNextBtn"
            onClick={() => setVisible(!visible)}
          >
            {availableChallenge?.name}
          </div>
          {hasAvailableChallengeStarted() ? (
            <p className="challengeDate">
              Ends on{" "}
              {challengeEndDate.format("MMMM, D") +
                nth(challengeEndDate.get("date"))}{" "}
            </p>
          ) : (
            <p className="challengeDate">
              {" "}
              Starts on{" "}
              {challengeStartDate.format("MMMM, D") +
                nth(challengeStartDate.get("date"))}{" "}
            </p>
          )}
        </>
      )}

      <section className="dashboardPartnerInvites">
        {challengeUserData
          ? challengeUserData
              .filter((data) => {
                return data.owner !== userData.username && !data.partnerAccept;
              })
              .map((data) => {
                return (
                  <PartnerInviteComponent
                    challengeUserData={data}
                    onClick={() => {
                      setVisible(true);
                    }}
                  />
                );
              })
          : null}
      </section>

      <div
        className="challengesContainer"
        style={visible ? {} : { display: "none" }}
      >
        {pathname === "/mydashboard" &&
        challengeUserData.length > 0 &&
        challenges ? (
          <>
            {!registering
              ? challengeUserData
                  .filter((data) => {
                    return (
                      data.owner === userData.username || data.partnerAccept
                    );
                  })
                  .map((item) => {
                    let text;
                    if (item.partners.length > 0) {
                      text = "Partnered";
                    } else {
                      text = "Solo";
                    }

                    return (
                      <ChallengeComponent
                        id={item.id}
                        key={item.id}
                        name={availableChallenge.name}
                        text={text}
                        partnerAccept={item.partnerAccept}
                        partnerName={item.partnerName}
                        ownerName={item.ownerName}
                        owner={item.owner}
                        waiting
                      />
                    );
                  })
              : null}
          </>
        ) : null}
        {challengeUserData.filter((data) => {
          return data.owner === userData.username || data.partnerAccept;
        }).length < 2 ? (
          <RegisterChallenge
            setRegistering={setRegistering}
            registering={registering}
          />
        ) : null}
      </div>
      {pathname === "/registerchallenge" && challengeUserData && (
        <Link className="back-btn" to="/welcome">
          Skip
        </Link>
      )}
    </>
  );
};
