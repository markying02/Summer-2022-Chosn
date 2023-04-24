import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { useChallengeData } from "../../providers/ChallengeProvider";
import "./PartnerInviteComponent.css";

export const PartnerInviteComponent = ({ challengeUserData, onClick }) => {
  const [loading, setLoading] = useState(false);
  const { availableChallenge, acceptChallengeUserData } = useChallengeData();

  return (
    <div className="partnerInviteComponent">
      <p className="partnerTitleText">{challengeUserData.ownerName}'s Invite</p>
      <p className="partnerDescriptionText">
        {availableChallenge?.description}
      </p>
      <Button
        className="partnerInviteAcceptBtn"
        loading={loading}
        color="white"
        onClick={() => {
          setLoading(true);
          acceptChallengeUserData(challengeUserData).then((res) => {
            setLoading(false);
            onClick();
          });
        }}
      >
        Accept
      </Button>
    </div>
  );
};
