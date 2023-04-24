import React from "react";
import {isMobile} from "react-device-detect";
import {Link } from "react-router-dom";
import "./Footer.css";
import facebook from "./../../assets/facebook.svg";
import twitter from "./../../assets/twitter.svg";
import instagram from "./../../assets/instagram.svg";

function Footer() {
    return (isMobile)? (
        /* Mobile code */

        <div className="footerBackground">
            <div className="mobileFooterBody1">

                <hr
                    style={{
                    background: 'black',
                    color: 'black',
                    borderColor: 'black',
                    height: '2px',
                    width: '100%',
                    }}
                />
                <div className="mobileFooterBody2">
                    <div className = "mobileFooterLeftBox">
                        <div className="boldedText">
                            Useful Links
                        </div>
                        Pricing
                        <br></br>
                        FAQ's
                    </div>

                    <div className = "mobileFooterRightBox">
                    <div className="boldedText">
                            Chosn
                        </div>
                        About
                        <br></br>
                        Values
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>

                    <hr
                        style={{
                        background: 'black',
                        color: 'black',
                        borderColor: 'black',
                        height: '2px',
                        width: '100%',
                        }}
                    />


                    <div className="logosContainer">
                        <div classname="socialMediaLogos">
                            <a href="https://www.facebook.com/chosnapp" target="_blank" rel="noreferrer">
                                <img classname = "socialMediaLogos" src={facebook} alt="facebook" />
                            </a>
                        </div>
                        
                        <div classname="socialMediaLogos">
                            <a href="https://twitter.com/chosnapp" target="_blank" rel="noreferrer"> 
                                <img classname = "socialMediaLogos" src={twitter} alt="twitter" />
                            </a>
                        </div>

                        <div classname="socialMediaLogos">
                            <a href="https://www.instagram.com/chosnapp/?hl=en" target="_blank" rel="noreferrer"> 
                                <img classname = "socialMediaLogos" src={instagram} alt="instagram" />
                            </a>
                        </div>
                    </div>

                    
                </div>

                <br></br>
                <br></br>

                © Karyo Realtionship Lab   |   Sitemap   |   Legal Notice

                <br></br>
                <br></br>

                <Link className = "linkText"  onClick={() => {window.location.href="/termsandconditions"}}> Terms of Service </Link>  |   Privacy Policy
                    
                
            </div>
            <br></br>
        </div>


       ) : (


       /* Desktop code */

        <div className="footerBackground">
            <div className="footerBody">

                <hr
                    style={{
                    background: 'black',
                    color: 'black',
                    borderColor: 'black',
                    height: '2px',
                    width: '100%',
                    }}
                />
                <div className="footerBody">
                    <div className = "footerLeftBox">
                        <div className="boldedText">
                            Useful Links
                        </div>
                        Pricing
                        <br></br>
                        FAQ's
                    </div>

                    <div className = "footerRightBox">
                    <div className="boldedText">
                            Chosn
                        </div>
                        About
                        <br></br>
                        Values
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="logosContainer">
                        <div classname="socialMediaLogos">
                            <a href="https://www.facebook.com/chosnapp" target="_blank" rel="noreferrer">
                                <img classname = "socialMediaLogos" src={facebook} alt="facebook" />
                            </a>
                        </div>
                        
                        <div classname="socialMediaLogos">
                            <a href="https://twitter.com/chosnapp" target="_blank" rel="noreferrer"> 
                                <img classname = "socialMediaLogos" src={twitter} alt="twitter" />
                            </a>
                        </div>

                        <div classname="socialMediaLogos">
                            <a href="https://www.instagram.com/chosnapp/?hl=en" target="_blank" rel="noreferrer"> 
                                <img classname = "socialMediaLogos" src={instagram} alt="instagram" />
                            </a>
                        </div>
                    </div>

                    
                </div>

                <br></br>
                <div className = "footerLeftBox">

                    © Karyo Realtionship Lab   |   Sitemap   |   Legal Notice
                </div>

                <div className = "footerRightBox">
                <Link className = "linkText"  onClick={() => {window.location.href="/termsandconditions"}}> Terms of Service </Link>  |   Privacy Policy
                    
                </div>
            </div>
        </div>
       
   );
}

export default Footer;