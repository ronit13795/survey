import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Survey({survey,index,deleteS,setNewSurvey,setMySurveys,setPages,pages,setSurvey
, title,setTitleName,maxTimeToFinishPage,setTimePage,
maxTimeToFinish,setTimeFinish,surveyPw,setSurveyPw}) {
     
  const deleteSurvey = () => {
    fetch("/api/deleteSurvey", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // "access-token": localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(survey),
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.success) {
          alert("deleted successfully");
        } else alert(json.msg);
      })
      .catch((err) => {
        console.log(err);
        alert("fatal error please try again latter");
      });
      
      deleteS(index)
  };
  

  return (
    <div>
        <p style={{color:'black'}}>survey title: {survey.title}</p>
        <Stack direction="row" spacing={1}>
        <IconButton
         aria-label="delete" 
          component="label"
          onClick={()=>{
           deleteSurvey()
          }}
          >
           <DeleteIcon />
        </IconButton>

        <IconButton aria-label="edit" component="label"
        onClick={()=>{
         setTitleName(survey.title)
         setTimePage(survey.maxTimeToFinishPage)
         setTimeFinish(survey.maxTimeToFinish);
         setSurveyPw(survey.surveyPw)
          setPages(survey.pages)
          setMySurveys(false);
          setNewSurvey(true)
        }}
        >
           <EditIcon />
        </IconButton>
        </Stack>

    </div>
  )
}
