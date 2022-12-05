import React, { useEffect } from "react";
import { useState } from "react";

export default function Rating({
  question,
  updateSurveyContext,
  index,
  deleteQuestion,
  name: questionName = "",
  titleToSHow = "",
  min,
  max,
}) {
  const [name, setName] = useState(question.elements[0].name || "");
  const [title, setTitle] = useState(question.elements[0].title || "");
  const [rateMin, setRateMin] = useState(question.elements[0].rateMin);
  const [rateMax, setRateMax] = useState(question.elements[0].rateMax);
  console.log(question.elements[0].rateMin);

  useEffect(() => {
    updateSurveyContext(index, {
      elements: [
        {
          type: "rating",
          name,
          title,
          rateMin: rateMin,
          rateMax: rateMax,
        },
      ],
    });
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
          value={min}
          onChange={(e) => {
            setRateMin(e.target.value);
          }}
          placeholder="What is the minimum rating?"
        />
        <input
          value={max}
          onChange={(e) => {
            setRateMax(e.target.value);
          }}
          placeholder="What is the maximum rating?"
        />
        <button
          type="button"
          onClick={() => {
            deleteQuestion(index);
          }}
        >
          x
        </button>
      </div>
    </div>
  );
}
