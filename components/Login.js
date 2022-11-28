import {useState} from 'react'

export default function Login () {

  const [userName,setUserName] =useState('')
  const [pw,setPw] =useState('')


  const checkAdminCredentials = () =>{
    

  }


  return (
    <div className="login-container">

      <header>
        <h1>Admin Center</h1>
      </header>

      <div className="input-section">

        <form onSubmit={(e)=>{e.preventDefault(); checkAdminCredentials()}} action="">
          <input onChange={(e)=>{setUserName(e.target.value)}} type="text" placeholder="Username"/>
          <input onChange={(e)=>{setPw(e.target.value)}} type="text" placeholder="Password"/>
          <button type='submit'>Login</button> 
        </form>

      </div>
      
    </div>
  )

}