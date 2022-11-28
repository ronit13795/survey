import dbConnect from "../../lib/dbConnect";
import adminModel from "../../models/admin";

async function adminDetails(req, res) {
    await dbConnect();
  
    if (req.method === "POST") {
         
       let admin = new adminModel();

     let myAdmin = await admin.findOne({userName:req.body.userName,password:req.body.password})

     if(myAdmin != null){
        res.json({success:true})
     }
     else{
        res.json({success:false});
     }
    }
    else{res.json({msg:"is not post method"})}
  }
  
  export default adminDetails;


