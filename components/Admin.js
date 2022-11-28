import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";

const creatorOptions = {
  showLogicTab: true,
  isAutoSave: true,
};

const defaultJson = {
  pages: [
    {
      name: "Name",
      elements: [
        {
          name: "FirstName",
          title: "Enter your first name:",
          type: "text",
        },
        {
          name: "LastName",
          title: "Enter your last name:",
          type: "text",
        },
      ],
    },
  ],
};

export default function SurveyCreatorWidget() {
  const creator = new SurveyCreator(creatorOptions);
  creator.text =
    window.localStorage.getItem("survey-json") || JSON.stringify(defaultJson);
  creator.saveSurveyFunc = (saveNo, callback) => {
    window.localStorage.setItem("survey-json", creator.text);
    callback(saveNo, true);
    // saveSurveyJson(
    //     "https://your-web-service.com/",
    //     creator.JSON,
    //     saveNo,
    //     callback
    // );
  };
  return <SurveyCreatorComponent creator={creator} />;
}
