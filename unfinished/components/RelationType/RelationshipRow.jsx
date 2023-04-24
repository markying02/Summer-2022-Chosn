import React from "react";
import "./RelationshipRow.css";

export const RelationshipRow = ({
  selectedOption,
  setSelectedOption,
  type,
  img,
  text,
}) => {
  return (
    <div className="relationshipRow">
      <img className="relationshipRowImage" src={img} alt={type} />
      <input
        className="relationshipRowRadio"
        type="radio"
        id="html"
        name="fav_language"
        value="HTML"
        checked={selectedOption === type}
        onChange={() => {
          setSelectedOption(type);
        }}
      />
      <p
        className="relationshipRowText"
        style={{ fontWeight: selectedOption === type ? "700" : "normal" }}
      >
        {text}
      </p>
    </div>
  );
};
