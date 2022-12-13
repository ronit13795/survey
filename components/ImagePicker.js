import React from "react";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import FileBase64 from "react-file-base64";

export default function ImagePicker({
  question,
  updateSurveyContext,
  index,
  deleteQuestion,
  name: questionName = "",
  pageIndex,
}) {
  const [name, setName] = useState(question.name || "");
  const [files, setFiles] = useState([]);
  const [choices, setChoices] = useState([]);

  const getFiles = (files) => {
    setFiles([...files]);
  };

  useEffect(() => {
    const updatedChoices = files.map((file, i) => {
      return { value: `item${i}`, imageLink: file.base64 };
    });
    setChoices(updatedChoices);
  }, [files]);

  useEffect(() => {
    updateSurveyContext(
      pageIndex,
      index,

      {
        type: "imagePicker",
        name,
        choices: choices,
      }
    );
  }, [name, choices]);

  return (
    <div className="container">
      <div className="question-container">
        <h2>Question {index + 1} - image picker type </h2>
        <FileBase64 multiple={true} onDone={getFiles} />
        {files.map((file, i) => {
          return (
            <img
              style={{ height: "15%", width: "15%", margin: "1px" }}
              src={file.base64}
              key={i}
            />
          );
        })}
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
