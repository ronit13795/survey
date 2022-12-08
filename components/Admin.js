import { useDrop } from "react-dnd";
import { useState } from "react";
import Question from "./Question";
import Rating from "./Rating";
import Text from "./Text";
import Boolean from "./Boolean";
import File from "./File";
import DropDown from "./DropDown";
import ImagePicker from "./ImagePicker";

export default function AdminPage({ questions, setQuestions }) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "box",
    drop: () => ({ name: "Dustbin" }),
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

  const updateSurveyContext = (indexToUpdate, updatedQuestion) => {
    const updateQuestions = questions.map((question, index) => {
      if (indexToUpdate === index) {
        return updatedQuestion;
      }
      return question;
    });
    setQuestions([...updateQuestions]);
  };

  const deleteQuestion = (indexToDelete) => {
    const updateQuestions = questions.filter((question, index) => {
      return index !== indexToDelete;
    });

    setQuestions([...updateQuestions]);
  };

  return (
    <div>
      <div
        className="admin-container"
        ref={drop}
        style={{ backgroundColor, border }}
      >
        <h3>{instructions}</h3>
        <div>
          {questions.map((question, index) => {
            if (question.elements[0].type === "radiogroup") {
              return (
                <Question
                  key={index}
                  updateSurveyContext={updateSurveyContext}
                  index={index}
                  question={question}
                  deleteQuestion={deleteQuestion}
                  name={question.elements[0].name}
                  titleToSHow={question.elements[0].title}
                  choice1={question.elements[0].choices[0]}
                  choice2={question.elements[0].choices[1]}
                  choice3={question.elements[0].choices[2]}
                  choice4={question.elements[0].choices[3]}
                  answer={question.elements[0].correctAnswer}
                />
              );
            }
            if (question.elements[0].type === "rating") {
              return (
                <Rating
                  key={index}
                  index={index}
                  question={question}
                  deleteQuestion={deleteQuestion}
                  updateSurveyContext={updateSurveyContext}
                  name={question.elements[0].name}
                  titleToSHow={question.elements[0].title}
                  min={question.elements[0].rateMin}
                  max={question.elements[0].rateMax}
                />
              );
            }
            if (question.elements[0].type === "text") {
              return (
                <Text
                  key={index}
                  index={index}
                  question={question}
                  deleteQuestion={deleteQuestion}
                  updateSurveyContext={updateSurveyContext}
                  name={question.elements[0].name}
                  isRequired={question.elements[0].isRequired}
                  requiredErrorText={question.elements[0].requiredErrorText}
                />
              );
            }
            if (question.elements[0].type === "dropdown") {
              return (
                <DropDown
                  key={index}
                  index={index}
                  question={question}
                  deleteQuestion={deleteQuestion}
                  updateSurveyContext={updateSurveyContext}
                  titleToSHow={question.elements[0].title}
                  choicesToShow={question.elements[0].choices}
                />
              );
            }

            if (question.elements[0].type === "boolean") {
              return (
                <Boolean
                  key={index}
                  index={index}
                  question={question}
                  deleteQuestion={deleteQuestion}
                  updateSurveyContext={updateSurveyContext}
                  name={question.elements[0].name}
                />
              );
            }
            if (question.elements[0].type === "file") {
              return (
                <File
                  key={index}
                  index={index}
                  question={question}
                  deleteQuestion={deleteQuestion}
                  updateSurveyContext={updateSurveyContext}
                  name={question.elements[0].name}
                />
              );
            }
            if (question.elements[0].type === "imagePicker") {
              return (
                <ImagePicker
                  key={index}
                  index={index}
                  question={question}
                  deleteQuestion={deleteQuestion}
                  updateSurveyContext={updateSurveyContext}
                  name={question.elements[0].name}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
