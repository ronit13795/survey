import React from "react";
import { useDrop } from "react-dnd";
import Boolean from "./Boolean";
import Checkbox from "./Checkbox";
import DropDown from "./DropDown";
import File from "./File";
import ImagePicker from "./ImagePicker";
import Question from "./Question";
import Rating from "./Rating";
import Text from "./Text";

export default function Page({
  index,
  deletePage,
  page,
  updateSurveyContext,
  deleteQuestion,
}) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "box",
    drop: () => ({ name: "Dustbin", index }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  let backgroundColor = "#ffffff";
  let border = "";
  let instructions = "drag questions";

  if (isActive) {
    backgroundColor = "#d2f7e5";
    instructions = "can release :)";
    border = "2px dashed gray";
  } else if (canDrop) {
    instructions = "Drag here";
    backgroundColor = "#feffed";
    border = "2px dashed gray";
  }
  return (
    <div
      ref={drop}
      style={{
        margin: "25px",
        padding: "25px",
        boxSizing: "border-box",
        boxShadow:
          " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) ",
        position: "relative",
        minHeight: "20rem",
        border,
        backgroundColor,
      }}
    >
      Page {index + 1}
      <button
        onClick={() => {
          deletePage(index);
        }}
        style={{
          borderRadius: "2px",
          fontSize: "80%",
          backgroundColor: "rgba(253, 45, 45, 1)",
          color: "white",
          position: "absolute",
          left: "1rem",
          top: "1rem",
        }}
      >
        delete page
      </button>
      {console.log(page, "page", page.elements, "elements")}
      {page.elements
        ? page.elements.map((question, i) => {
            if (question.type === "radiogroup") {
              return (
                <Question
                  key={i}
                  index={i}
                  question={question}
                  name={question.name}
                  titleToSHow={question.title}
                  choice1={question.choices[0]}
                  choice2={question.choices[1]}
                  choice3={question.choices[2]}
                  choice4={question.choices[3]}
                  answer={question.correctAnswer}
                  pageIndex={index}
                  updateSurveyContext={updateSurveyContext}
                  deleteQuestion={deleteQuestion}
                />
              );
            }
            if (question.type === "text") {
              return (
                <Text
                  key={i}
                  index={i}
                  question={question}
                  deleteQuestion={deleteQuestion}
                  updateSurveyContext={updateSurveyContext}
                  name={question.name}
                  isRequired={question.isRequired}
                  requiredErrorText={question.requiredErrorText}
                  pageIndex={index}
                />
              );
            }
            if (question.type === "rating") {
              return (
                <Rating
                  key={i}
                  index={i}
                  question={question}
                  deleteQuestion={deleteQuestion}
                  updateSurveyContext={updateSurveyContext}
                  name={question.name}
                  titleToSHow={question.title}
                  min={question.rateMin}
                  max={question.rateMax}
                  pageIndex={index}
                />
              );
            }
            if (question.type === "dropdown") {
              return (
                <DropDown
                  key={i}
                  index={i}
                  question={question}
                  deleteQuestion={deleteQuestion}
                  updateSurveyContext={updateSurveyContext}
                  titleToSHow={question.title}
                  choicesToShow={question.choices}
                  pageIndex={index}
                />
              );
            }
            if (question.type === "checkbox") {
              return (
                <Checkbox
                  key={i}
                  index={i}
                  question={question}
                  deleteQuestion={deleteQuestion}
                  updateSurveyContext={updateSurveyContext}
                  titleToSHow={question.title}
                  choicesToShow={question.choices}
                  pageIndex={index}
                />
              );
            }
            if (question.type === "boolean") {
              return (
                <Boolean
                  key={i}
                  index={i}
                  question={question}
                  deleteQuestion={deleteQuestion}
                  updateSurveyContext={updateSurveyContext}
                  name={question.name}
                  pageIndex={index}
                />
              );
            }
            if (question.type === "file") {
              return (
                <File
                  key={i}
                  index={i}
                  question={question}
                  deleteQuestion={deleteQuestion}
                  updateSurveyContext={updateSurveyContext}
                  name={question.name}
                  pageIndex={index}
                />
              );
            }
            if (question.type === "imagePicker") {
              return (
                <ImagePicker
                  key={i}
                  index={i}
                  question={question}
                  deleteQuestion={deleteQuestion}
                  updateSurveyContext={updateSurveyContext}
                  name={question.name}
                  pageIndex={index}
                />
              );
            }
          })
        : undefined}
    </div>
  );
}
