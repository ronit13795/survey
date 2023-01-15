import AdminPage from "../components/Admin";
import { Fragment, use, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import SidebarRight from "../components/SidebarRight";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";
import React from "react";
import MySurveys from "../components/MySurveys";
import { TextareaAutosize } from "@mui/material";
import "survey-core/defaultV2.min.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import styled from "styled-components";

StylesManager.applyTheme("defaultV2");

export const StyledCSS = styled.div`
  .myCustomClass {
    color: ${(props) => props.btnColor};
    background-color: ${(props) => props.backGroundBtn};
  }
`;

export default function Admin({ host }) {
  const [pages, setPages] = useState([]);
  const [newSurvey, setNewSurvey] = useState(false);
  const [mySurveys, setMySurveys] = useState(true);
  const [title, setTitleName] = useState("");
  const [maxTimeToFinishPage, setTimePage] = useState("");
  const [maxTimeToFinish, setTimeFinish] = useState("");
  const [surveyPw, setSurveyPw] = useState("");
  const [category, setCategory] = useState("");
  const [id, setId] = useState("new");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [titleColor, setTitleColor] = useState("");
  const [titleSize, setTitleSize] = useState("");
  const [textColor, setTextColor] = useState("");
  const [textSize, setTextSize] = useState("");
  const [btnBackground, setBtnBackground] = useState("");
  const [btnColor, setBtnColor] = useState("");
  const [show, setShow] = useState(false);
  const [surveyToShowPreview, setSurveyToShow] = useState({});
  const [numOfRenderSurvey, setNun] = useState(0);

  const addPage = () => {
    setPages((pages) => [...pages, { elements: [] }]);
  };

  // useEffect(() => {
  //   console.log(pages);
  // }, [pages]);
  // document.getElementsByClassName(".sd-container-modern").style.backgroundColor = survey.backgroundColor
  const deletePage = (index) => {
    const updatedPages = pages.filter((page, i) => {
      return index != i;
    });
    setPages(updatedPages);
  };

  useEffect(() => {
    if (show && !numOfRenderSurvey) {
      setNun(1);
    }
    if (show && numOfRenderSurvey) {
      document.getElementsByClassName(
        "sd-container-modern"
      )[0].style.backgroundColor = surveyToShowPreview.background;
      document.getElementsByTagName("body")[0].style.backgroundColor =
        surveyToShowPreview.background;
      document.getElementsByTagName("body")[0].style.color =
        surveyToShowPreview.textColor;
      document.getElementsByTagName("body")[0].style.fontSize =
        surveyToShowPreview.textSize;
      document.getElementsByClassName("sv-string-viewer")[0].style.color =
        surveyToShowPreview.titleColor;
      document.getElementsByClassName("sv-string-viewer")[0].style.fontSize =
        surveyToShowPreview.titleSize;
      document.getElementsByClassName("sd-btn")[0].style.color =
        surveyToShowPreview.btnColor;
      document.getElementsByClassName("sd-btn")[0].style.backgroundColor =
        surveyToShowPreview.btnBackground;
    }
  });

  const add = () => {
    if (show) {
      const myCss = {
        navigation: {
          next: "myCustomClass",
          complete: "myCustomClass",
        },
      };
      const previewSurvey = surveyToShowPreview;
      const surveyToShow = new Model(previewSurvey);
      return (
        <StyledCSS
          btnColor={previewSurvey.btnColor}
          backGroundBtn={previewSurvey.btnBackground}
        >
          <Survey model={surveyToShow} css={myCss} />
          <button
            onClick={() => {
              setShow(false);
              document.getElementsByTagName("body")[0].style.backgroundColor =
                "white";
            }}
          >
            Back to editing
          </button>
        </StyledCSS>
      );
    }
    if (newSurvey) {
      return (
        <Fragment>
          <DndProvider backend={HTML5Backend}>
            <Sidebar setPages={setPages} />
            <AdminPage
              addPage={addPage}
              pages={pages}
              deletePage={deletePage}
              setPages={setPages}
            />
          </DndProvider>
          <SidebarRight
            setSurveyToShow={setSurveyToShow}
            setShow={setShow}
            addPage={addPage}
            pages={pages}
            setMySurveys={setMySurveys}
            setNewSurvey={setNewSurvey}
            newSurvey={newSurvey}
            mySurveys={mySurveys}
            title={title}
            setTitleName={setTitleName}
            maxTimeToFinishPage={maxTimeToFinishPage}
            setTimePage={setTimePage}
            maxTimeToFinish={maxTimeToFinish}
            setTimeFinish={setTimeFinish}
            surveyPw={surveyPw}
            setSurveyPw={setSurveyPw}
            setPages={setPages}
            _id={id}
            setId={setId}
            category={category}
            setCategory={setCategory}
            setBackgroundColor={setBackgroundColor}
            backgroundColor={backgroundColor}
            setTitleColor={setTitleColor}
            titleColor={titleColor}
            setTitleSize={setTitleSize}
            titleSize={titleSize}
            setTextColor={setTextColor}
            textColor={textColor}
            setTextSize={setTextSize}
            textSize={textSize}
            setBtnBackground={setBtnBackground}
            btnBackground={btnBackground}
            setBtnColor={setBtnColor}
            btnColor={btnColor}
          />
        </Fragment>
      );
    }
  };

  return (
    <Fragment>
      {mySurveys && (
        <MySurveys
          host={host}
          setPages={setPages}
          setMySurveys={setMySurveys}
          setNewSurvey={setNewSurvey}
          setTitleName={setTitleName}
          setTimePage={setTimePage}
          setTimeFinish={setTimeFinish}
          setSurveyPw={setSurveyPw}
          setCategory={setCategory}
          setId={setId}
        />
      )}
      {add()}
    </Fragment>
  );
}

export async function getStaticProps() {
  return {
    props: { host: process.env.HOST_NAME },
  };
}
