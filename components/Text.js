import React, { useEffect } from "react";
import { useState } from "react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function Text({
  question,
  updateSurveyContext,
  index,
  deleteQuestion,
  name: questionName = "",
  isRequired: required,
  requiredErrorText: errorText,
}) {
  const [name, setName] = useState(question.elements[0].name || "");
  const [title, setTitle] = useState(question.elements[0].title || "");
  const [isRequired, setIsRequired] = useState(question.elements[0].required);
  const [requiredErrorText, setRequiredErrorText] = useState(
    question.elements[0].errorText
  );
  const label = { inputProps: { "aria-label": "Switch demo" } };

  useEffect(() => {
    updateSurveyContext(index, {
      elements: [
        {
          name,
          type: "text",
          isRequired,
          requiredErrorText,
        },
      ],
    });
  }, [name, title, isRequired, requiredErrorText]);

  return (
    <div className="container">
      <div className="space-color"></div>
      <div className="question-container">
        <h2>Question {index + 1} - text type </h2>

        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="please enter the question"
          value={questionName}
        />

        <FormControlLabel
          control={
            <Switch
              defaultChecked
              onChange={(e) => {
                setIsRequired(e.target.checked);
              }}
            />
          }
          label="Required"
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
