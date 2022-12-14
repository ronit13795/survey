import dbConnect from "../../lib/dbConnect";
import surveyModel from "../../models/survey";

async function getMySurveys(req,res){

    await dbConnect();

    if (req.method === "POST") {
       
        let myCreator = req.body.creator
      let mySurveys = await surveyModel.find({creator:myCreator})
      console.log(mySurveys);
        return res.json({ success: true ,surveys:mySurveys});
      }
      res.json({ success: false });
}
export default getMySurveys