import dbConnect from '../lib/dbConnect';
import surveyModel from "../models/survey"
import Marketplace from '../components/Marketplace'

export default function SurveysMarketplace({survey}) {
  return <Marketplace survey={survey}/>

}

export async function getServerSideProps() {
    await dbConnect();
    let mySurveys = await surveyModel.find();
    const survey = JSON.parse(JSON.stringify(mySurveys));
    return {
      props: { survey },
    };
  }

