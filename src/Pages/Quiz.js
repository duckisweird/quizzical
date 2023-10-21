import React, {useState, useEffect} from "react";

import { decode } from "html-entities"
import { nanoid } from "nanoid"



export default function Quiz({data, setData}) {

    const [reset, setReset] = useState([0])

    const dataStructure = data.map((result) => {
        const correct_answer = result.correct_answer
        const answers = result.incorrect_answers?.concat(correct_answer).sort(() => Math.random() - 0.5)
        console.log(answers)
        return {
            id: nanoid(),
            question: result.question,
            answers: answers?.map(ans => ({
                id: nanoid(),
                isChecked: false,
                isCorrect: ans === correct_answer ? true : false,
                text: ans
            })
            )
        };
    });

    useEffect(() => {
        setData(dataStructure)              
    }, [reset])


    function holdAnswer(quesID, ansID) { 
       setData(prevData => {
        return prevData.map((quiz) => {
            if (quiz.question.id === quesID) {
                return {...quiz,
                     answers: quiz.answers.map(ans => {
                    return ans.id === ansID ? {...ans, isChecked: !ans.isChecked} : {...ans, isChecked: false}
                })}
            } else return quiz
        })
       })
    }

    const elementData = data.map((quest) => {

        return (
            <div>
                <div
                key={quest?.question?.id} 
                className="quiz--question">{decode(quest.question)}</div>

                        <div className="quiz--options">
                            {quest.answers?.map((ans) => {
                                return (
                                <button
                                key={ans.id}
                                className={ans.isChecked ? "quiz--selected" : "quiz--btn"}
                                holdAnswer={holdAnswer}
                                onClick={() => holdAnswer(quest.question.id, ans.id)}
                                >
                                    {decode(ans.text)}
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
