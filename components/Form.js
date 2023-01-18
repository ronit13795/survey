import "survey-core/defaultV2.min.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { useCallback, useState, useEffect, useRef, Fragment } from "react";
import { style } from "@mui/system/Stack/createStack";
import { blue, red } from "@mui/material/colors";
import styled from "styled-components";
import fetch from 'isomorphic-unfetch'

if (typeof document !== 'undefined') {
  StylesManager.applyTheme("defaultV2");
}

export const StyledCSS = styled.div`
  .myCustomClass {
    color: ${(props) => props.btnColor};
    background-color: ${(props) => props.backGroundBtn};
  }
`;

export default function Form({ survey, setButton, handleStartQuiz }) {

  const surveyToShow = new Model(survey);
  const alertResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    console.log(results);
    console.log(survey.creator);
    console.log(JSON.parse(JSON.stringify(surveyToShow)));
    fetch("/api/surveysAnswered", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: surveyToShow.title,
        creator: survey.creator,
        surveyId: survey._id,
        answers: results,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.success) {
          console.log("updated successfully");
          setButton(true);
        } else alert(json.msg);
      })
      .catch((err) => {
        alert("fatal error please try again latter");
      });
  }, []);
  // console.log(survey);

  useEffect(() => {
    document.getElementsByClassName(
      "sd-container-modern"
    )[0].style.backgroundColor = survey.background;
    document.getElementsByTagName("body")[0].style.backgroundColor =
      survey.background;
    document.getElementsByTagName("body")[0].style.color = survey.textColor;
    document.getElementsByTagName("body")[0].style.fontSize = survey.textSize;
    document.getElementsByClassName("sv-string-viewer")[0].style.color =
      survey.titleColor;
    document.getElementsByClassName("sv-string-viewer")[0].style.fontSize =
      survey.titleSize;
      const btn = document.getElementsByClassName("sd-btn")[0];
      btn.style.color = survey.btnColor;
      btn.style.backgroundColor = survey.btnBackground;
      btn.addEventListener("click", () =>{handleStartQuiz()});
  }, []);

  surveyToShow.onComplete.add(alertResults);

  const myCss = {
    navigation: {
      next: "myCustomClass",
      complete: "myCustomClass",
    },
  };

  return (
    <Fragment>
    <StyledCSS btnColor={survey.btnColor} backGroundBtn={survey.btnBackground}>
      <Survey model={surveyToShow} css={myCss} />
    </StyledCSS>
    </Fragment>
  );
}
