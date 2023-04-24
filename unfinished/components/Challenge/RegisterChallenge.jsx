import React, { useState } from "react";
import "./RegisterChallenge.css";
import { Redirect } from "react-router-dom";
import { ChallengeComponent } from "./ChallengeComponent";
import { ChallengeInvite } from "./ChallengeInvite";
import { Helmet } from "react-helmet-async";
import { useChallengeData } from "../../providers/ChallengeProvider";

export const RegisterChallenge = ({ registering, setRegistering }) => {
  const [typeRedirect, setTypeRedirect] = useState(false);
  const { availableChallenge, getAvailableChallengeType, submitUserChallenge } =
    useChallengeData();
  const [redirectSolo, setRedirectSolo] = useState(false);
  const [redirectPartnered, setRedirectPartnered] = useState(false);
  const [availableChallengeType, setAvailableChallengeType] = useState();
  const [redirectGoals, setRedirectGoals] = useState(false);
  const [type, setType] = useState("");
  const [header, setHeader] = useState("CHOOSE Challenge");
  const pathname = window.location.pathname;

  const selectChallenge = () => {
    setRegistering(true);
    const type = getAvailableChallengeType(availableChallenge);
    setAvailableChallengeType(type);
    setTypeRedirect(true);
    setHeader("CHOOSE Challenge Type");
  };

  const selectType = (text) => {
    if (text === "Solo") {
      setHeader("");
      setTypeRedirect(false);
      setRedirectSolo(true);
    } else {
      setHeader("Invite");
      setType("Partnered");
      setTypeRedirect(false);
      setRedirectPartnered(true);
    }
  };

  const confirmChallenge = async (partnerPhoneNum, solo) => {
    if (solo) {
      await submitUserChallenge();
      setRedirectSolo(false);
    } else {
      await submitUserChallenge(partnerPhoneNum);
      setRedirectPartnered(false);
    }
    setRegistering(false);
    if (pathname === "/registerchallenge") {
      setRedirectGoals(true);
    }
  };

  return (
    <section className="registerContainer">
      {redirectGoals ? <Redirect to="/welcome" /> : null}
      <Helmet>
        <title>Join Chosn | Relationship Goals Made Easy</title>
        <meta
          name="description"
          content="Chosn will help you become the best version of yourself. Joining Chosn empowers you with behavioral science for your most important relationships."
        />
      </Helmet>
      {pathname === "/registerchallenge" && (
        <header className="challengeHeader">{header}</header>
      )}

      {availableChallenge && !registering ? (
        <ChallengeComponent
          name={availableChallenge.name}
          id={availableChallenge.id}
          onClick={selectChallenge}
        />
      ) : null}

      {typeRedirect ? (
        <>
          <div className="challengeTypeContainer">
            {availableChallengeType.map((item) => (
              <ChallengeComponent
                id={availableChallenge.id}
                name={availableChallenge.name}
                text={item}
                onClick={selectType}
              />
            ))}
          </div>
        </>
      ) : null}
      {redirectSolo ? (
        <ChallengeInvite onClick={confirmChallenge} type={"Solo"} solo />
      ) : null}
      {redirectPartnered ? (
        <ChallengeInvite onClick={confirmChallenge} type={type} />
      ) : null}
    </section>
  );
};
