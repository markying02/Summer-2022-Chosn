import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "semantic-ui-css/semantic.min.css";
import { AuthProvider } from "./providers/AuthProvider";
import { GoalProvider } from "./providers/GoalProvider";
import { HelmetProvider } from "react-helmet-async";
import { ChallengeProvider } from "./providers/ChallengeProvider";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import Footer from "./components/Footer/Footer.jsx";
import {BrowserRouter} from 'react-router-dom';
import {Navbar} from "./components/Navbar/Navbar.jsx"


dayjs.extend(utc);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <GoalProvider>
          <ChallengeProvider>
            <BrowserRouter>  
              <Navbar />
              <App />
              <Footer />
            </BrowserRouter>
          </ChallengeProvider>
        </GoalProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
