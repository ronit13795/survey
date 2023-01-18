import React, { useState, useRef } from 'react';
import { Button } from 'antd';

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef();

   const startRecording = () => {
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
  };

  const stopRecording = () => {
    setRecording(false);
    audioRef.current.stop();
  };

  return (
    <div>
      {recording ? (
        <Button onClick={stopRecording}>Stop Recording</Button>
      ) : (
        <Button onClick={startRecording}>Start Recording</Button>
      )}
      {audioUrl && <audio src={audioUrl} controls />}
    </div>
  );
};

export default AudioRecorder;