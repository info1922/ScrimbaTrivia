import React from 'react'

const StartQuiz = (props) => {
    console.log('Conteo: ', props);
    return (
        <div className="quizzicalHome">
            <h1 className="titleQuizzical">Quizzical</h1>

            <p className="parrafoQuizzical">Some description if needed</p>

            <button className='startQuizzical' onClick={props.iniciar}>Start quiz</button>

        </div>
    )
}


export default StartQuiz