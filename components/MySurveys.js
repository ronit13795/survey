import React from "react";
import Survey from "./Survey";
import jwt from "jsonwebtoken";
import { useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSession } from "next-auth/react";

export default function MySurveys({
  setNewSurvey,
  setMySurveys,
  setPages,
  MySurveys,
  newSurvey,
  setTitleName,
  setTimePage,
  setTimeFinish,
  setSurveyPw,
  setId,
  host,
}) {
  let { data: session } = useSession();
  let creator;
  let userName;
  if (typeof window !== "undefined") {
    if (session) {
      userName = session.user.email;
    } else {
      creator = jwt.decode(localStorage.getItem("accessToken"));
      userName = creator.userName;
    }
  }

  const [surveys, setSurveys] = useState([]);
  surveys.forEach((survey, index) => {
    survey.index = index;
  });

  useEffect(() => {
    fetch("/api/getMySurveys", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ creator: userName }),
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.success) {
          setSurveys(json.surveys);
        } else alert(json.msg);
      })
      .catch((err) => {
        console.log(err);
        alert("fatal error please try again latter");
      });
  }, [MySurveys, newSurvey]);

  const deleteSurvey = (indexToDelete) => {
    const updateSurvey = surveys.filter((survey, index) => {
      return index !== indexToDelete;
    });

    setSurveys([...updateSurvey]);
  };

  return (
    <div>
      <Button
        onClick={() => {
          setMySurveys(false);
          setNewSurvey(true);
        }}
        startIcon={<ArrowBackIcon />}
      >
        New Survey
      </Button>

      {surveys.map((mySurvey, index) => {
        return (
          <Survey
            key={index}
            survey={mySurvey}
            index={index}
            deleteS={deleteSurvey}
            setPages={setPages}
            setMySurveys={setMySurveys}
            setNewSurvey={setNewSurvey}
            setTitleName={setTitleName}
            setTimePage={setTimePage}
            setTimeFinish={setTimeFinish}
            setSurveyPw={setSurveyPw}
            setId={setId}
            host={host}
          />
        );
      })}
    </div>
  );
}
