import React, {useState, useEffect} from "react";

import { decode } from "html-entities"
import { nanoid } from "nanoid"



export default function Quiz() {

    const [data, setData] = useState([])
    const [resultShown, setResultShown] = useState(false)
    const [buttonClicked, setButtonClicked] = useState(false)
    const [reset, setReset] = useState([0])
    const [score, setScore] = useState(0)
    const [newQuiz, setNewQuiz] = useState(true)


    

    useEffect(() => {
        async function getData() {
          const dataFetch = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
          const res = await dataFetch.json()
          setData(dataStructure(res.results))
        }
      
        getData()
      }, [newQuiz])

    const dataStructure = (resData) => {
        return resData.map((result) => {
            const correct_answer = result.correct_answer
            const answers = result.incorrect_answers?.concat(correct_answer).sort(() => Math.random() - 0.5)
            return {
                id: nanoid(),
                question: result.question,
                answers: answers?.map((ans) => ({
                    id: nanoid(),
                    isChecked: false,
                    isCorrect: ans === correct_answer ? true : false,
                    text: ans
                })
                )
            };
        });
    }
    
        
        
    
    useEffect(() => {
        setData(dataStructure)              
    }, [reset])


    function holdAnswer(quesID, ansID) { 
       if (buttonClicked) {
        return
       }
       setData((prevData) => {
        return prevData.map((quiz) => {
            if (quiz.id === quesID) {
                return {...quiz,
                     answers: quiz.answers.map((ans) => {
                    return {...ans, isChecked: ans.id === ansID ? true : false}
                })}
            } else return quiz
        })
       })
    }

    const checkScore = () => {
        data.forEach(quiz => {
            quiz.answers.forEach(ans => {
                if (ans.isChecked && ans.isCorrect) {
                    setScore(prevScore => prevScore + 1)
                }
            })
        })
        setResultShown(true)
        setButtonClicked(true)
    }

    const styles = (buttonClicked) = {
        
    }
   

    const elementData = data.map((quest) => {
         return (
            <div key={quest.id} >
                <div className="quiz--question">{decode(quest.question)}</div>

                <div className="quiz--options">
                    {quest.answers?.map((ans) => (
                        <button
                        key={ans.id}
                        className={ans.isChecked ? "quiz--selected" : "quiz--btn"}
                        onClick={() => holdAnswer(quest.id, ans.id)}
                            >
                                {decode(ans.text)}
                        </button>
                        ))}
                </div>
                
                
            </div>
            
            )
    })
    
    return (
        <div className="quiz">
                {elementData}     
                {resultShown ? 
                <div className="quiz-results">
                    <div className="quiz--score">You scored {score}/5 correct answers</div>
                    <button className="quiz--playAgain">Play Again</button> 
                </div>  
                    : 
                    <button className="quiz--check" onClick={() => checkScore()}>Check Answers</button> 
                    }
                
        </div>
    
        
    )
}
