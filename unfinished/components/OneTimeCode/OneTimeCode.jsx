import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Redirect } from "react-router-dom";
import { Button, Input } from "semantic-ui-react";
import { useAuth } from "../../providers/AuthProvider";
import { useGoals } from "../../providers/GoalProvider";
import "./OneTimeCode.css";
import alert from "../../assets/alert.svg";

export const OneTimeCode = (props) => {
  const { verifyCode } = useAuth();

  const inputOne = useRef();
  const inputTwo = useRef();
  const inputThree = useRef();
  const inputFour = useRef();
  const inputFive = useRef();
  const inputSix = useRef();
  const [redirect, setRedirect] = useState();
  const { setFromSignUp } = useGoals();
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleKeyDown = (event) => {
    const refArr = [
      inputOne,
      inputTwo,
      inputThree,
      inputFour,
      inputFive,
      inputSix,
    ];
    refArr.forEach((item, index) => {
      if (document.activeElement === item.current.inputRef.current) {
        if (!String.fromCharCode(event.keyCode).match(/(\w|\s)/g)) {
          if (index - 1 < 0) return;
          console.log(index);
          refArr[index].current.focus();
          return;
        }

        if (item.current.inputRef.current.value.length === 1) {
          if (index !== 5) {
            refArr[index + 1].current.focus();
          }
        }
      }
    });
  };

  const getCode = () => {
    const refArr = [
      inputOne,
      inputTwo,
      inputThree,
      inputFour,
      inputFive,
      inputSix,
    ];
    var code = "";
    refArr.forEach((item) => {
      code += item.current.inputRef.current.value;
    });
    return code;
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const onInputChange = (inputNum, val) => {
    const refArr = [
      inputOne,
      inputTwo,
      inputThree,
      inputFour,
      inputFive,
      inputSix,
    ];
    if (val.length === 1) {
      if (inputNum === 5) {
        return;
      }
      refArr[inputNum + 1].current.focus();
    } else {
      if (inputNum === 0) return;
      refArr[inputNum - 1].current.focus();
    }
  };

  return (
    <div className="onetimecode-container">
      {redirect ? <Redirect to={redirect} /> : null}
      <Helmet>
        <title>One Time Password | Chosn Relationship Enrichment</title>
        <meta
          name="description"
          content="Welcome to Chosn Relationship App where you can enrich your most important relationships. We make your relationship goals easy."
        />
      </Helmet>
      <div className="onetimecode-form-container">
        <h1 className="font oneTimeCodeText">Enter one time code</h1>
        <div>
          <Input
            placeholder="0"
            className="numberInput"
            maxLength="1"
            pattern="[0-9]*"
            inputmode="numeric"
            focus
            onChange={(e) => {
              onInputChange(0, e.target.value);
            }}
            ref={inputOne}
          />
          <Input
            placeholder="0"
            className="numberInput"
            maxLength="1"
            pattern="[0-9]*"
            inputmode="numeric"
            onChange={(e) => {
              onInputChange(1, e.target.value);
            }}
            ref={inputTwo}
          />
          <Input
            placeholder="0"
            className="numberInput"
            maxLength="1"
            pattern="[0-9]*"
            inputmode="numeric"
            onChange={(e) => {
              onInputChange(2, e.target.value);
            }}
            ref={inputThree}
          />
          <Input
            placeholder="0"
            className="numberInput"
            maxLength="1"
            pattern="[0-9]*"
            inputmode="numeric"
            onChange={(e) => {
              onInputChange(3, e.target.value);
            }}
            ref={inputFour}
          />
          <Input
            placeholder="0"
            className="numberInput"
            maxLength="1"
            pattern="[0-9]*"
            inputmode="numeric"
            onChange={(e) => {
              onInputChange(4, e.target.value);
            }}
            ref={inputFive}
          />
          <Input
            placeholder="0"
            className="numberInput"
            maxLength="1"
            pattern="[0-9]*"
            inputmode="numeric"
            onChange={(e) => {
              onInputChange(5, e.target.value);
              setError("");
              setDisabled(false);
            }}
            ref={inputSix}
          />
        </div>
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
              <p className="code-error">{error}</p>
            </div>
          </>
        )}
        <Button
          className={disabled ? "submit-btn-disabled" : "submitBtn"}
          loading={loading}
          onClick={async () => {
            setLoading(true);
            const phoneNumber = props.history.location.state.phoneNumber;
            const isSignUp = props.history.location.state.isSignUp;
            const password = props.history.location.state.password;
            const code = getCode();
            verifyCode(code, isSignUp, phoneNumber, password)
              .then((res) => {
                if (res) {
                  if (isSignUp) {
                    setFromSignUp(true);
                    setRedirect("/identity");
                    setLoading(false);
                  } else {
                    setRedirect("/mydashboard");
                    setLoading(false);
                  }
                }
              })
              .catch((err) => {
                setError("Invalid code, please try again.");
                setDisabled(true);
                setLoading(false);
              });
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
