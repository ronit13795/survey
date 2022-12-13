import { useDrop } from "react-dnd";
import { useState } from "react";
import Question from "./Question";
import Rating from "./Rating";
import Text from "./Text";
import Boolean from "./Boolean";
import File from "./File";
import DropDown from "./DropDown";
import ImagePicker from "./ImagePicker";
import Checkbox from "./Checkbox";
import Page from "./Page";

export default function AdminPage({
  questions,
  setQuestions,
  pages,
  deletePage,
  setPages,
}) {
  const updateSurveyContext = (pageIndex, indexToUpdate, updatedQuestion) => {
    const updateQuestions = pages.map((page, index) => {
      if (pageIndex === index) {
        page.elements[indexToUpdate] = updatedQuestion;
        return page;
      }
      return page;
    });
    setPages([...updateQuestions]);
  };

  const deleteQuestion = (pageIndex, questionIndex) => {
    const updateQuestions = pages.map((page, index) => {
      if (pageIndex === index) {
        const updatedQuestionsInThePage = page.elements.filter(
          (question, i) => {
            return questionIndex !== i;
          }
        );
        return { ...page, elements: [...updatedQuestionsInThePage] };
      }
      return page;
    });

    setPages([...updateQuestions]);
  };

  return (
    <div>
      <div className="admin-container">
        <div>
          {/* questions.map((question, index) => {
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
            if (question.elements[0].type === "checkbox") {
              return (
                <Checkbox
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
          })*/}
        </div>
        {pages.map((page, index) => {
          return (
            <Page
              index={index}
              key={index}
              deletePage={deletePage}
              page={page}
              updateSurveyContext={updateSurveyContext}
              deleteQuestion={deleteQuestion}
            />
          );
        })}
      </div>
    </div>
  );
}
