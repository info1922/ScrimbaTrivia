import React from 'react'

function Respuestas(props) {

    // console.log('respuestas: ', props)

    const respuesta = (res, id, miRespuesta) => {
        // console.log('res: ', miRespuesta);
        const myStyle = {
            background: res.seleccionado && res.es_correcta && res.calificado === true ? '#94D7A2' //verde
            : res.seleccionado && res.calificado === false ? '#D6DBF5' //morado
            : res.es_correcta === false && res.seleccionado === true && res.calificado === true ? '#F8BCBC'
            : '', //bajo
            border: res.seleccionado ? '0px' : '0.8px solid #4D5B9E',
            opacity: !res.seleccionado  && res.calificado === true ? '0.7' : 
            res.es_correcta === false && res.seleccionado === true && res.calificado === true ? '0.5':'1',
            //fontWeight: '700'
        
        }


        const myStyle2 = {
            fontWeight: res.seleccionado && res.es_correcta && res.calificado === true ? '600' : 'normal',
        }

        return (
            <div className="setCuestion"  key={res.respuesta} onClick={() => props.clickRespuesta(id, res)}>

                <div className="rectanguloRespuesta respuestActiva" style={myStyle}>
                    <p className="respuesta" style={myStyle2}>
                        {res.respuesta}
                    </p>
                </div>
            </div>
        )
    }
    return (
        <>
            <div className="respuestas">

                {
                    props.respuestas.map(ele => respuesta(ele, props.id, props.miRespuesta))
                }
                
            </div>
        </>
    )
}

export default Respuestas
