import dbConnect from "../../lib/dbConnect";
import surveyModel from "../../models/survey";
import adminModel from "../../models/admin";

async function updateSurvey(req, res) {
  await dbConnect();

  if (req.method === "PUT") {
    let myAdmin = await adminModel.findOne({
      userName: req.headers["user-name"],
      password: req.headers.password,
    });

    if (myAdmin) {
      let survey = await surveyModel.find();
      let newSurvey = req.body;
      if (!survey.length) {
        let survey = new surveyModel(newSurvey);
        survey = await survey.save();
        return res.json({ success: true });
      }
      await surveyModel.update({ _id: survey[0]._id }, newSurvey);
      return res.json({ success: true });
    } else {
      res.json({ success: false, msg: "you are not admin" });
    }
  } else {
    res.json({ success: false });
  }
}

export default updateSurvey;
