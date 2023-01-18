import React, { useState, useEffect } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import {useRouter} from 'next/router';
import AWS from 'aws-sdk';

function VideoRecorder() {
  const router = useRouter();
  const id = router.query.VideoRecorder;

  // Declare a new state variable for storing the uploaded status
  const [uploadStatus, setUploadStatus] = useState('');
  // Declare a new state variable for storing the list of objects in the bucket
  const [objects, setObjects] = useState([]);
  // Declare a new state variable for storing the filtered list of objects (i.e., the myRecordsArray)
  const [myRecords, setMyRecords] = useState([]);

  // Use the react-media-recorder hook to handle media recording
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ video: true });

  // Async function to handle uploading the video to Digital Ocean Spaces
  const uploadRecord = async () => {
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
      Bucket: 'video-recorder-project/videos',
      Key: `${id}-${Date.now()}.mp4`,
      Body: videoBuffer,
      ACL: 'public-read'
    };

    // Upload the video to Digital Ocean Spaces
    await s3.putObject(params).promise();

    // Update the status to 'Uploaded!' after the upload is complete
    setUploadStatus('Uploaded!');
  };

  useEffect(() => {
    // Async function to retrieve the list of objects in the bucket
    const handleGetObjects = async () => {
      // Configure the AWS SDK with your Digital Ocean Spaces credentials
      AWS.config.credentials = new AWS.Credentials({
        accessKeyId: 'DO00R94Q66FB3DBZHP9E',
        secretAccessKey: 'D5Verh4MBoRm3DNOvwb7AjSFaJVZMHTqV1lb9iKPn7M'
      });
      
      // Set the endpoint for Digital Ocean Spaces
      AWS.config.endpoint = 'fra1.digitaloceanspaces.com';
      
      // Create an S3 client
      const s3 = new AWS.S3();
      
      // Set up the parameters for listing the objects in the bucket
      const params = {
        Bucket: 'video-recorder-project',
        Prefix: "videos/"
      };
      
      // Retrieve the list of objects in the bucket
      const res = await s3.listObjects(params).promise();
      
      // Update the state with the list of objects
      setObjects(res.Contents);
    };

    handleGetObjects();
  }, []); // Empty array means this effect will only run once when the component mounts

  const getMyRecords = () => {
    const myRecordsArray = objects.filter((item) => item.Key.includes(id));
    setMyRecords(myRecordsArray);
  };

  return (
    <div className='index-div'>
      <h1>Video recorder</h1>
      <p>To sign in page <a href='/SignIn' style={{color:'blue'}}>click here</a></p>
      <p>Username: <span style={{color:'red'}}>{id}</span></p>
      {/* Display the status of the recording */}
      <p>Recording status: <span style={{color:'red'}}>{status}</span></p>
      {/* Render the start and stop buttons based on the status */}
      {status === 'recording' ? (
        <button onClick={stopRecording} style={{backgroundColor:'red', color:'white'}}>Stop</button>
      ) : (
        <button onClick={startRecording} style={{backgroundColor:'red', color:'white'}}>Start</button>
      )}
      <br/><br/>
      {/* Display the mediaBlobUrl if the status is 'stopped' */}
      {status === 'stopped' && <video src={mediaBlobUrl} autoPlay controls/>}
      <br/>
      {/* Render the upload button if the status is 'stopped' */}
      {status === 'stopped' && (
        <button onClick={uploadRecord} style={{backgroundColor:'red', color:'white'}}>Upload</button>
      )}
      {/* Display the upload status */}
      <p>{uploadStatus}</p>
      {/* Render the map on objects button */}
      <button onClick={getMyRecords} style={{backgroundColor:'red', color:'white'}}>My records</button>
      <br/>
      {/* Render the myRecords list */}
      <ol>
        {myRecords.map((item) => (
          <li><a href={`https://video-recorder-project.fra1.digitaloceanspaces.com/${item.Key}`} style={{color:'blue'}}>{item.Key} {item.LastModified.toLocaleString()}</a></li>
        ))}
      </ol>
    </div>
  );
}

export default VideoRecorder;