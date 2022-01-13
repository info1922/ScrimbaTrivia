import React from 'react'
import Preguntas from './Preguntas'

export default function Quiz(props) {
    // console.log("Quizz: ", props


    


    return (
        <div className='formQuizz'>
            {
                props.quizz.map(el => <Preguntas 
                    key={el.id} 
                    pregunta={el.question} 
                    respuestas={el.answerss}  
                    respuestaCorrecta={el.correct_answer}
                    miRespuesta={el.mi_respuesta}
                    clickRespuesta={props.clickRespuesta}
                    id={el.id}
                    />)
            }
            {/* <Preguntas />
            <Preguntas />
            <Preguntas />
            <Preguntas />
            <Preguntas /> */}
            {
                props.completo ? <button className='checkQuizzical' onClick={props.nuevoJuego}>Nuevo juego</button> :
                <button className='checkQuizzical' onClick={props.calificar}>Check answer</button>
            }
            
        </div>
    )
}
