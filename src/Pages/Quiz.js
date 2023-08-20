import React, {useState, useEffect} from "react";

import { decode } from "html-entities"

export default function Quiz() {

 

    const [quizData, setQuizData] = useState([])

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then((res) => res.json())
        .then((data) => setQuizData(data.results))  
    }, [])

    return (
        <div className="quiz">
            {quizData.map(arr => {
                return (
                    <div>
                        <div className="quiz--question">{decode(arr.question)}</div>
                        
                    </div>
                    )})}

                   
                {quizData.map(opt => <button className="quiz--btn">{decode(opt.correct_answer.concat(opt.incorrect_answers))}</button>)}  
                            
                        
                    
        </div>
    
        
    )
}
