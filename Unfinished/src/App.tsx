import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { SignUp } from "./components/SignUp/SignUp";
import { SignIn } from "./components/SignIn/SignIn";
import { OneTimeCode } from "./components/OneTimeCode/OneTimeCode";
import { Onboarding } from "./components/Onboarding/Onboarding";
import { Landing, DefaultSteps } from "./components/Landing/Landing";
import { Tutorial } from "./components/Tutorial/Tutorial";
import { GoalDashboard } from "./components/GoalDashboard/GoalDashboard";
import { useAuth } from "./providers/AuthProvider";
import { RelationshipType } from "./components/RelationType/RelationshipType";
import { SelectGoals } from "./components/SelectGoals/SelectGoals";
import { FinishedGoal } from "./components/FinishedGoal/FinishedGoal";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { DailyActivity } from "./components/Challenge/Activities/DailyActivity";
import { TermsConditions } from "./components/Legal/TermsConditions";
import { ChallengeOverview } from "./components/Challenge/ChallengeOverview";
import { PreRegister } from "./components/Challenge/PreRegister";
import { useChallengeData } from "./providers/ChallengeProvider";

Amplify.configure(awsconfig);

const App = () => {
  const { authState } = useAuth();
  const { challenges } = useChallengeData();

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/mycode" component={OneTimeCode} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/register" component={() => <SignUp />} />
          <Route exact path="/termsandconditions" component={TermsConditions} />
          <Route
            exact
            path="/"
            component={() => (
              <Landing
                title={"Chosn - Better Relationships by Design"}
                description={
                  "We help individuals pursue their relationship goals with the most important people in your life."
                }
                signUpBtnText={"Lets Go!"}
                steps={DefaultSteps}
                metaTitle={
                  "Chosn Relationship App | Relationship Goals Made Easy"
                }
                metaDescription={
                  "Chosn is a Relationship App that uses behavioral science to deepen and enrich your existing relationships. Relationship Goals made easy."
                }
              />
            )}
          />
          <Route
            exact
            path="/getmygoals"
            component={() => (
              <Landing
                title={"Chosn - Relationships Goals"}
                description={
                  "Every month we will asses your relationship goals, and we will send nudges to help you along the way."
                }
                signUpBtnText={"Get My Goals"}
                steps={DefaultSteps}
                metaTitle={
                  "Get your Relationship Goals | Be the best version of yourself"
                }
                metaDescription={
                  "Becoming the best version of yourself starts with setting goals. Get all your Relationship Goals needs met with the Chosn Relationship App."
                }
              />
            )}
          />

          {challenges &&
            challenges.map((item: any) => {
              const pageData = item.page;
              return (
                <Route
                  exact
                  path={`/${pageData.preRegisterUrl}`}
                  component={() => (
                    <Landing
                      title={pageData.title}
                      description={pageData.description}
                      signUpBtnText={pageData.primaryButtonText}
                      steps={pageData.steps}
                      metaTitle={pageData.metaTitle}
                      metaDescription={pageData.metaDescription}
                    />
                  )}
                />
              );
            })}

          {authState ? (
            <>
              <Route exact path="/welcome" component={GoalDashboard} />
              <Route exact path="/tutorial" component={Tutorial} />
              <Route exact path="/identity" component={Onboarding} />
              <Route exact path="/goaltype" component={RelationshipType} />
              <Route exact path="/choosegoals" component={SelectGoals} />
              <Route exact path="/mygoals" component={FinishedGoal} />
              <Route exact path="/mydashboard" component={Dashboard} />
              <Route
                exact
                path="/challengeoverview"
                component={ChallengeOverview}
              />
              <Route exact path="/registerchallenge" component={PreRegister} />
              <Route exact path="/dailyactivity" component={DailyActivity} />
            </>
          ) : null}
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;

// class AppOld extends Component<{}, AppState> {
//   // Set current authenticated user when component mounts to always keep track of current user
//   componentDidMount() {
//     Auth.currentAuthenticatedUser().then((user) => {
//       console.log(user);
//       this.setState({ phoneNum: user.username });
//     });
//   }

//   getNum = (num: string) => {
//     this.setState({
//       phoneNum: num,
//     });
//   };

//   getUser = (user: any) => {
//     this.setState({
//       user: user,
//     });
//   };

//   getSession = (session: any) => {
//     this.setState({
//       session: session,
//     });
//   };

//   setGoal = (goal: string, idx: number) => {
//     const newGoals = this.state.goals.slice();
//     newGoals[idx] = goal;

//     this.setState({ goals: newGoals });
//   };

//   setGoalCount = (idx: number) => {
//     this.setState({
//       goalCount: idx,
//     });
//   };

//   setGoalColor = (idx: number) => {
//     this.setState({
//       goalColor: idx,
//     });
//   };

//   setGoalArray = (goalColors: Array<string>) => {
//     this.setState({
//       colors: goalColors,
//     });
//   };

//   handleDoneClicked = () => {
//     this.setState({
//       doneClicked: true,
//     });
//   };

//   setSelectedGoal = (goal: string) => {
//     this.setState({
//       selectedGoal: goal,
//     });
//   };

//   makeRequest = async (relationshipType:string) => {
//     const goals = { goal1: this.state.goals[0], goal2: this.state.goals[1], goal3: this.state.goals[2], relationshipType: relationshipType, thirtyDaysTextSent: false };
//     const allGoals = await (API.graphql({ query: listGoalss }) as Promise<JSON>);
//     const allGoalsJson = JSON.parse(JSON.stringify(allGoals));

//     await allGoalsJson.data.listGoalss.items.forEach(async (item: any) => {
//       await API.graphql({ query: deleteGoals, variables: {input: {id: item.id}}});
//     });

//     await API.graphql(graphqlOperation(createGoals, {input: goals}));
//   };
// }

// export default App;
