import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import { Button } from '@mui/material';
import 'primeicons/primeicons.css';

export default function MarketSurvey({survey, counter, setCounter}) {
  const router = useRouter()
  const host = window.location.origin;
  const [icon,setIcon]= useState("")
  const [flag,setFlag]= useState(false)

  useEffect(()=>{
     if(survey.recorder === 'video recorder'){
      setIcon('pi-video')
    }else if(survey.recorder === 'audio recorder'){
      setIcon('pi-volume-up')
    }else if(survey.recorder === 'speech recognition'){
      setIcon('pi-microphone')
    }
  },[])

  const changeFlag = () => {
    if(counter > 0){
      return
    }else{
      if(survey.recorder === 'video recorder' || survey.recorder === 'audio recorder' || survey.recorder === 'speech recognition'){
      setFlag(true)
      setCounter(1)
    }
    else{
      router.push(`${host}/${survey._id}`);
    }
    }
  }

  const confirmRecord = async () => {
    let permission = false;
    if(survey.recorder === 'video recorder') {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        permission = true;
        stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        console.log('User denied video recorder access');
      }
    } else if(survey.recorder === 'audio recorder') {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        permission = true;
        stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        console.log('User denied audio recorder access');
      }
    }else if(survey.recorder === 'speech recognition'  ) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        permission = true;
        stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        console.log('User denied speech recognation access');
      }
    }
    if(permission || survey.recorder === 'none' || survey.recorder === '') {
      router.push(`${host}/${survey._id}`);
    }
  }

  const showDiv = () => {
    return (
      <div>
        <div className="popup-container" style={{ display: flag ? "block" : "none" }}>
          <div>
            <h1>Confirm Survey</h1>
            <p>This survey is recorded!</p>
            <p>
              if you want continu to the survey page, please click on the Confirm Record button. <br /> else, click on the Back button.
            </p>
            <button onClick={confirmRecord}>Confirm Record</button>
            <button onClick={() => {setFlag(!flag),setCounter(0)}} className='close-button'>Back</button>
          </div>
        </div>
        <div className='market-container' onClick={() => changeFlag()}>
          <Button variant="contained">
            <div>
              <h3>Survey Name: {survey.title}</h3>
              {survey.recorder !== "none" && (
                <h3
                  style={{
                    marginTop: "20px",
                    padding: "10px",
                    borderRadius: "50%",
                    border: "2px solid black",
                    backgroundColor: "white",
                    fontSize: "20px",
                    color: "blue"
                  }}
                  className={`pi ${icon}`}
                ></h3>
              )}
            </div>
          </Button>
        </div>
      </div>
    );
  };

  return(
    <div>
      {showDiv()}
    </div>
  )
}