import React from "react";
import "./ChallengeComponent.css";
import hourglass from "../../assets/hourglass.svg";
import { useAuth } from "../../providers/AuthProvider";

export const ChallengeComponent = ({
  name,
  text,
  onClick,
  partnerAccept,
  partnerName,
  ownerName,
  owner,
  waiting,
}) => {
  const { userData } = useAuth();
  const nameToUser = userData.username === owner ? partnerName : ownerName;

  return (
    <div
      className="challengeComponent"
      style={onClick ? { cursor: "pointer" } : {}}
      onClick={() => onClick && onClick(text)}
    >
      <p className="challengeName">{name}</p>
      <div>
        {text ? (
          <p className="challengeInnerText">{text}</p>
        ) : (
          <p className="challengePlus">+</p>
        )}
      </div>
      {text === "Partnered" && !partnerAccept && waiting ? (
        <div className="partnerAcceptCircle">
          <img
            src={hourglass}
            alt="Hourglass"
            style={{
              width: "15px",
              height: "24px",
              placeSelf: "flex-end",
              margin: "5px 7px",
            }}
          />
        </div>
      ) : null}
      {text === "Partnered" && partnerAccept && waiting ? (
        <img
          src={
            "https://ui-avatars.com/api/?&name=" +
            nameToUser +
            "&length=" +
            nameToUser.split(" ")
          }
          alt="Partner's initials"
          className="partnerInitial"
        />
      ) : null}
    </div>
  );
};
