import React, { useState, useEffect } from "react";

const SpeechRecognition =
  typeof window !== "undefined" &&
  (window.SpeechRecognition || window.webkitSpeechRecognition);

export default function VoiceRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    // Add condition to check if SpeechRecognition is available
    if (SpeechRecognition) {
      try {
        mic = new SpeechRecognition();
        mic.continuous = true;
        mic.interimResults = true;
        mic.lang = "en-US";
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

  const handleSaveNote = () => {
    if(!note){ return}
    else{
        setSavedNotes([...savedNotes, note]);
    setNote("");
    setIsListening(false);
    };
    
  };

  const handleDeleteNote = (index) => {
    setSavedNotes(savedNotes.filter((_, i) => i !== index));
  };


  const startRecord=()=>{
    setIsListening((prevState) => !prevState)
    ;handleSaveNote()
  }
  return (
    <>
      <div>
          <div >
            <h2>Current Note</h2>
            {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
            <button
              onClick={startRecord}
            >
              Start/Stop
            </button>
            <p>{note}</p>
          </div>
        <div >
          <h2>Saved Notes</h2>
          {savedNotes.map((note, index) => (
            <div key={index}>
              <p>{note}</p>
              <button
                onClick={() => handleDeleteNote(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}