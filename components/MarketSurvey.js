import React, { use } from 'react'
import { useRouter } from "next/router";
import { Button } from '@mui/material';

export default function MarketSurvey({survey}) {
  const router = useRouter()
  const host = window.location.origin;


  return (
    <div className='market-container' onClick={()=>{return router.push(`${host}/${survey._id}`)}}>
      <Button 
      variant="contained"
      >
      <h3>Survey Name: {survey.title}</h3>
      </Button>
    </div>
  )
}
