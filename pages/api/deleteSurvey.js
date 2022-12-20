import dbConnect from "../../lib/dbConnect";
import surveyModel from "../../models/survey";

async function deleteSurvey(req,res){
    
    await dbConnect();

  if (req.method === "PUT") {
   
    let surveyToDelete = req.body
    await surveyModel.findOneAndDelete({_id:surveyToDelete._id});
  
    return res.json({ success: true });
  }
  res.json({ success: false });
}

export default deleteSurvey