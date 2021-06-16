import React, {useReducer} from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/token'
import {
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    OBTENER_USUARIO,
    CERRAR_SESION
} from '../../types';

const AuthState = props => {
    //Estado
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        mensaje: null,
        usuario: null,
        cargando: true
    }
    //Asociar with useReducer the function and the state
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    //Funciones dispatch
    const loguearUsuario = async datos => {
        try{
            const respuesta = await clienteAxios.post('/users/signin', datos)
            console.log(respuesta.data.message  ); //Es el payload de LOGIN EXITOSO
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });
            usuarioAutenticado();
        }catch (error) {
            console.log(error.response.data.message);//error es payload de LOGIN ERROR
            const alerta = {
                msg: error.response.data.message,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    //Retorna los datos del usuario autenticado
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');//El token lo necesitaremos para consultar el endpoint que me da el user
        if(token){
            //Aca le agregaremos el token como header para el request para poder consultar correctamente al servidor
            tokenAuth(token);
        }
        try{
            console.log("I am here");
            const respuesta = await clienteAxios.get('/users/auth');
            // console.log(respuesta);
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })
        }catch(error){
            console.log(error);
            dispatch({
                type: LOGIN_ERROR,
            })
        }
    }
    //Cerrar sesion
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION,
        })
    }

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                mensaje: state.mensaje,
                usuario: state.usuario,
                cargando: state.cargando,
                loguearUsuario,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;