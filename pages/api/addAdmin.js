import dbConnect from "../../lib/dbConnect";
import adminModel from "../../models/admin";

async function addAdmin(req,res){
  await dbConnect()
  if(req.method === 'POST'){
  let newAdmin = {
    email: req.body.email,
    password: req.body.password,
    role: "admin"
  }

  await adminModel.insertMany(newAdmin)
  res.json({success: true})
}else{
    res.json({success: false})
}

}

export default addAdmin;