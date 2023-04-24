import React, { useState } from "react";
import "./RegisterChallenge.css";
import { Helmet } from "react-helmet-async";
import { Form, Button } from "semantic-ui-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import "../SignIn/SignIn.css";
import { useChallengeData } from "../../providers/ChallengeProvider";

export const ChallengeInvite = ({ type, onClick, solo }) => {
  const [partnerPhoneNum, setPartnerPhoneNum] = useState("+1");
  const { availableChallenge } = useChallengeData();

  return (
    <>
      <Helmet>
        <title>Join Chosn | Relationship Goals Made Easy</title>
        <meta
          name="description"
          content="Chosn will help you become the best version of yourself. Joining Chosn empowers you with behavioral science for your most important relationships."
        />
      </Helmet>
      <div className="inviteContainer">
        <Form>
          <Form.Field>
            <h3 className="font inviteType">{type}</h3>
            <p className="challengeDescriptionText">
              {availableChallenge?.description}
            </p>
            {!solo ? (
              <>
                <h3 className="font mobileNumLabel">Mobile Number</h3>
                <PhoneInput
                  country={"us"}
                  value={partnerPhoneNum}
                  onChange={(phone) => {
                    setPartnerPhoneNum(phone);
                  }}
                  enableSearch
                  inputClass="mobileInput"
                  inputStyle={{ paddingLeft: "64px" }}
                />
              </>
            ) : null}
          </Form.Field>
        </Form>
        <div className="inviteBtnContainer">
          <Button
            className="inviteBtn"
            onClick={() => onClick(partnerPhoneNum, solo)}
          >
            {solo ? "Confirm" : "Invite"}
          </Button>
        </div>
      </div>
    </>
  );
};
