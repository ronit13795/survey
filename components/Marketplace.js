// import React from 'react'
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { useState,useEffect } from 'react';
import MarketSurvey from './MarketSurvey';
import InputAdornment from '@mui/material/InputAdornment';
import { Input } from '@mui/material';


export default function Marketplace({survey}) {

    
    const[search,setSearch] = useState("");
    const[category,setCategory] = useState("");
    const[surveys,setSurveys] = useState(survey)
    const [sortFlag, setSortFlag] = useState(false);
    const [totalResults,setTotalResults] = useState([])


    useEffect(()=>{
      
      if(category === "" && search === ""){
        setTotalResults(surveys)
      }
     else if(category !== "" && search !== ""){
        const results = surveys.filter((mySurvey)=>
           category === mySurvey.category && mySurvey.title.toLowerCase().includes(search)
        )    
        setTotalResults(results)
      }
      else if(category !== ""){
        const results1 = surveys.filter((mySurvey)=>
           category === mySurvey.category
        )
        setTotalResults(results1)
      }

       else if(search !== ""){
          const results = surveys.filter((survey)=>
          survey.title.toLowerCase().includes(search) 
          )
          setTotalResults(results)
        }

    },[category,search,surveys,sortFlag])

  return (
    <div className='marketplace-container'>
        <div className='marketplace-menu'>
    <Input style={{marginRight:'20px'}}
     placeholder='Survey search'
     startAdornment={
      <InputAdornment position="start">
        <SearchSharpIcon />
      </InputAdornment>
    }
     onChange={(e)=>{setSearch(e.target.value)}}
       />
      \
    <FormControl id="FormControl" variant="standard" sx={{ m: 1, minWidth: 120 }} >
    <InputLabel id="demo-simple-select-standard-label">by category</InputLabel>
    <Select 
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      label="category"
      onChange={(e)=>{setCategory(e.target.value)}}
    >
        <MenuItem value={""}></MenuItem>
        <MenuItem value={"health"}>Health</MenuItem>
        <MenuItem value={"leisure"}>Leisure</MenuItem>
        <MenuItem value={"recreation"}>Recreation</MenuItem>
        <MenuItem value={"Working"}>Working</MenuItem>
        <MenuItem value={"Society"}>Society</MenuItem>
        <MenuItem value={"technology"}>Technology</MenuItem>
        <MenuItem value={"science"}>Science</MenuItem>
        <MenuItem value={"culture"}>Culture</MenuItem>
        <MenuItem value={"Habits"}>Habits</MenuItem>
        <MenuItem value={"Social Sciences"}>Social Sciences</MenuItem>
        <MenuItem value={"Behavioral Sciences"}>Behavioral Sciences</MenuItem>
        <MenuItem value={"hobbies"}>Hobbies</MenuItem>
        <MenuItem value={"Social Network"}>Social Network</MenuItem>
        <MenuItem value={"Studies"}>Studies</MenuItem>
        <MenuItem value={"general"}>General</MenuItem>
      </Select>
    </FormControl>
    <Button 
    variant="contained"
    onClick={()=>{
      const results = surveys.sort((a,b)=> a.title > b.title ? 1:-1)
        setSurveys(results)
        setSortFlag(!sortFlag)
    }}
    >sort by name</Button>
    
     </div>
     <hr/>
   <div className='marketplace-body'>
        {totalResults.map((mySurvey,index)=>{
            return <MarketSurvey survey={mySurvey} key={index}/>
        })}
      </div>
     
        
    </div>
  )
}
