import React from 'react'
import Survey from './Survey';
import jwt from "jsonwebtoken";
import { useState } from 'react';
import { Button } from '@mui/material';
import { useRouter } from "next/router";
import { useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function MySurveys({
  setNewSurvey,
  setMySurveys,
  setPages,
  pages,
MySurveys,
newSurvey,
title,setTitleName,maxTimeToFinishPage,setTimePage,
maxTimeToFinish,setTimeFinish,surveyPw,setSurveyPw
}) {

  const creator = jwt.decode(localStorage.getItem("accessToken"));
  const userName = creator.userName
  const router = useRouter()

  const [surveys,setSurveys] = useState([])
 
   useEffect(()=>{
   fetch("/api/getMySurveys", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({creator:userName}),
   })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      if (json.success) {
        setSurveys(json.surveys)
      } else alert(json.msg);
    })
    .catch((err) => {
      console.log(err);
      alert("fatal error please try again latter");
    });
   },[MySurveys,newSurvey])
  
  

  const deleteSurvey = (indexToDelete) => {
    const updateSurvey = surveys.filter((survey, index) => {
      return index !== indexToDelete;
    });

    setSurveys([...updateSurvey]);
  };

  return (
    <div>
    
       <Button onClick={()=>{
           setMySurveys(false)
           setNewSurvey(true)
      }}
      startIcon={<ArrowBackIcon/>}
      >
        New Survey
      </Button>

      {surveys.map((mySurvey,index)=>{
         return <Survey survey={mySurvey}
          index={index} 
          deleteS={deleteSurvey}
           setPages={setPages}
            setMySurveys={setMySurveys}
            setNewSurvey={setNewSurvey}
            pages={setPages}
            setSurveys={setSurveys}
            title={title}
       setTitleName={setTitleName}
       maxTimeToFinishPage={maxTimeToFinishPage}
       setTimePage={setTimePage}
       maxTimeToFinish={maxTimeToFinish}
       setTimeFinish={setTimeFinish}
       surveyPw={surveyPw}
       setSurveyPw={setSurveyPw}
          
             />
        
      })}

    </div>
  )
} 

