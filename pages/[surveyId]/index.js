import dbConnect from "../../lib/dbConnect";
import surveyModel from "../../models/survey";
import dynamic from "next/dynamic";
import DialogPs from "../../components/DialogPs";
import { useState,useCallback ,useMemo} from "react";
import styled from "styled-components";
import { modernCss } from "survey-core";

const DynamicForm = dynamic(() => import("../../components/Form"), {
  ssr: false,
});

export default function Survey({ survey }) {
  const [userPassword, setUserPassword] = useState(null);
  const [openModal, setOpenModal] = useState(!!survey.surveyPw);
  const[button,setButton] = useState(false);
 



  const showSurvey = useMemo(() => <DynamicForm survey={survey} setButton={setButton} />, []);

    // const StyledBackgroundColor = styled.sd-container-modern`backgroundColor:${survey}`
    
  
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
  return<div>
     {showSurvey}
    {button && <button>ok</button>}
     </div> 
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
