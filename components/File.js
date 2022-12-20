import React from "react";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function File({
  question,
  updateSurveyContext,
  index,
  deleteQuestion,
  name: questionName = "",
  pageIndex,
}) {
  const [name, setName] = useState(question.name || "");

  useEffect(() => {
    updateSurveyContext(
      pageIndex,
      index,

      {
        type: "file",
        name,
      }
    );
  }, [name]);
  return (
    <div className="container">
      <div className="question-container">
        <h2>Question {index + 1} - file type </h2>

        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Please enter the question"
          value={questionName}
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
