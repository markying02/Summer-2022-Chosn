import React from "react";
import { RelationshipRow } from "./RelationshipRow";
import { Navbar } from "../Navbar/Navbar";
import { Link, Redirect } from "react-router-dom";
import family from "../../family.png";
import friend from "../../friends.png";
import romantic from "../../romantic.png";
import self from "../../self.png";
import "./RelationshipType.css";
import { useGoals } from "../../providers/GoalProvider";
import { Helmet } from "react-helmet-async";

export const RelationshipType = () => {
  const { relationship, setRelationship, identity } = useGoals();

  return (
    <div className="relationshipTypeContainer">
      <Navbar />
      {!identity ? <Redirect to="/identity" /> : null}
      <Helmet>
        <title>Relationship Goal Setting | Relationship Goals Made Easy</title>
        <meta
          name="description"
          content="Becoming the best version of yourself starts with setting goals. Supporting you throughout your journey is our mission. It is more important than the destination."
        />
      </Helmet>
      <div className="question">
        <p>What type of relationship do you want to focus on this month?</p>
      </div>

      <div className="rowContainer">
        <RelationshipRow
          type={"family"}
          selectedOption={relationship}
          setSelectedOption={setRelationship}
          text={"Relationship with your family"}
          img={family}
        />
        <RelationshipRow
          type={"self"}
          selectedOption={relationship}
          setSelectedOption={setRelationship}
          text={"Relationship with yourself"}
          img={self}
        />
        <RelationshipRow
          type={"romantic"}
          selectedOption={relationship}
          setSelectedOption={setRelationship}
          text={"Relationship with your romantic partner"}
          img={romantic}
        />
        <RelationshipRow
          type={"friend"}
          selectedOption={relationship}
          setSelectedOption={setRelationship}
          text={"Relationship with friends"}
          img={friend}
        />
      </div>

      <Link
        className="relationshipTypeNextBtn"
        to={relationship ? "/choosegoals" : "#"}
      >
        Next
      </Link>
    </div>
  );
};
