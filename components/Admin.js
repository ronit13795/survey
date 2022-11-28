import {useState} from 'react'

export default function AdminPage() {

  const [title,setTitleName]= useState('')
  const [numberOFQuestions,setQuestions]= useState(0)
  const [maxTimeToFinish,setTimeFinish]= useState(0)
  const [maxTimeToFinishPage,setTimePage]= useState(0)

  return (
    <div className="admin-container">
      <header>
        <h1>Create a Survey</h1>
      </header>
      <div className="survey-body">
        <form onSubmit={(e)=>e.preventDefault()} action="">
          <input onChange={(e)=>{setTitleName(e.target.value)}} type="text" placeholder="Survey Title..."/>
          <input onChange={(e)=>{setQuestions(e.target.value)}} type="number" placeholder="How many questions?"/>
          <input onChange={(e)=>{setTimeFinish(e.target.value)}} type="number" placeholder="Time for each question..."/>
          <input onChange={(e)=>{setTimePage(e.target.value)}} type="number" placeholder="Time for the entire survey..."/>
          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  )
}