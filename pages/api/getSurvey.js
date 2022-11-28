import dbConnect from "../../lib/dbConnect";
import surveyModel from "../../models/survey";


    async function getSurvey(req, res) {
        await dbConnect();

        let survey = new surveyModel()
      
        if (req.method === "GET") {
         let mySurvey = await survey.find();
          res.json(mySurvey);
        }
        else{
          res.json({msg:'is not get method'})
        }

      }
      
      export default getSurvey;