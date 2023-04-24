import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listChallengeUserDatas } from "../graphql/queries";
import {
  createChallengeUserData,
  deleteChallengeUserData,
  updateChallengeUserData,
} from "../graphql/mutations";
import { useAuth } from "./AuthProvider";
import dayjs from "dayjs";

export const ChallengeContext = createContext();

export const ChallengeProvider = (props) => {
  const [challenges, setChallenges] = useState();
  const [challengeUserData, setChallengeUserData] = useState([]);
  const [availableChallenge, setAvailableChallenge] = useState();
  const { userData, authState } = useAuth();

  const getChallenges = useCallback(() => {
    return API.get("chosnRestApi", "/challenges");
  }, []);

  const getChallengeUserData = useCallback(() => {
    return API.graphql({ query: listChallengeUserDatas });
  }, []);

  const createChallengeData = useCallback((data) => {
    return API.graphql(
      graphqlOperation(createChallengeUserData, { input: data })
    );
  }, []);

  const deleteChallengeData = useCallback((data) => {
    return API.graphql(
      graphqlOperation(deleteChallengeUserData, { input: data })
    );
  }, []);

  const hasAvailableChallengeStarted = useCallback(() => {
    const userDate = dayjs.utc();
    const startTime = dayjs(availableChallenge?.startDate);
    return userDate.isSameOrAfter(startTime);
  }, [availableChallenge?.startDate]);

  const hasAvailableChallengeEnded = useCallback(() => {
    const userDate = dayjs.utc();
    const daysFromChallengeEndDate = userDate.diff(
      availableChallenge?.endDate,
      "day"
    );
    return daysFromChallengeEndDate >= 30;
  }, [availableChallenge?.endDate]);

  const getMaxDaysUserCanSee = useCallback((challengeUserDataObject) => {
    const userTime = dayjs.utc();
    const startDate = dayjs(challengeUserDataObject.startDate);
    return userTime.diff(startDate, "day");
  }, []);

  const acceptChallengeUserData = useCallback(
    async (challengeUserDataObject) => {
      const res = challengeUserData.filter((data) => {
        return data.owner === userData.username || data.partnerAccept;
      });

      if (res.length >= 2) {
        alert("You already have 2 challenges started.");
        return;
      }

      const data = {
        id: challengeUserDataObject.id,
        partnerName: userData?.attributes?.given_name,
        partnerAccept: true,
      };

      await API.graphql(
        graphqlOperation(updateChallengeUserData, { input: data })
      );

      getChallengeUserData().then((res) => {
        setChallengeUserData(res.data.listChallengeUserDatas.items);
      });
    },
    [
      getChallengeUserData,
      userData?.attributes?.given_name,
      challengeUserData,
      userData?.username,
    ]
  );

  const createResultForUserChallengeData = useCallback(
    async (challengeUserDataId, randomResults, dayId) => {
      return await getChallengeUserData().then(async (res) => {
        setChallengeUserData(res.data.listChallengeUserDatas.items);
        const challengeUserDataObject =
          res.data.listChallengeUserDatas.items.find(
            (data) => (data.id = challengeUserDataId)
          );

        if (challengeUserDataObject) {
          var results = challengeUserDataObject.results
            ? [...challengeUserDataObject.results]
            : [];
          randomResults.forEach((item) => {
            results.push({
              id: dayId,
              user: userData.username,
              results: '"' + item.result + '"',
            });
          });

          const data = {
            id: challengeUserDataId,
            results: results,
          };

          API.graphql(
            graphqlOperation(updateChallengeUserData, { input: data })
          ).then((res) => {
            getChallengeUserData().then((results) => {
              setChallengeUserData(results.data.listChallengeUserDatas.items);
            });
          });
        }
      });
    },
    [userData?.username, getChallengeUserData]
  );

  const submitUserChallenge = useCallback(
    async (partnerPhoneNum) => {
      let partners;

      if (partnerPhoneNum === userData.username) {
        alert("You can't invite yourself, silly.");
        return;
      }

      const existingPartners = challengeUserData.filter(
        (data) =>
          (data.partners.includes(`+${partnerPhoneNum}`) &&
            data.owner === userData.username) ||
          (data.partners.includes(userData.username) &&
            data.owner === `+${partnerPhoneNum}`)
      ).length;

      if (existingPartners > 0) {
        alert("You're already signed up with this user.");
        return;
      }

      if (partnerPhoneNum && partnerPhoneNum.length > 2) {
        partners = [`+${partnerPhoneNum}`];
      } else {
        partners = [];
      }

      const userTime = dayjs.utc();
      const challengeStartTime = dayjs(availableChallenge.startDate);
      const challengeEndTime = dayjs(availableChallenge.endDate);
      console.log(userTime);

      const startDate = userTime.isSameOrAfter(challengeStartTime)
        ? userTime.toISOString()
        : challengeStartTime.toISOString();
      const endDate = dayjs(startDate).add(availableChallenge.days.length);
      if (endDate.isAfter(challengeEndTime)) {
        return;
      }

      const data = {
        challenge: availableChallenge.id,
        partners: partners,
        ownerName: userData?.attributes?.given_name,
        partnerName: null,
        partnerAccept: false,
        startDate: startDate,
        results: [],
        endDate: endDate,
      };

      const response = await API.graphql(
        graphqlOperation(createChallengeUserData, { input: data })
      );

      if (authState) {
        getChallengeUserData().then((res) => {
          console.log(res);
          console.log(res.data.listChallengeUserDatas.items);
          setChallengeUserData(res.data.listChallengeUserDatas.items);
        });
      }
      console.log(response);
      const id = response.data.createChallengeUserData.id;
      if (partners.length > 0) {
        const body = {
          body: {
            challengeUserDataId: id,
            ownerName: userData?.attributes?.given_name,
            partnerNumber: partnerPhoneNum,
          },
        };

        const result = await API.post("chosnRestApi", "/partner/invite", body);
        console.log(result);
      }
    },
    [
      userData,
      availableChallenge,
      authState,
      getChallengeUserData,
      challengeUserData,
    ]
  );

  const getAvailableChallengeType = useCallback(
    (selectedChallenge) => {
      if (challengeUserData.length < 1) {
        return ["Solo", "Partnered"];
      } else {
        let userChallenges = challengeUserData.filter(
          (challenge) => challenge.challenge === selectedChallenge.id
        );
        if (!userChallenges.length) {
          return ["Solo", "Partnered"];
        } else {
          var array = ["Solo", "Partnered"];
          if (userChallenges.length >= 2) {
            array = [];
          } else {
            userChallenges.forEach((challenge) => {
              if (challenge.partners.length < 1) {
                array.shift();
              }
            });
          }
          return array;
        }
      }
    },
    [challengeUserData]
  );

  useEffect(() => {
    getChallenges().then((res) => {
      console.log(res);
      console.log(userData);
      setChallenges(res);
      const findAvailable = res.find((element) => {
        const userTime = dayjs.utc();
        const preRegistrationStartDate = dayjs(
          element.preRegistrationStartDate
        );
        const challengeEndTime = dayjs(element.endDate);
        const daysFromChallengeEndDate = userTime.diff(challengeEndTime, "day");
        return (
          userTime.isSameOrAfter(preRegistrationStartDate) &&
          daysFromChallengeEndDate <= 30
        );
      });
      setAvailableChallenge(findAvailable);
    });
    if (authState) {
      getChallengeUserData().then((res) => {
        console.log(res);
        console.log(res.data.listChallengeUserDatas.items);
        setChallengeUserData(res.data.listChallengeUserDatas.items);
      });
    }
  }, [userData, authState, getChallengeUserData, getChallenges]);

  const values = useMemo(
    () => ({
      challenges,
      challengeUserData,
      availableChallenge,
      setAvailableChallenge,
      getChallenges,
      createChallengeData,
      deleteChallengeData,
      getAvailableChallengeType,
      submitUserChallenge,
      acceptChallengeUserData,
      hasAvailableChallengeStarted,
      hasAvailableChallengeEnded,
      getMaxDaysUserCanSee,
      createResultForUserChallengeData,
    }),
    [
      challenges,
      challengeUserData,
      availableChallenge,
      setAvailableChallenge,
      getChallenges,
      createChallengeData,
      getAvailableChallengeType,
      deleteChallengeData,
      submitUserChallenge,
      acceptChallengeUserData,
      hasAvailableChallengeStarted,
      hasAvailableChallengeEnded,
      getMaxDaysUserCanSee,
      createResultForUserChallengeData,
    ]
  );

  return (
    <ChallengeContext.Provider value={values}>
      {props.children}
    </ChallengeContext.Provider>
  );
};

export const useChallengeData = () => {
  const context = useContext(ChallengeContext);

  if (context === undefined) {
    throw new Error(
      "useChallengeData must be used within a ChallengeProvider component."
    );
  }

  return context;
};
