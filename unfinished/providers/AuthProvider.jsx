import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { Auth } from "aws-amplify";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [authState, setAuthState] = useState(false);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [cognitoUser, setCognitoUser] = useState();

  useEffect(() => {
    async function fetchUser() {
      Auth.currentAuthenticatedUser()
        .then((user) => {
          console.log("User is authenticated");
          console.log(user);
          setUserData(user);
          setAuthState(true);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    fetchUser();
  }, []);

  const login = async (phoneNumber) => {
    return await Auth.signIn(phoneNumber);
  };

  const resendConfirmationCode = async (phoneNumber) => {
    return await Auth.resendSignUp(phoneNumber);
  };

  const signup = (name, email, phoneNumber, password) => {
    return Auth.signUp({
      username: phoneNumber,
      password: password,
      attributes: {
        given_name: name,
        email: email,
        phone_number: phoneNumber,
      },
    });
  };

  const verifyCode = useCallback(
    async (code, isSignUp, username, password) => {
      let user = undefined;
      if (isSignUp) {
        const isSuccess = await Auth.confirmSignUp(username, code);
        if (isSuccess === "SUCCESS") {
          user = await Auth.signIn(username, password);
        }
      } else {
        user = await Auth.sendCustomChallengeAnswer(cognitoUser, code);
      }
      if (user && user.authenticationFlowType === "USER_SRP_AUTH") {
        console.log("User has been authenticated.");
        console.log(user);
        setAuthState(true);
        setUserData(user);
        return true;
      } else {
        return false;
      }
    },
    [cognitoUser]
  );

  const values = useMemo(
    () => ({
      authState,
      userData,
      loading,
      cognitoUser,

      setAuthState,
      login,
      signup,
      resendConfirmationCode,
      verifyCode,

      setCognitoUser,
    }),
    [authState, userData, cognitoUser, loading, verifyCode]
  );

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider component.");
  }

  return context;
};
