import React, {useState, useEffect} from "react";

import { decode } from "html-entities"

export default function Quiz() {

 

    const [quizData, setQuizData] = useState([])

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then((res) => res.json())
        .then((data) => setQuizData(data.results))  
    }, [])


    const buttonData = quizData.map(opt => {
        const optionData = opt.incorrect_answers.concat(opt.correct_answer).toString()
        const shuffledOptionData = optionData.sort(() => (Math.random() > .5) ? 1 : -1)

        return (
            <button className="quiz--btn">{decode(shuffledOptionData)}</button>
        )
    })
    
    return (
        <div className="quiz">
            {quizData.map(arr => {
                return (
                    <div>
                        <div className="quiz--question">{decode(arr.question)}</div>
                        
                    </div>
                    )})}

                   
                
        
        {buttonData}
                    
                    
                            
                        
                    
        </div>
    
        
    )
}

