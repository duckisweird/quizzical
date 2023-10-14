import React, {useState, useEffect} from "react";

import { decode } from "html-entities"
import { nanoid } from "nanoid"



export default function Quiz(props) {

 

    const [quizData, setQuizData] = useState([])
    const [reset, setReset] = useState([0])

    let resultArray = [];
    quizData = props.data.results.map((result) => {
        const correct_answer = result.correct_answer
        const answers = result.incorrect_answers.concat(result.correct_answer).sort(() => Math.random() - 0.5) 
        return resultArray.push({
            id: nanoid(),
            question: result.question,
            answers: answers.map(answer => {
                return {
                    id: nanoid(),
                    isChecked: false,
                    selectedAnswer: "",
                    isCorrect: answer === correct_answer ? true : false
                }

            })
            
            
        });
    });

    useEffect(() => {
    setQuizData(resultArray)                
    }, [reset])


    function holdAnswer(quesID, ansID) { 
       setQuizData(prevData => {
        return prevData.map(quiz => {
            if (quiz.question.id === quesID) {
                return {...quiz, answers: quiz.answers.map(ans => {
                    return ans.id === ansID ? {...ans, isChecked: !ans.isChecked} : {...ans, isChecked: false}
                })}
            } else return quiz
        })
       })
    }

    const elementData = quizData.map((quest) => {
        
        

        return (
            <div>
                <div
                key={quest.question.id} 
                className="quiz--question">{decode(quest.question)}</div>
                
                    
                        <div className="quiz--options">
                            {quest.answers.map((ans) => {
                                return (
                                <button
                                key={ans.id}
                                className={quest.isChecked ? "quiz--selected" : "quiz--btn"}
                                onClick={() => holdAnswer(quest.question.id, ans.id)}
                                >
                                    {decode(ans)}
                                </button>
                                )
                            })}
                        </div>
                
            </div>
            
            )
    })
    
    return (
        <div className="quiz">
                {elementData}     
        </div>
    
        
    )
}
