import "survey-core/defaultV2.min.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { useCallback } from "react";

StylesManager.applyTheme("defaultV2");

export default function Form({ survey }) {
  const surveyToShow = new Model(survey);
  const alertResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    // alert(results);
    console.log(results);
    console.log(survey.creator);
    console.log(JSON.parse(JSON.stringify(surveyToShow)));
    fetch("/api/surveysAnswered", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({title:surveyToShow.title,creator:survey.creator,surveyId:survey._id,answers:results}),
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.success) {
          console.log("updated successfully");
        } else alert(json.msg);
      })
      .catch((err) => {
        alert("fatal error please try again latter");
      });
  }, []);
  surveyToShow.onComplete.add(alertResults);
  return <Survey model={surveyToShow} />;
}
