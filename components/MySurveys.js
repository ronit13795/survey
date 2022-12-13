import React from 'react'
import Survey from './Survey';
import jwt from "jsonwebtoken";
import { useState } from 'react';
import { Button } from '@mui/material';
import { useRouter } from "next/router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function MySurveys({survey}) {

  const creator = jwt.decode(localStorage.getItem("accessToken"));
  const userName = creator.userName
  const router = useRouter()

  const [surveys,setSurveys] = useState(survey)

  const deleteSurvey = (indexToDelete) => {
    const updateSurvey = survey.filter((survey, index) => {
      return index !== indexToDelete;
    });

    setSurveys([...updateSurvey]);
  };
  return (
    <div>
      <Button onClick={()=>{
           router.push('/Admin')
      }}
      startIcon={<ArrowBackIcon/>}
      >
        Back
      </Button>
      
      {surveys.map((mySurvey,index)=>{
        if(mySurvey.creator === userName){
         return <Survey survey={mySurvey} index={index} deleteS={deleteSurvey}/>
        }
      })}
    </div>
  )
} 

