import React from 'react'
import { useState ,useEffect} from 'react'
import Link from 'next/link';
import { Looks3 } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ImagePicker({
  question,
  updateSurveyContext,
  index,
  deleteQuestion,
  name: questionName = "",
})
 {
    const[name,setName] = useState(question.elements[0].name || "");
    const[image1,setImage1] = useState("")
    const[image2,setImage2] = useState("")
    const[image3,setImage3] = useState("")
    const[image4,setImage4] = useState("")
 
   

    useEffect(() => {
      console.log(question);
        updateSurveyContext(index, {
          elements: [
            {
              type: "imagePicker",
              name,
              choices: [
                {
                 "value": "lion",
                 "imageLink":`${image1}`,
                },
                {
                 "value": "giraffe",
                 "imageLink": `${image2}`,
                },
                {
                 "value": "panda",
                 "imageLink": `${image3}`,
                },
                {
                 "value": "camel",
                 "imageLink": `${image4}`,
                }
               ]             
            },
          ],
        });
      },[name,image1,image2,image3,image4])
    console.log(typeof(image1)); 
  return (
    <div className="container">
     <div className="question-container">
       <h2>Question {index + 1} - image picker type </h2>

       <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Please enter the question"
          value={questionName}
        />
        <input
        placeholder='Please enter a link to the image'
        onChange={(e)=>{
            setImage1(e.target.value)
        }}
        value={image1}
      
        />
        <input
        placeholder='Please enter a link to the image'
        onChange={(e)=>{
            setImage2(e.target.value)
        }}
        value={image2}
        />
        <input
        placeholder='Please enter a link to the image'
        onChange={(e)=>{
            setImage3(e.target.value)
        }}
        />
        <input
        placeholder='Please enter a link to the image'
        onChange={(e)=>{
            setImage4(e.target.value)
        }}
        />
    
          <button
            type="button"
            onClick={() => {
              deleteQuestion(index);
            }}
            >
            <DeleteIcon />      
          </button>
          
                   

     </div>
    </div>
  )
}