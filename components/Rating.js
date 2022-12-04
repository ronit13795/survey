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
  const [rateMin, setRateMin] = useState(question.elements[0].rateMin || 0);
  const [rateMax, setRateMax] = useState(question.elements[0].rateMax || 10);

  useEffect(() => {
    updateSurveyContext(index, {
      elements: [
        {
          type: "rating",
          name,
          title,
          rateMin: Number(rateMin),
          rateMax: Number(rateMax),
        },
      ],
    });
  }, [name, title, rateMax, rateMin]);

  return (
    <div className="container">
      <div className="space-color"></div>
      <div className="question-container">
        <h2>Question {index + 1}</h2>

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
          placeholder="What is the question"
        />

        <input
          value={min}
          onChange={(e) => {
            setRateMin(e.target.value);
          }}
          placeholder="Fourth option"
        />
        <input
          value={max}
          onChange={(e) => {
            setRateMax(e.target.value);
          }}
          placeholder="Correct answer"
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
