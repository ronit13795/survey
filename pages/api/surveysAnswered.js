import dbConnect from "../../lib/dbConnect";
import surveysAnsweredModel from "../../models/surveysAnswered"

async function surveysAnswered (req,res){
    await dbConnect();
    if(req.method === 'POST'){
    let myAnswers = {
        title: req.body.title,
        creator: req.body.creator,
        answers: req.body.answers,
    }

    await surveysAnsweredModel.insertMany(myAnswers);
   let results = await surveysAnsweredModel.find()
   console.log(results);
    return res.json({ success: true });
   }
   return res.json({ success: false });
}

export default surveysAnswered;