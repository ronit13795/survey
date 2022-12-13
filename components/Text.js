import React, { useEffect } from "react";
import { useState } from "react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Text({
  question,
  updateSurveyContext,
  index,
  deleteQuestion,
  name: questionName = "",
  isRequired: required,
  requiredErrorText: errorText,
  pageIndex,
}) {
  const [name, setName] = useState(question.name || "");
  const [title, setTitle] = useState(question.title || "");
  const [isRequired, setIsRequired] = useState(question.isRequired);
  const [requiredErrorText, setRequiredErrorText] = useState(
    "Value cannot be empty"
  );
  const label = { inputProps: { "aria-label": "Switch demo" } };

  useEffect(() => {
    updateSurveyContext(
      pageIndex,
      index,

      {
        name,
        type: "text",
        isRequired,
        requiredErrorText,
      }
    );
  }, [name, title, isRequired]);

  return (
    <div className="container">
      <div className="space-color"></div>
      <div className="question-container">
        <h2>Question {index + 1} - text type </h2>

        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Please enter the question"
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
            deleteQuestion(pageIndex, index);
          }}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}
