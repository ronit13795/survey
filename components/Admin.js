import { useState, useEffect } from "react";
import Question from "./Question";

export default function AdminPage() {
  const [title, setTitleName] = useState("");
  const [numberOFQuestions, setNumberOFQuestions] = useState("");
  const [maxTimeToFinish, setTimeFinish] = useState("");
  const [maxTimeToFinishPage, setTimePage] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const questionsPlaceHolders = [];
    questionsPlaceHolders.length = numberOFQuestions || 0;
    questionsPlaceHolders.fill(1);
    const newQuestions = questionsPlaceHolders.map((q) => {
      return {
        elements: [
          {
            type: "radiogroup",
            name: "",
            title: "",
            choices: [],
            correctAnswer: "",
          },
        ],
      };
    });
    setQuestions(newQuestions);
  }, [numberOFQuestions]);

  const buildSurvey = () => {
    const firstPage = {
      elements: [
        {
          type: "html",
          html: `You are about to start a quiz on ${title}. <br>You will have ${maxTimeToFinishPage} seconds for every question and ${maxTimeToFinish} seconds to end the quiz.<br>Enter your name below and click <b>Start Quiz</b> to begin.`,
        },
        {
          type: "text",
          name: "username",
          titleLocation: "hidden",
          isRequired: true,
        },
      ],
    };

    let pages = [firstPage, ...questions];

    const surveyPlaceholder = {
      title: title || "empty title",
      showProgressBar: "bottom",
      showTimerPanel: "top",
      maxTimeToFinishPage: Number(maxTimeToFinishPage) || 10,
      maxTimeToFinish: Number(maxTimeToFinish) || 25,
      firstPageIsStarted: true,
      startSurveyText: "Start Quiz",
      pages,
      completedHtml:
        "<h4>You got <b>{correctAnswers}</b> out of <b>{questionCount}</b> correct answers.</h4>",
      completedHtmlOnCondition: [
        {
          expression: "{correctAnswers} == 0",
          html: "<h4>Unfortunately, none of your answers is correct. Please try again.</h4>",
        },
        {
          expression: "{correctAnswers} == {questionCount}",
          html: "<h4>Congratulations! You answered all the questions correctly!</h4>",
        },
      ],
    };

    return surveyPlaceholder;
  };

  const sendSurvey = (e) => {
    e.preventDefault();

    const survey = buildSurvey(questions);

    fetch("/api/updateSurvey", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "user-name": localStorage.getItem("userName"),
        password: localStorage.getItem("password"),
      },
      body: JSON.stringify(survey),
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.success) {
          alert("updated successfully");
          resetAll();
        } else alert(json.msg);
      })
      .catch((err) => {
        console.log(err);
        alert("fatal error please try again latter");
      });
  };

  const resetAll = () => {
    setTitleName("");
    setNumberOFQuestions("");
    setTimeFinish("");
    setTimePage("");
    setQuestions([]);
  };

  return (
    <div className="admin-container">
      <header>
        <h1>Create a Survey</h1>
      </header>
      <div className="survey-body">
        <form onSubmit={sendSurvey} action="">
          <input
            value={title}
            onChange={(e) => {
              setTitleName(e.target.value);
            }}
            type="text"
            placeholder="Survey Title..."
          />
          <input
            value={numberOFQuestions}
            onChange={(e) => {
              setNumberOFQuestions(e.target.value);
            }}
            type="number"
            placeholder="How many questions?"
          />
          <input
            value={maxTimeToFinish}
            onChange={(e) => {
              setTimeFinish(e.target.value);
            }}
            type="number"
            placeholder="Time for each question..."
          />
          <input
            value={maxTimeToFinishPage}
            onChange={(e) => {
              setTimePage(e.target.value);
            }}
            type="number"
            placeholder="Time for the entire survey..."
          />
          {questions.map((question, index) => {
            return <Question key={index} question={question} />;
          })}
          <button type="submit">Update Survey</button>
        </form>
      </div>
    </div>
  );
}
