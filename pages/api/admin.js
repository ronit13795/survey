import dbConnect from "../../lib/dbConnect";
import adminModel from "../../models/admin";
import jwt from "jsonwebtoken";
require("dotenv").config();

async function adminDetails(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    let myAdmin = await adminModel.findOne({
      userName: req.body["user-name"],
      password: req.body.password,
    });

    if (myAdmin) {
      const accessToken = jwt.sign(
        { userName: req.body["user-name"] },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({ success: true, accessToken });
    } else {
      res.json({ success: false });
    }
  } else {
    res.json({ success: false, msg: "is not post method" });
  }
}

export default adminDetails;
