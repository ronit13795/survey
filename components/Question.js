import React, { useEffect } from "react";
import { useState } from "react";

export default function Question({ obj }) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [choice_1, setChoice_1] = useState("");
  const [choice_2, setChoice_2] = useState("");
  const [choice_3, setChoice_3] = useState("");
  const [choice_4, setChoice_4] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  useEffect(() => {
    obj.elements[0].name = name;
    obj.elements[0].title = title;
    obj.elements[0].choices = [choice_1, choice_2, choice_3, choice_4];
    obj.correctAnswer = correctAnswer;
  });

  return (
    <div>
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="choose name for the question"
      />
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="what is the question"
      />
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="first option"
      />
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="second option"
      />
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="third option"
      />
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="fourth option"
      />
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="correct answer"
      />
      <button> </button>
    </div>
  );
}

// ={
//       elements: [
//         {
//           type: "radiogroup",
//           name: name.current.value,
//           title: title.current.value,
//           choices: ["1796-1803", "1810-1814", "1861-1865", "1939-1945"],
//           correctAnswer: "1861-1865",
//         },
//       ],
//     },
