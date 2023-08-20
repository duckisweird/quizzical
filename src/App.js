import React, {useState} from "react"
import './App.css'
import Start from "./Pages/Start"
import Quiz from "./Pages/Quiz"




export default function App() {
  
  const [quizStart, setQuizStart] = useState(false) 
  console.log(quizStart)
  return (
    <>
    {quizStart ? <Quiz /> : <Start quizStart={quizStart} setQuizStart={setQuizStart}/>}
    </>
  )
}


