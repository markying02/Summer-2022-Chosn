import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  useCallback,
} from "react";
import {
  familyGoals,
  romanticGoals,
  personalGoals,
  friendGoals,
} from "./Goals";
import { API, graphqlOperation } from "aws-amplify";
import { listGoalss, listNudges } from "../graphql/queries";
import { createGoals, deleteGoals } from "../graphql/mutations";
import { useAuth } from "./AuthProvider";

export const GoalContext = createContext();

export const GoalProvider = (props) => {
  const [relationship, setRelationship] = useState();
  const [goals, setGoals] = useState([]);
  const [identity, setIdentity] = useState("");
  const [fromSignUp, setFromSignUp] = useState(false);
  const { userData } = useAuth();

  const getAvailableGoals = useCallback(() => {
    if (relationship === "family") {
      return familyGoals;
    }
    if (relationship === "self") {
      return personalGoals;
    }
    if (relationship === "romantic") {
      return romanticGoals;
    }
    return friendGoals;
  }, [relationship]);

  const updateGoals = useCallback(async () => {
    if (goals.length < 3) return;
    const data = {
      goal1: goals[0],
      goal2: goals[1],
      goal3: goals[2],
      relationshipType: relationship,
      thirtyDaysTextSent: false,
      identity: identity,
      name: userData?.attributes?.given_name,
      welcome: fromSignUp,
    };
    const allGoals = await API.graphql({ query: listGoalss });
    console.log(allGoals);
    const allGoalsJson = JSON.parse(JSON.stringify(allGoals));

    let ident = null;

    await allGoalsJson.data.listGoalss.items.forEach(async (item) => {
      ident = item.identity;
      await API.graphql({
        query: deleteGoals,
        variables: { input: { id: item.id } },
      });
    });

    if (ident !== null) {
      data.identity = ident;
    }

    if (!data.identity) {
      window.location.href = "/identity";
    }

    console.log(data);

    await API.graphql(graphqlOperation(createGoals, { input: data }));
  }, [relationship, goals, identity, fromSignUp, userData]);

  const queryNudges = useCallback(async () => {
    const nudges = await API.graphql({ query: listNudges });
    console.log(nudges);
  }, []);

  const values = useMemo(
    () => ({
      relationship,
      goals,
      identity,
      fromSignUp,
      setRelationship,
      setGoals,
      getAvailableGoals,
      updateGoals,
      queryNudges,
      setIdentity,
      setFromSignUp,
    }),
    [
      relationship,
      goals,
      identity,
      fromSignUp,
      getAvailableGoals,
      updateGoals,
      queryNudges,
    ]
  );

  return (
    <GoalContext.Provider value={values}>{props.children}</GoalContext.Provider>
  );
};

export const useGoals = () => {
  const context = useContext(GoalContext);

  if (context === undefined) {
    throw new Error("useGoals must be used within a GoalProvider component.");
  }

  return context;
};
