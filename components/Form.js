import React, { useEffect } from "react";
import "survey-core/defaultV2.min.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";

StylesManager.applyTheme("defaultV2");

export default function Form({ survey }) {
  const surveyToShow = new Model(survey);
  return <Survey model={surveyToShow} />;
}
