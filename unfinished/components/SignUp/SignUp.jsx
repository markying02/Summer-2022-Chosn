import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import "./SignUp.css";
import { useAuth } from "../../providers/AuthProvider";
import { Redirect, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import alert from "../../assets/alert.svg";
import template from '././../../assets/SignUpBackground.svg';
import progressBar from '././../../assets/progressBar.png';
import mobileProgressBar from '././../../assets/mobileProgressBar.svg';


import {isMobile} from "react-device-detect";




export const SignUp = () => {
  const [password] = useState(Math.random().toString(24) + "Abc#");
  const [name, setName] = useState("");
  const [email, setEmail] = useState();
  const [redirect, setRedirect] = useState(false);
  const [phoneNum, setPhoneNumber] = useState("+1");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const { signup } = useAuth();


  


  
  
  return (isMobile)? ( 
    /* Mobile */
    <div className="background">
      
      <div className="headerHolder"> 
          <div>
          <h1 className="font mobileSigninText"> 
                Create your account</h1>
          </div>
      </div>

      <div className="mobileContainer">

        <img src={mobileProgressBar} alt= "mobileprogressBar"/>
        <br></br>
        <br></br>
        <Form>
          <Form.Field>
            <h3 className="font mobileLoginLabel">Full Name</h3>
            <input
              placeholder="Jane Smtih"
              className="mobileLoginInput"
              value={name}
              onChange={(ev) => {
                setName(ev.target.value);
                setError("");
                setDisabled(false);
              }}
            />
          </Form.Field>
          <Form.Field>
            <h3 className="font mobileLoginLabel">Email</h3>
            <input
              placeholder="Email"
              className="mobileLoginInput"
              value={email}
              onChange={(ev) => {
                setEmail(ev.target.value);
                setError("");
                setDisabled(false);
              }}
            />
          </Form.Field>
          <Form.Field>
            <h3 className="font mobileLoginLabel">Phone Number</h3>
            <PhoneInput
              country={"us"}
              value={phoneNum}
              onChange={(phone) => {
                setPhoneNumber(phone);
                setError("");
                setDisabled(false);
              }}
              enableSearch
              inputClass="mobilePhoneInput"
              inputStyle={{ paddingLeft: "64px" }}
            />
          </Form.Field>
        </Form>
        <br></br>
        <br></br>
        <p className="mobileSmsMessage">
          A SMS code will be sent to this mobile number. Please input the code
          on the next page.
        </p>
        {error ? (
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
              <p className="mobile-signin-error">{error}</p>
            </div>
          </>
          ) : (
            <div className="terms">
            <p className="mobile-terms-text">By continuing, you agree to our <Link className="mobile-terms-link" to="/termsandconditions">
              {" "}
              terms and conditions.
            </Link></p>
            
          </div>
        )}
        <br></br>
        <br></br>
        <br></br>

        <Link to="/" className="btn mobileBackBtn" > Back </Link>
        <Button 
          className={disabled ? "form-submit-btn-disabled" : "formSubmitBtn"}
          onClick={() => {
            const phoneNumber = "+" + phoneNum;
            if (name === "") {
              setError("Please enter your full name.");
              setDisabled(true);
              return;
            }
            signup(name, email, phoneNumber, password)
              .then((res) => {
                if (res.user) {
                  setRedirect(true);
                }
              })
              .catch((err) => {
                setError("This user already exists.");
                setDisabled(true);
              });
          }}
        >
          Next
        </Button>
          </div>
      </div>

    ) : (
        
        /* Desktop */ 
        <div className="background">
        <Helmet>
          <title>Join Chosn | Relationship Goals Made Easy</title>
          <meta
            name="description"
            content="Chosn will help you become the best version of yourself. Joining Chosn empowers you with behavioral science for your most important relationships."
          />
        </Helmet>
  
  
  
       
        <div className="bigBox">
          <div className="imgContainer">
            <img class="template" src={template} alt= "template"/>
          </div>
          <div className="leftBox">
            <div className="leftBox">
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <img src={progressBar} alt= "progressBar"/>
              {redirect ? (
                <Redirect
                  to={{
                    pathname: "/mycode",
                    state: {
                      phoneNumber: "+" + phoneNum,
                      isSignUp: true,
                      password: password,
                    },
                  }}
                />
              ) : null}
  
              <h1 className="font signinText">  Create your account</h1>
              <Form className = "newForm">
                <Form.Field>
                  <h3 className="font loginLabel">Full Name</h3>
                  <input
                    placeholder="Jane Smtih"
                    className="formLoginInput"
                    value={name}
                    onChange={(ev) => {
                      setName(ev.target.value);
                      setError("");
                      setDisabled(false);
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <h3 className="font loginLabel">Email</h3>
                  <input
                    placeholder="Email"
                    className="formLoginInput"
                    value={email}
                    onChange={(ev) => {
                      setEmail(ev.target.value);
                      setError("");
                      setDisabled(false);
                    }}
                  />
                </Form.Field>
                <Form.Field>
                  <h3 className="font loginLabel">Phone Number</h3>
                  <PhoneInput
                    country={"us"}
                    value={phoneNum}
                    onChange={(phone) => {
                      setPhoneNumber(phone);
                      setError("");
                      setDisabled(false);
                    }}
                    enableSearch
                    inputClass="phoneInput"
                    inputStyle={{ paddingLeft: "64px" }}
                  />
                </Form.Field>
              </Form>
  
  
  
              <p className="smsMessage">
                A SMS code will be sent to this mobile number. Please input the code
                on the next page.
              </p>
  
  
              {error ? (
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
               ) : (
                <div className="terms">
                <p className="terms-text">By continuing, you agree to our <Link className="terms-link" to="/termsandconditions">
                  {" "}
                  terms and conditions.
                </Link></p>
                
              </div>
              )}

              <br></br>
              <br></br>
              <br></br>
  
              <Link to="/" className="btn backBtn" > Back </Link>
              
  
              <Button 
                className={disabled ? "form-submit-btn-disabled" : "formSubmitBtn"}
                onClick={() => {
                  const phoneNumber = "+" + phoneNum;
                  if (name === "") {
                    setError("Please enter your full name.");
                    setDisabled(true);
                    return;
                  }
                  signup(name, email, phoneNumber, password)
                    .then((res) => {
                      if (res.user) {
                        setRedirect(true);
                      }
                    })
                    .catch((err) => {
                      setError("This user already exists.");
                      setDisabled(true);
                    });
                }}
              >
                Next
              </Button>
          </div>
        </div>
      </div>     
    </div>


        
  );
};