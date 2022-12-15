import dbConnect from "../../lib/dbConnect";
import surveyModel from "../../models/survey";
import dynamic from "next/dynamic";

const DynamicForm = dynamic(() => import("../../components/Form"), {
  ssr: false,
});

export default function Survey({ survey }) {
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
