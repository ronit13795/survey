import dbConnect from "../../lib/dbConnect";
import adminModel from "../../models/admin";

async function adminDetails(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    let myAdmin = await adminModel.findOne({
      userName: req.body["user-name"],
      password: req.body.password,
    });

    if (myAdmin) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } else {
    res.json({ success: false, msg: "is not post method" });
  }
}

export default adminDetails;
