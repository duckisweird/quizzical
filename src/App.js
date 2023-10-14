import React, {useState, useEffect} from "react"
import './App.css'
import Start from "./Pages/Start"
import Quiz from "./Pages/Quiz"





export default function App() {
  
  const [quizStart, setQuizStart] = useState(false) 
  const [data, setData] = useState([])
  const [newQuiz, setNewQuiz] = useState(true)

   useEffect(() => {
    async function getData() {
      const dataFetch = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      const res = await dataFetch.json()
      setData(res.results)
    }
  
    getData()
  }, [newQuiz])


  console.log(data)
  return (
    <>
    {quizStart ? <Quiz data={data} setData={setData}/> : <Start quizStart={quizStart} setQuizStart={setQuizStart}/>}
    </>
  )

}


