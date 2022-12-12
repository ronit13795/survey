import MySurveys from '../components/MySurveys'
import dbConnect from "../lib/dbConnect";
import surveyModel from "../models/survey";

export default function mySurveys({surveys}) {

  return <MySurveys survey={surveys}/>;
}

export async function getServerSideProps() {
  await dbConnect();
  let mySurveys = await surveyModel.find();


  return {
    props: { surveys: JSON.parse(JSON.stringify(mySurveys)) },
  };
}