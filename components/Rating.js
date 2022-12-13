import React, { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export default function Rating({
  question,
  updateSurveyContext,
  index,
  deleteQuestion,
  name: questionName,
  titleToSHow = "",
  min,
  max,
  pageIndex,
}) {
  const [name, setName] = useState(question.name || "");
  const [title, setTitle] = useState(question.title || "");
  const [rateMin, setRateMin] = useState(question.rateMin);
  const [rateMax, setRateMax] = useState(question.rateMax);

  useEffect(() => {
    updateSurveyContext(
      pageIndex,
      index,

      {
        type: "rating",
        name,
        title,
        rateMin: rateMin,
        rateMax: rateMax,
      }
    );
  }, [name, title, rateMax, rateMin]);

  return (
    <div className="container">
      <div className="space-color"></div>
      <div className="question-container">
        <h2>Question {index + 1} - rating type </h2>

        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Name for the question"
          value={questionName}
        />
        <input
          value={titleToSHow}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Write here what the question is"
        />

        <input
          type={"number"}
          value={min}
          onChange={(e) => {
            setRateMin(e.target.value);
          }}
          placeholder="What is the minimum rating?"
        />
        <input
          type={"number"}
          value={max}
          onChange={(e) => {
            setRateMax(e.target.value);
          }}
          placeholder="What is the maximum rating?"
        />
        <button
          type="button"
          onClick={() => {
            deleteQuestion(pageIndex, index);
          }}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}
