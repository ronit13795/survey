import dbConnect from "../../lib/dbConnect";
import surveyModel from "../../models/survey";

async function getSurvey(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    let mySurvey = await surveyModel.find();
    if (!mySurvey.length) {
      return res.json({ success: false, msg: "no survey found" });
    }
    res.json(mySurvey[0]);
  } else {
    res.json({ success: false, msg: "is not get method" });
  }
}

export default getSurvey;
