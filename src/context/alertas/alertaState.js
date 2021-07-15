import React, {useReducer} from 'react'
import alertaReducer from './alertaReducer'
import alertaContext from './alertaContext'
import {MOSTRAR_ALERTA, OCULTAR_ALERTA} from '../../types/index'


const AlertaState = props => {
    const initialState = {
        alerta: null
    }

    const [state, dispatch] = useReducer(alertaReducer, initialState)
    //funcion
    const mostrarAlerta = (msg, categoria) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        })

        //Despues de 5 seg limpiar el error
        // setTimeout(()=>{
        //     dispatch({
        //         type: OCULTAR_ALERTA
        //     })
        // }, 5000);
    }
    // const mostrarAlertaAutoDelete = (msg, categoria) => {
    //     dispatch({
    //         type: MOSTRAR_ALERTA,
    //         payload: {
    //             msg,
    //             categoria
    //         }
    //     })

    //     // Despues de 5 seg limpiar el error
    //     setTimeout(()=>{
    //         dispatch({
    //             type: OCULTAR_ALERTA
    //         })
    //     }, 5000);
    // }
    const ocultarAlarma = () => {
        setTimeout(()=>{
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 1000);
    }
    return(
        <alertaContext.Provider
            value={{    
                alerta: state.alerta,
                mostrarAlerta,
                ocultarAlarma,
            }}
        >
            {props.children}
        </alertaContext.Provider>
    )
}

export default AlertaState;

