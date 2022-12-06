import React from 'react'


export default function DeleteSurvey({setQuestions,setDeleteFlag}) {
    const del = ()=>{
       setQuestions([]);
       setDeleteFlag(false);
    }
  return (
    <div id='deleteSurvey'>
        <p>Are you sure you want to delete this survey?</p>
        <button onClick={()=>{del()}}>Yes</button>
        <button onClick={()=>{setDeleteFlag(false)}}>No</button>
    </div>
  )
}