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
   
    let newSurvey = req.body;
    await surveyModel.insertMany(newSurvey);
    return res.json({ success: true });
  }
  res.json({ success: false });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default updateSurvey;
