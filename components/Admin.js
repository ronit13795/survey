import { useDrop } from 'react-dnd'
import { useState } from "react";
import Question from "./Question";

export default function AdminPage({ questions, setQuestions, addQuestion }) {
  const [title, setTitleName] = useState("");
  const [maxTimeToFinishPage, setTimePage] = useState("");
  const [maxTimeToFinish, setTimeFinish] = useState("");


  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'box',
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))


  const isActive = canDrop && isOver
  let backgroundColor = '#ffffff'
  if (isActive) {
    backgroundColor = '#d2f7e5'
  } else if (canDrop) {
    backgroundColor = '#feffed'
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

  const buildSurvey = () => {
    const firstPage = {
      elements: [
        {
          type: "html",
          html: `You are about to start a quiz on <b>${title}</b>. <br>You will have ${maxTimeToFinishPage} seconds for every question and ${maxTimeToFinish} seconds to end the quiz.<br>Enter your name below and click <b>Start Quiz</b> to begin.`,
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
        "user-name": localStorage.getItem("user-name"),
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
    setTimeFinish("");
    setTimePage("");
    setQuestions([]);
  };

  return (
    <div className="admin-container">
      <header>
        <h1>Create a Survey</h1>
      </header>
      <div ref={drop} style={{ backgroundColor }} className="survey-body">
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
            value={maxTimeToFinishPage}
            onChange={(e) => {
              setTimePage(e.target.value);
            }}
            type="text"
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            placeholder="Time for each question..."
          />
          <input
            value={maxTimeToFinish}
            onChange={(e) => {
              setTimeFinish(e.target.value);
            }}
            type="text"
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            placeholder="Time for the entire survey..."
          />

          {questions.map((question, index) => {
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
          })}
          <button
            type="button"
            onClick={() => {
              addQuestion();
            }}
          >
            Add Question
          </button>
          <button type="submit">Update Survey</button>
        </form>
      </div>
    </div>
  );
}
