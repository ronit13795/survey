import { useDrop } from "react-dnd";
import { useState } from "react";
import Question from "./Question";
import Rating from "./Rating";
import Text from "./Text";
import Boolean from "./Boolean";
import File from "./File";

export default function AdminPage({ questions, setQuestions, addQuestion,}) {


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
  if (isActive) {
    backgroundColor = "#d2f7e5";
  } else if (canDrop) {
    backgroundColor = "#feffed";
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
    <div className="admin-container" ref={drop} style={{ backgroundColor }}>
      <header>
        <h1>Create a Survey</h1>
      </header>
      <div >

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
            if(question.elements[0].type === "boolean"){
              return(
                <Boolean
                 key={index}
                 index={index}
                 question={question}
                 deleteQuestion={deleteQuestion}
                 updateSurveyContext={updateSurveyContext}
                 name={question.elements[0].name}
                />
              )
            }
            if(question.elements[0].type === "file"){
               return(
               <File
                key={index}
                index={index}
                question={question}
                deleteQuestion={deleteQuestion}
                updateSurveyContext={updateSurveyContext}
                name={question.elements[0].name}
              />
               )
            }
          })}

      </div>
    </div>
  );
}
