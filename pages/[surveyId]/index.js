import dbConnect from "../../lib/dbConnect";
import surveyModel from "../../models/survey";
import dynamic from "next/dynamic";
import DialogPs from "../../components/DialogPs";
import { useState } from "react";

const DynamicForm = dynamic(() => import("../../components/Form"), {
  ssr: false,
});

export default function Survey({ survey }) {
  const [userPassword, setUserPassword] = useState(null);
  const [openModal, setOpenModal] = useState(!!survey.surveyPw);
  const checkValidPassword = () => {
    if (survey.surveyPw === userPassword) return setOpenModal(false);
  };
  if (survey.surveyPw && openModal) {
    return (
      <DialogPs
        setUserPassword={setUserPassword}
        checkValidPassword={checkValidPassword}
      />
    );
  }
  return <DynamicForm survey={survey} />;
}

export async function getServerSideProps(context) {
  const surveyId = context.params.surveyId;
  await dbConnect();
  let mySurvey = await surveyModel.findOne({ _id: surveyId });
  const survey = JSON.parse(JSON.stringify(mySurvey));
  return {
    props: { survey },
  };
}
