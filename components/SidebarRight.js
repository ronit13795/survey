import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import SurveyPassword from "./SurveyPassword";
import jwt from "jsonwebtoken";

export default function SidebarRight({
  questions,
  setQuestions,
  pages,
  addPage,
  setNewSurvey,
  setMySurveys,
  title,setTitleName,maxTimeToFinishPage,setTimePage,
  maxTimeToFinish,setTimeFinish,surveyPw,setSurveyPw
}) {
  // const [title, setTitleName] = useState("");
  // const [maxTimeToFinishPage, setTimePage] = useState("");
  // const [maxTimeToFinish, setTimeFinish] = useState("");
  // const [surveyPw, setSurveyPw] = useState("");
  const [showSurveyPassword, setShowSurveyPassword] = useState(false);

  const creator = jwt.decode(localStorage.getItem("accessToken"));
  const userName = creator.userName;
  const router = useRouter();

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

    let completePages = [firstPage, ...pages];

    const surveyPlaceholder = {
      title: title || "empty title",
      showProgressBar: "bottom",
      showTimerPanel: "top",
      maxTimeToFinishPage: Number(maxTimeToFinishPage) || 10,
      maxTimeToFinish: Number(maxTimeToFinish) || 25,
      firstPageIsStarted: true,
      startSurveyText: "Start Quiz",
      pages: completePages,
      surveyPw,
      creator: userName,
      completedHtml: "<h4>thank you for your time.</h4>",

      // completedHtmlOnCondition: [
      //   {
      //     expression: "{correctAnswers} == 0",
      //     html: "<h4>Unfortunately, none of your answers is correct. Please try again.</h4>",
      //   },
      //   {
      //     expression: "{correctAnswers} == {questionCount}",
      //     html: "<h4>Congratulations! You answered all the questions correctly!</h4>",
      //   },
      // ],
    };

    return surveyPlaceholder;
  };

  const sendSurvey = () => {
    const survey = buildSurvey(questions);
    fetch("/api/updateSurvey", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "access-token": localStorage.getItem("accessToken"),
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
    //  setQuestions([]);
  };

  const questionsSum = () => {
    let counter = 0;
    pages
      .map((page) => {
        return page.elements.length;
      })
      .forEach((length) => {
        counter += length;
      });
    return counter;
  };

  const surveyPassword = () => {
    if (showSurveyPassword === true) {
      return (
        <SurveyPassword
          setSurveyPw={setSurveyPw}
          setShowSurveyPassword={setShowSurveyPassword}
        />
      );
    }
  };

  return (
    <div className="right-bar-side-container">
      <Drawer
        sx={{
          width: 310,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 310,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Toolbar>
          <Typography
            variant="h5"
            noWrap
            component="div"
            style={{ marginLeft: "75px" }}
          >
            Properties
          </Typography>
        </Toolbar>
        <hr />

        <Divider>
          <Toolbar>
            <input
              value={title}
              onChange={(e) => {
                setTitleName(e.target.value);
              }}
              type="text"
              placeholder="Survey Title..."
            />
          </Toolbar>
        </Divider>

        <hr />

        <Divider>
          <Toolbar>
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
          </Toolbar>
        </Divider>

        <hr />

        <Divider>
          <Toolbar>
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
          </Toolbar>
        </Divider>

        <hr />

        <Divider>
          <Toolbar>
            <p>Number Of Question: {questionsSum()} </p>
          </Toolbar>
        </Divider>

        <hr />
        <Divider>
          <Toolbar>
            <Button
              size="small"
              onClick={() => {
                addPage();
              }}
            >
              add page
            </Button>
          </Toolbar>
        </Divider>

        <hr />

        <Divider>
          <Toolbar>
            <Button

            onClick={()=>{
              setShowSurveyPassword(!showSurveyPassword)
            }}
            color="success"
            variant="contained"
            >
              Survey Password
            </Button>
          </Toolbar>
        </Divider>
        <hr />
        {surveyPassword()}

        <Divider>
          <Toolbar>
            <Button
              onClick={() => {
                setNewSurvey(false);
                setMySurveys(true)
              }}
              color="success"
              variant="contained"
            >
              My Surveys
            </Button>
          </Toolbar>
        </Divider>

        <Toolbar style={{ bottom: "0", position: "fixed" }}>
          <Button
            className="barBtn"
            onClick={() => {
              sendSurvey();
            }}
            color="success"
            variant="contained"
          >
            Save
          </Button>

          <Button
            className="barBtn"
            onClick={() => {
              let confirmDelete = confirm(
                "Are sure you want to delete the survey?"
              );
              if (confirmDelete) resetAll();
            }}
            color="error"
            variant="contained"
          >
            Discard
          </Button>
        </Toolbar>
        <Divider />
      </Drawer>
    </div>
  );
}
