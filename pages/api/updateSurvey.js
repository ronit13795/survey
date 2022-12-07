import dbConnect from "../../lib/dbConnect";
import surveyModel from "../../models/survey";
import adminModel from "../../models/admin";
import jwt from "jsonwebtoken";

async function updateSurvey(req, res) {
  await dbConnect();

  if (req.method === "PUT") {
    const token = req.headers["access-token"];

    if (!token) {
      return res.json({ success: false, msg: "token required" });
    }
    try {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      return res.json({ success: false, msg: "invalid token" });
    }
    let survey = await surveyModel.find();
    let newSurvey = req.body;
    if (!survey.length) {
      let survey = new surveyModel(newSurvey);
      survey = await survey.save();
      return res.json({ success: true });
    }
    await surveyModel.update({ _id: survey[0]._id }, newSurvey);
    return res.json({ success: true });
  }
  res.json({ success: false });
}

export default updateSurvey;
