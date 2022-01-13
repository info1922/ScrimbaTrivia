import React from 'react'
import Respuestas from './Respuestas'

export default function Preguntas(props) {
    // console.log('Preguntas: ', props);
    return (
        <div className='preguntaRespuesta'>
            <p className='pregunta'>{props.pregunta}</p>
            <Respuestas 
            id={props.id} 
            respuestas={props.respuestas} 
            respuestaCorrecta={props.respuestaCorrecta} 
            clickRespuesta={props.clickRespuesta} 
            miRespuesta={props.miRespuesta}/>

        </div>
    )
}
