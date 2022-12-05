import "survey-core/defaultV2.min.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { useCallback } from "react";

StylesManager.applyTheme("defaultV2");

export default function Form({ survey }) {
  const surveyToShow = new Model(survey);
  // const alertResults = useCallback((sender) => {
  //   const results = JSON.stringify(sender.data);
  //   alert(results);
  //   console.log(JSON.parse(JSON.stringify(surveyToShow)));
  // }, []);
  // surveyToShow.onComplete.add(alertResults);
  return <Survey model={surveyToShow} />;
}
