import React from 'react';



export default function Start({quizStart, setQuizStart}) {
    

    return (
        <div className="start">
            
            <h1 id="start--title">Quizzical</h1>
            <p id="start--desc">Click on the button to start your quiz to see if you can get all the answers right.</p>
            <button onClick={() => setQuizStart(() => !quizStart.value)} id="start--btn">Start Quiz</button>
            
        </div>
    )
}
