import React, { useEffect } from "react";
import { useState } from "react";

export default function Question({ question, index }) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [choice_1, setChoice_1] = useState("");
  const [choice_2, setChoice_2] = useState("");
  const [choice_3, setChoice_3] = useState("");
  const [choice_4, setChoice_4] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  useEffect(() => {
    question.elements[0].name = name;
    question.elements[0].title = title;
    question.elements[0].choices = [choice_1, choice_2, choice_3, choice_4];
    question.elements[0].correctAnswer = correctAnswer;
  });

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
        />
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="What is the question"
        />
        <input
          onChange={(e) => {
            setChoice_1(e.target.value);
          }}
          placeholder="First option"
        />
        <input
          onChange={(e) => {
            setChoice_2(e.target.value);
          }}
          placeholder="Second option"
        />
        <input
          onChange={(e) => {
            setChoice_3(e.target.value);
          }}
          placeholder="Third option"
        />
        <input
          onChange={(e) => {
            setChoice_4(e.target.value);
          }}
          placeholder="Fourth option"
        />
        <input
          onChange={(e) => {
            setCorrectAnswer(e.target.value);
          }}
          placeholder="Correct answer"
        />
      </div>
    </div>
  );
}
