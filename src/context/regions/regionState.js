import React, {useReducer} from 'react';
import RegionContext from './regionContext';
import RegionReducer from './regionReducer';
import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/token';
import {
    OBTENER_REGIONES,
    ERROR_OBTENER_REGIONES,
} from '../../types'


const RegionState = props => {
    const initialState = {
        dataTreeInformation : [],
    }

    const [state, dispatch] = useReducer(RegionReducer, initialState)
    //Funciones with dispatch
    const obtenerRegiones = async () => {
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        try {
            const respuesta = await clienteAxios.get('regions/allRegionInformation');
            console.log(respuesta.data.arrayMaestro);
            dispatch({
                type: OBTENER_REGIONES,
                payload: respuesta.data.arrayMaestro
            })
        }catch(error) {
            console.log(error)
            dispatch({
                type: ERROR_OBTENER_REGIONES,
            })
        }
    }

    return(
        <RegionContext.Provider
            value={{
                dataTreeInformation: state.dataTreeInformation,
                obtenerRegiones
            }}
        >
            {props.children}
        </RegionContext.Provider>
    )
}

export default RegionState;