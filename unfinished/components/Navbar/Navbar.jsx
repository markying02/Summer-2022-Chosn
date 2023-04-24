import React, { useState } from "react";
import logo from "../../assets/logo.svg";
// import close from "../../assets/close.svg";
import { useAuth } from "../../providers/AuthProvider";
// import { Row, Col } from "react-bootstrap";
import { Auth } from "aws-amplify";
import "./Navbar.css";
import {Link } from "react-router-dom";

import HamburgerMenu from "./../../assets/HamburgerMenu.svg"
import circleX from "./../../assets/circleX.svg"
import headerShapes from "./../../assets/HeaderShapes.svg"
import {isMobile} from "react-device-detect";







// const classNameNotOpen = "navbarUserDetails";
// const classNameOpen = "navbarUserDetails navbarUserDetailsOpen";

export const Navbar = () => {
  const { userData } = useAuth();
  const [open, setOpen] = useState(false);


  const getUserImage = (userData) => {
    if (userData) {
      return (
        <img
          src={
            "https://ui-avatars.com/api/?&name=" +
            userData.attributes.given_name +
            "&length=" +
            userData.attributes.given_name.split(" ").length
          }
          alt="John Doe"
          className="navbarUserImage"
        />
      );
      } else {
        return (null)};      
  };


  return (isMobile)? (
    <div className="overallHeaderContainer">
      <div className="headerContentContainer">
      
        <div className="logoContainer">
          <div className="logo-circle">
            <Link onClick={() => {window.location.href="/"}}> 
              <img
                src={logo}
                alt="Chosn"
                style={{
                  width: "70px",
                  height: "69px",
                  margin: "0 3px 0 0px",
                }}
              />
            </Link>
          </div>
        </div>

        

          {userData ? (
          <div className="loggedInRightSideContainer">
            {getUserImage(userData)}

          
          {open ? (
            <img classname="openClose" src={circleX} alt= "X"
            style={{
              width: "40px",
              marginLeft: "15px",
            }}
            onClick={() => {
              setOpen(false);
            }}
            />
          ) : <img classname="openClose" src={HamburgerMenu} alt= "lines"
          style={{
            width: "40px",
            marginLeft: "15px",
          }}
          onClick={() => {
            setOpen(true);
          }}
          />}
        </div>
      
        ) : (
          <div className="loggedOutRightSideContainer">
            <Link className="signInButton"
              onClick={() => {window.location.href="/signin"}} > 
              
              Sign In 
            </Link>
            
            
            <Link className="signUpButton"
              onClick={() => {window.location.href="/register"}} > 
              
              Sign Up 
            </Link>
          </div>
        )}
      </div>

      {open ? (
        <div className="overall-menu-container">
          <div style={{
            float:"right",
            textAlign:"right",
            color:"white",
            marginRight:"30px",
            marginBottom:"32px",
            borderRadius:"0 0 20px 0",
          }}>
            <b>
              <div classname="dropdown-menu">
                <h1 classname="menu-title">Menu</h1>
                
                <p classname="dropdown-links">
                    <Link classname="dropdown-links" 
                    onClick={() => {window.location.href="/mydashboard"}}
                    style={{
                      color:"white",
                    }} >
                      Your Dashboard 
                    </Link>
                </p>

                <p classname="dropdown-links">Your account </p>
                <p classname="dropdown-links"> Weekly Nudges</p>
                <p classname="dropdown-links">Your Connections</p>
                <p classname="dropdown-links">Your Friendship Goals</p>
                <p classname="dropdown-links">Your Challenges</p>
                <p
                  onClick={() => {
                    Auth.signOut().then(() => {
                      window.location.href = "/";
                    });
                  }}
                >
                  Logout
                </p>
              </div>
            </b>
          </div>
        </div>) :
        (null)}
    </div>



  ) : (
    <div className="overallHeaderContainer">
      <div className="headerContentContainer">
      
        <div className="logoContainer">
          <div className="logo-circle">
            <Link onClick={() => {window.location.href="/"}}> 
              <img
                src={logo}
                alt="Chosn"
                style={{
                  width: "70px",
                  height: "69px",
                  margin: "0 3px 0 0px",
                }}
              />
            </Link>
          </div>
        </div>

        
                
          {userData ? (
          <div className="desktopRightSideContainer">
            
            
            
            <p className="desktopAdditionalLinks"> About </p>

            <p className="desktopAdditionalLinks"> Contact </p>

            <p className="desktopAdditionalLinks"> Pricing </p>

            {getUserImage(userData)}

          
          {open ? (
            <img classname="openClose" src={circleX} alt= "X"
            style={{
              width: "40px",
              marginLeft: "15px",
            }}
            onClick={() => {
              setOpen(false);
            }}
            />
          ) : <img classname="openClose" src={HamburgerMenu} alt= "lines"
          style={{
            width: "40px",
            marginLeft: "15px",
          }}
          onClick={() => {
            setOpen(true);
          }}
          />}
        </div>
      
        ) : (
          <div className="desktopRightSideContainer">
            
            
            
            <p className="desktopAdditionalLinks"> About </p>

            <p className="desktopAdditionalLinks"> Contact </p>

            <p className="desktopAdditionalLinks"> Pricing </p>


            <Link className="signInButton"
              onClick={() => {window.location.href="/signin"}} > 
              
              Sign In 
            </Link>
            
            
            <Link className="signUpButton"
              onClick={() => {window.location.href="/register"}} > 
              
              Sign Up 
            </Link>
          </div>
        )}
      </div>

      {open ? (
        <div className="overall-menu-container">
          <div style={{
            float:"right",
            textAlign:"right",
            color:"white",
            marginRight:"30px",
            marginBottom:"32px",
            borderRadius:"0 0 20px 0",
            background:"#250041",
          }}>
            <b>
              <div classname="dropdown-menu">
                <h1 classname="menu-title">Menu</h1>
                
                <p classname="dropdown-links">
                    <Link classname="dropdown-links" 
                    onClick={() => {window.location.href="/mydashboard"}}
                    style={{
                      color:"white",
                    }} >
                      Your Dashboard 
                    </Link>
                </p>
                
                <p classname="dropdown-links">Your account </p>
                <p classname="dropdown-links"> Weekly Nudges</p>
                <p classname="dropdown-links">Your Connections</p>
                <p classname="dropdown-links">Your Friendship Goals</p>
                <p classname="dropdown-links">Your Challenges</p>
                <p
                  onClick={() => {
                    Auth.signOut().then(() => {
                      window.location.href = "/";
                    });
                  }}
                >
                  Logout
                </p>
              </div>
            </b>
          </div>
        </div>) :
        (null)}
      {window.location.pathname !== '/' ? (
        <img
          src={headerShapes}
          alt="Styling"
          style={{
            width: "100%",
          }}
      />) : (null)}
      
      
    </div>



  )
    
};
