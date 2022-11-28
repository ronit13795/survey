import dbConnect from "../../lib/dbConnect";
import surveyModel from "../../models/survey";
import adminModel from "../../models/admin"


    async function updateSurvey(req, res) {
        await dbConnect();
      
        if (req.method === "PUT") {

          let surveyM = new surveyModel();
          let admin = new adminModel();
          //check if admin userName and password are correct
          let myAdmin = await admin.findOne({userName:req.headers.userName,password:req.headers.password})

          //if admin is correct
          if(myAdmin != null){
         let survey = await surveyM.find();
         let newSurvey = req.body;
          await surveyM.update(survey,newSurvey);
          res.json(newSurvey);
          }
        }
        else{
          res.json({msg:'is not put method'})
        }
      }
      
      export default updateSurvey;