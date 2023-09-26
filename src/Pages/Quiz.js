import React, {useState, useEffect} from "react";

import { decode } from "html-entities"
import { nanoid } from "nanoid"

export default function Quiz() {

 

    const [quizData, setQuizData] = useState([])
    const [reset, setReset] = useState([0])

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
                .then((response) => response.json())
                .then((data) => {
                    let resultArray = [];
                    data.results.map((result) => {
                        return resultArray.push({
                            id: nanoid(),
                            question: result.question,
                            correct_answer: result.correct_answer,
                            answers: result.incorrect_answers
                                .concat(result.correct_answer)
                                .sort(
                                    () => Math.random() - 0.5
                                ),
                            isChecked: false,
                            selectedAnswer: "",
                            
                        });
                    });
                    setQuizData(resultArray)
                });
    }, [reset])


    function holdAnswer(quesID, ansID) { 
       setQuizData(prevData => {
        return prevData.map(quiz => {
            if (quiz.id === quesID) {
                return {...quiz, allAnswers: quiz.allAnswers.map(ans => {
                    return ans.id === ansID ? {...ans, isChecked: !ans.isChecked} : {...ans, isChecked: false}
                })}
            } else return quiz
        })
       })
    }

    const elementData = quizData.map((quest) => {
        
        

        return (
            <div key={quest.id}>
                <div className="quiz--question">{decode(quest.question)}</div>
                
                    
                        <ul className="quiz--options">
                            {quest.answers.map((ans) => {
                                return (
                                <li
                                key={decode(ans)}
                                id={decode(ans)}
                                className={quest.isChecked ? "quiz--selected" : "quiz--opt"}
                                onClick={() => holdAnswer(quest.question, ans)}
                                >
                                    {decode(ans)}
                                </li>
                                )
                            })}
                        </ul>
                
            </div>
            
            )
    })
    
    return (
        <div className="quiz">
                {elementData}     
        </div>
    
        
    )
}
