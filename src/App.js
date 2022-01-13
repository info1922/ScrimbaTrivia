import React from 'react'
import Quiz from "./components/Quiz";
import StartQuiz from "./components/StartQuiz";
import API from "./constants"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

function App() {


  const [start, setStart] = React.useState(false) //
  const [nuevo, setNuevo] = React.useState(false) //
  const [conteo, setConteo] = React.useState([]) //confetti
  const [data, setData] = React.useState([]);
  const [completo, setCompleto] = React.useState(false)
  const [calificacion, setCalificacion] = React.useState(0);



  function iniciarQuizz() {
    console.log('Iniciarquiszz');
    setStart(true)
    setConteo(0);
    setCompleto(false)
    setCalificacion(0);
  }

  async function fetchData() {
    // You can await here
    const response = await fetch(API);
    const json = await response.json();
    console.log('json', json.results);
    const reorden = json.results.map(el => {
      el.id = nanoid()
      el.revisado = false
      el.mi_respuesta = ''
      // console.log(el);
      el.answerss = [...el.incorrect_answers, el.correct_answer].sort(() => Math.random() - 0.5);
      el.answerss = el.answerss.map(elemento => {
        return {
          respuesta: elemento,
          seleccionado: false,
          es_correcta: false, //elemento === el.correct_answer ? true : false
          calificado: false
        }
      })
      return el
    })

    // console.log('reorden json', reorden);
    setData(reorden)
    // ...
  }

  React.useEffect(() => {
    setConteo(() => data.map(el => {
      // console.log('Effectdata: ', el);
      return {
        id: el.id,
        seleccionado: el.mi_respuesta,
        respuesta: el.correct_answer,
        calificacion: el.mi_respuesta === el.correct_answer ? 1 : 0
      }
    }))
    // console.log('Data: ', data)
  }, [data])

  React.useEffect(() => {
    // setCompleto(false)
    console.log('nuevo juego');
    setCalificacion(0)
    fetchData();
    // console.log('Data: ', data)
  }, [nuevo])

  function completado(arr) {
    console.log("arr: ", arr);
    const term = arr.filter(el => el.seleccionado.length === 0 );
    return term.length > 0 ? false : true;
  }

  function calificar() {

   if (completado(conteo)) {

      setCompleto(true);
      setData(pre => pre.map(el => {
        return {

          ...el,
          answerss: el.answerss.map(answ => { 
            // console.log('respuesta: ', answ);
            return {
              ...answ,
              es_correcta: answ.seleccionado && answ.respuesta === el.correct_answer,
              calificado: true
            }
          })
        }
      }))


     
      let cal = 0
      conteo.forEach(el  => cal += el.calificacion)
      setCalificacion(cal);
      
    } else {
      setCompleto(false);
      console.log('responde todas las preguntas: ', conteo)
    }



  }

  function clickRespuesta(id, mi_respuesta) {
    console.log('Mirespuesta_: ', mi_respuesta);

    if (!mi_respuesta.calificado) {
      
      setData(pre => pre.map(el => {
        // console.log('El: ', el);
        return el.id === id ? {
            ...el,
            mi_respuesta: mi_respuesta.seleccionado ?  "" : mi_respuesta.respuesta,
            answerss: el.answerss.map((answ, i, arr) => {
              console.log('Answer: ', answ);
              return answ.respuesta === mi_respuesta.respuesta ?  
              {
                ...answ, 
                seleccionado: answ.seleccionado === false ? true : false
              } : 
              {
                ...answ, 
                seleccionado: false
              }
            }
            ),

            
            
          } : 
          el
        }
        
        ))

        
    }

  }


  function nuevoJuego() {
    setNuevo(pre => !pre)
    setConteo(0);
    setCompleto(false)
    setCalificacion(0)
  }

  return (
    <div className="container">
      {
        calificacion === 5 && <Confetti />
      }
      {start ? <Quiz nuevoJuego={nuevoJuego} completo={completo} calificar={calificar} key={data} quizz={data} clickRespuesta={clickRespuesta} /> : <StartQuiz iniciar={iniciarQuizz} conteo={conteo}  />}
      {
        completo && <p>Calificacion: {calificacion} / 5</p>
      }
    </div>
  );
}

export default App;
