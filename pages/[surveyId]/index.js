import dbConnect from "../../lib/dbConnect";
import surveyModel from "../../models/survey";
import dynamic from "next/dynamic";
import DialogPs from "../../components/DialogPs";
import { useState,useCallback ,useMemo, useEffect, useRef, Fragment } from "react";
import styled from "styled-components";
import { modernCss } from "survey-core";
import { useReactMediaRecorder } from 'react-media-recorder';
import { useRouter } from "next/router";
import AWS from 'aws-sdk';

const DynamicForm = dynamic(() => import("../../components/Form"), {
  ssr: false,
});

const SpeechRecognition =
  typeof window !== "undefined" &&
  (window.SpeechRecognition || window.webkitSpeechRecognition);

export default function SurveyId({ survey }) {

  const router = useRouter();

  const [userPassword, setUserPassword] = useState(null);
  const [openModal, setOpenModal] = useState(!!survey.surveyPw);
  const[button,setButton] = useState(false);

  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef();

  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ video: true });

  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);
  const [error, setError] = useState(null);

   // Declare a new state variable for storing the uploaded status
   const [uploadStatus, setUploadStatus] = useState('')
   
   const [flag, setFlag] = useState(false)

  const startAudioRecording = () => {
    setRecording(true);

    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
        audioBitsPerSecond: 16 * 44100,
      });

      mediaRecorder.start();

      const audioChunks = [];
      mediaRecorder.addEventListener('dataavailable', event => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, {
          type: 'audio/webm;codecs=opus',
        });
        setAudioBlob(audioBlob);
        setAudioUrl(URL.createObjectURL(audioBlob));
      });

      audioRef.current = mediaRecorder;
    });
  }

let mic;

const handleStart = () => {
  if (!isListening) {
    setIsLoading(true);
    try {
      mic.start();
    } catch (error) {
      setError(error);
    }
  }
};

const handleResult = (event) => {
  const transcript = Array.from(event.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");
  console.log(transcript);
  setNote(transcript);
};

const handleError = (event) => {
  console.log(event.error);
  setError(event.error);
  setIsListening(false);
};

const stopAudioRecording = () => {
  if (audioRef.current.state === 'recording') {
    setRecording(false);
  audioRef.current.stop();
  }
  };

useEffect(() => {
  // Add condition to check if SpeechRecognition is available
  if (SpeechRecognition) {
    try {
      mic = new SpeechRecognition();
      mic.continuous = true;
      mic.interimResults = true;
      mic.lang = "he-IL";
    } catch (error) {
      setError(error);
      return;
    }
  }
  if (isListening) {
    try {
      mic.start();
    } catch (error) {
      setError(error);
    }
  } else {
    try {
      mic.stop();
    } catch (error) {
      setError(error);
    }
  }
  mic.onstart = handleStart;
  mic.onresult = handleResult;
  mic.onerror = handleError;

  return () => {
    try {
      mic.stop();
    } catch (error) {
      setError(error);
    }
    mic.onstart = null;
    mic.onresult = null;
    mic.onerror = null;
  };
}, [isListening]);

const handleStartQuiz = () => {
  if(survey.recorder === 'video recorder'){
    startRecording()
  }else if(survey.recorder === 'audio recorder'){
    startAudioRecording()
  }else if(survey.recorder === 'speech recognition'){
    setIsListening(true)
  }
}

useEffect(()=>{
// Async function to handle uploading the video to Digital Ocean Spaces
 const uploadRecord = async () => {
  if(mediaBlobUrl){
    setUploadStatus('Uploading...');
  // Configure the AWS SDK with your Digital Ocean Spaces credentials
  AWS.config.credentials = new AWS.Credentials({
    accessKeyId: 'DO00R94Q66FB3DBZHP9E',
    secretAccessKey: 'D5Verh4MBoRm3DNOvwb7AjSFaJVZMHTqV1lb9iKPn7M'
  });

  // Set the endpoint for Digital Ocean Spaces
  AWS.config.endpoint = 'fra1.digitaloceanspaces.com';

  // Create an S3 client
  const s3 = new AWS.S3();

  // Read the video file from the `mediaBlobUrl` and convert it to a buffer
  const videoBlob = await (await fetch(mediaBlobUrl)).blob();
  const fileReader = new FileReader();
  fileReader.readAsArrayBuffer(videoBlob);
  const videoBuffer = await new Promise((resolve) => {
    fileReader.onloadend = () => {
      resolve(fileReader.result);
    };
  });

  // Set up the parameters for the S3 upload
  const params = {
    Bucket: 'video-recorder-project',
    Key: `${survey.creator}-${Date.now()}.mp4`,
    Body: videoBuffer,
    ACL: 'public-read'
  };

  // Upload the video to Digital Ocean Spaces
  await s3.putObject(params).promise();

  // Update the status to 'Uploaded!' after the upload is complete
  setUploadStatus('Uploaded!');
  }else{
    return
  }
};
uploadRecord()
}, [mediaBlobUrl])

// const stopAudioRecording = () => {
//   setRecording(false);
// }
  
useEffect(()=>{
  // Async function to handle uploading the video to Digital Ocean Spaces
 const uploadAudioRecord = async () => {
  if(audioUrl){
    setUploadStatus('Uploading...');
// Configure the AWS SDK with your Digital Ocean Spaces credentials
AWS.config.credentials = new AWS.Credentials({
  accessKeyId: 'DO00R94Q66FB3DBZHP9E',
  secretAccessKey: 'D5Verh4MBoRm3DNOvwb7AjSFaJVZMHTqV1lb9iKPn7M'
});

// Set the endpoint for Digital Ocean Spaces
AWS.config.endpoint = 'fra1.digitaloceanspaces.com';

// Create an S3 client
const s3 = new AWS.S3();

// Convert audioBlob to buffer
const buffer = await new Response(audioBlob).arrayBuffer();

// Set up the parameters for the S3 upload
const params = {
  Bucket: 'video-recorder-project',
  Key: `${survey.creator}-${Date.now()}.webm`,
  Body: buffer,
  ContentType: 'audio/webm;codecs=opus',
  ACL: 'public-read'
};

// Upload the video to Digital Ocean Spaces
await s3.putObject(params).promise();

// Update the status to 'Uploaded!' after the upload is complete
setUploadStatus('Uploaded!');
  }else{
    return
  }
};
uploadAudioRecord()
}, [audioUrl])
 

const handleStopQuiz = () => {
  if(survey.recorder === 'video recorder'){
      stopRecording()
    return router.push("/SurveysMarketplace")
  }else if(survey.recorder === 'audio recorder'){
    stopAudioRecording()
    // return router.push("/SurveysMarketplace")
  }else if(survey.recorder === 'speech recognition'){
    setIsListening(false)
    return router.push("/SurveysMarketplace")
  }
}

const showRecord = () => {
  if(survey.recorder === 'video recorder'){
    return status === 'stopped' && <video src={mediaBlobUrl} autoPlay controls/>
  }else if(survey.recorder === 'audio recorder'){
    return audioUrl && <audio src={audioUrl} controls />
  }else if(survey.recorder === 'speech recognition'){
    return <p>{note}</p>
  }
}
 
// console.log(survey);

  const showSurvey = useMemo(() => <DynamicForm survey={survey} setButton={setButton} handleStartQuiz={handleStartQuiz}/>, []);

    // const StyledBackgroundColor = styled.sd-container-modern`backgroundColor:${survey}`
    
  const checkValidPassword = () => {
    if (survey.surveyPw === userPassword) return setOpenModal(false);
  };
  if (survey.surveyPw && openModal) {
    return (
      <DialogPs
        setUserPassword={setUserPassword}
        checkValidPassword={checkValidPassword}
      />
    );
  }

  const changeFlag = () => {
    handleStopQuiz()
    setFlag(!flag)
  }

  const endQuiz = () => {
    return(
      <div>

        <div style={{ display: flag ? "block" : "none" }}>
          <p>{showRecord()}</p>
          <p>status:</p>
          <button>Upload</button>
          <button>Try Again</button>
          <button onClick={()=>router.push("/SurveysMarketplace")}>Back</button>
        </div>

        <div>
          {showSurvey}
          {button && <button onClick={()=>{changeFlag()}}>End Quiz</button>}
          
        </div>

      </div>
    )
  }

  return(
    <Fragment>
      {endQuiz()}
     </Fragment> 
  )
}

export async function getServerSideProps(context) {
  const surveyId = context.params.surveyId;
  await dbConnect();
  let mySurvey = await surveyModel.findOne({ _id: surveyId });
  const survey = JSON.parse(JSON.stringify(mySurvey));
  return {
    props: { survey },
  };
}
