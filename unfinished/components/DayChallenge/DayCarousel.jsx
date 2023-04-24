import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { useAuth } from "../../providers/AuthProvider";
import { useChallengeData } from "../../providers/ChallengeProvider";
import { DayComponent } from "./DayComponent";

export const DayCarousel = () => {
  const {
    availableChallenge,
    hasAvailableChallengeStarted,
    challengeUserData,
    getMaxDaysUserCanSee,
  } = useChallengeData();
  const [activeIndex, setActiveIndex] = useState([]);
  const { userData } = useAuth();
  const [questionRedirect, setQuestionRedirect] = useState(false);
  const [showResults, setShowResults] = useState([]);

  if (!availableChallenge || !hasAvailableChallengeStarted()) {
    return <div></div>;
  }

  return (
    <div className="day-carousel">
      {challengeUserData
        .filter((data) =>
          data.partners.length > 0
            ? data.partnerAccept === true
              ? true
              : false
            : true
        )
        .map((data, index) => {
          const days = getMaxDaysUserCanSee(data);
          var partnerName = null;
          var partnerNumber = null;
          if (data.partners > 0) {
            if (data.owner !== userData.username) {
              partnerName = data.ownerName;
              partnerNumber = data.owner;
            } else {
              partnerName = data.partnerName;
              partnerNumber = data.partners[0];
            }
          }

          return (
            <Swiper
              spaceBetween={0}
              slidesPerView={1.25}
              centeredSlides={true}
              centerInsufficientSlides
              onActiveIndexChange={(swiper) => {
                activeIndex[index] = swiper.activeIndex;
                setActiveIndex([...activeIndex]);
              }}
            >
              {availableChallenge.days.map((dayData) => {
                const hasUserSubmitted = data.results.find(
                  (item) =>
                    item.id === dayData.id && item.user === userData.username
                )
                  ? true
                  : false;

                var partnerSubmitted = false;

                if (data.partners.length > 0 && partnerNumber) {
                  partnerSubmitted = data.results.find(
                    (item) =>
                      item.id === dayData.id && item.user === partnerNumber
                  )
                    ? true
                    : false;
                }

                var canViewResults = false;
                var results = null;
                var waiting = false;

                if (partnerName) {
                  // do partner logic
                  if (hasUserSubmitted && partnerSubmitted) {
                    canViewResults = true;
                    results = JSON.stringify(
                      data.results
                        .filter(
                          (item) =>
                            item.id === dayData.id &&
                            item.user === partnerNumber
                        )
                        .map((obj) => obj.results)
                    );
                  } else if (hasUserSubmitted) {
                    waiting = true;
                  }
                } else {
                  // do solo logic
                  if (hasUserSubmitted) {
                    canViewResults = true;
                    results = JSON.parse(
                      JSON.stringify(
                        data.results
                          .filter(
                            (item) =>
                              item.id === dayData.id &&
                              item.user === userData.username
                          )
                          .map((obj) => obj.results)
                      )
                    );
                  }
                }

                return (
                  <SwiperSlide>
                    {questionRedirect ? (
                      <Redirect
                        to={{
                          pathname: "/dailyactivity",
                          state: questionRedirect,
                        }}
                      />
                    ) : null}

                    <DayComponent
                      day={dayData.id}
                      theme={
                        partnerName ? dayData.partnerTheme : dayData.soloTheme
                      }
                      partnerName={partnerName}
                      instructions={
                        data.partners.length > 0
                          ? dayData.partnerInstructions
                              .replaceAll(
                                "%user_name%",
                                userData?.attributes?.given_name
                              )
                              .replaceAll("%partner_name%", partnerName)
                          : dayData.soloInstructions
                              .replaceAll(
                                "%user_name%",
                                userData?.attributes?.given_name
                              )
                              .replaceAll("%partner_name%", partnerName)
                      }
                      activity={
                        data.partners.length > 0
                          ? dayData.partnerActivity
                          : dayData.soloActivity
                      }
                      dayData={dayData}
                      activityType={
                        data.partners.length > 0
                          ? dayData.partnerActivityType
                          : dayData.soloActivityType
                      }
                      btnText={
                        waiting
                          ? "Waiting"
                          : canViewResults
                          ? "Results"
                          : "Start"
                      }
                      btnClick={() => {
                        if (waiting) return;
                        if (canViewResults) {
                          // SHOW RESULTS
                          if (!showResults[index]) {
                            showResults[index] = [];
                          }
                          if (showResults[index][dayData.id]) {
                            showResults[index][dayData.id] = false;
                          } else {
                            showResults[index][dayData.id] = true;
                          }
                          setShowResults([...showResults]);
                        } else {
                          // TAKE TO QUESTIONS
                          setQuestionRedirect({
                            dayData: dayData,
                            challengeUserDataId: data.id,
                            solo: partnerName ? false : true,
                          });
                        }
                      }}
                      showResults={
                        canViewResults
                          ? showResults[index]
                            ? showResults[index][dayData.id]
                              ? true
                              : false
                            : false
                          : false
                      }
                      results={results}
                      setQuestionRedirect={setQuestionRedirect}
                      activeIndex={activeIndex[index] ? activeIndex[index] : 0}
                      maxDay={days}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          );
        })}
    </div>
  );
};
