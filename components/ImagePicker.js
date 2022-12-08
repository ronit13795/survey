import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Looks3 } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import FileBase64 from "react-file-base64";

export default function ImagePicker({
  question,
  updateSurveyContext,
  index,
  deleteQuestion,
  name: questionName = "",
}) {
  const [name, setName] = useState(question.elements[0].name || "");
  const [files, setFiles] = useState([]);
  const [choices, setChoices] = useState([]);

  const getFiles = (files) => {
    console.log(files);
    setFiles([...files]);
  };

  useEffect(() => {
    const updatedChoices = files.map((file, i) => {
      return { value: `item${i}`, imageLink: file.base64 };
    });
    setChoices(updatedChoices);
  }, [files]);

  useEffect(() => {
    console.log(question);
    updateSurveyContext(index, {
      elements: [
        {
          type: "imagePicker",
          name,
          choices: choices,
        },
      ],
    });
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
            deleteQuestion(index);
          }}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}
