import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import "./SignIn.css";
import { useAuth } from "../../providers/AuthProvider";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import alert from "../../assets/alert.svg";

export const SignIn = () => {
  const [phoneNum, setPhoneNumber] = useState("+1");
  const [redirect, setRedirect] = useState(false);
  const { login, setCognitoUser, resendConfirmationCode } = useAuth();
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);

  const submit = () => {
    const phoneNumber = "+" + phoneNum;
    login(phoneNumber)
      .then((res) => {
        setCognitoUser(res);
        setRedirect(true);
      })
      .catch((err) => {
        if (err.message === "User is not confirmed.") {
          resendConfirmationCode(phoneNumber).then((res) => {
            setCognitoUser(res);
            setRedirect(true);
          });
        } else {
          setError("Invalid phone number.");
          setDisabled(true);
        }
      });
  };

  return (
    <div className="login-container">
      <Helmet>
        <title>
          Welcome back to the Chosn App | Relationship Goals Made Easy
        </title>
        <meta
          name="description"
          content="Welcome back to Chosn Relationship App where you can enrich your most important relationships. We make your relationship goals easy."
        />
      </Helmet>
      <div className="login-form-container">
        {redirect ? (
          <Redirect
            to={{
              pathname: "/mycode",
              state: {
                phoneNumber: "+" + phoneNum,
                isSignUp: false,
                password: null,
              },
            }}
          />
        ) : null}
        <h1 className="font signinText">Sign In</h1>
        <Form>
          <Form.Field>
            <h3 className="font loginLabel">Mobile Number</h3>
            <PhoneInput
              country={"us"}
              value={phoneNum}
              onChange={(phone) => {
                setPhoneNumber(phone);
                setError("");
                setDisabled(false);
              }}
              enableSearch
              inputClass="mobileInput"
              inputStyle={{ paddingLeft: "64px" }}
            />
          </Form.Field>
        </Form>
        <p className="smsMessage font">
          A SMS code will be sent to this mobile number. Please input the code
          on the next page.
        </p>
        {error && (
          <>
            <div className="error-container">
              <div className="error-circle">
                <img
                  src={alert}
                  alt="Warning"
                  style={{
                    width: "14px",
                    height: "14px",
                    margin: "0px 0px 1px 0px",
                  }}
                ></img>
              </div>
              <p className="signin-error">{error}</p>
            </div>
          </>
        )}
        <Button
          className={disabled ? "submit-btn-disabled" : "submitBtn"}
          onClick={() => {
            submit();
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
