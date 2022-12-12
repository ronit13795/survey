import { Button } from '@mui/material'
import React from 'react'

export default function SurveyPassword({setSurveyPw,setShowSurveyPassword}) {
  return (
    <div>
        <input 
        placeholder='Enter the survey password'
        onChange={(e)=>{setSurveyPw(e.target.value)}}
        >
        </input>
        <Button
        onClick={()=>{setShowSurveyPassword(false)}}
        color="success"
        variant="contained"
        >
         Save
        </Button>

    </div>
  )
}
