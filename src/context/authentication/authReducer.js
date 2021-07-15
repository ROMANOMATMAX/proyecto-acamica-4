import {
    LOGIN_EXITOSO,
    LOGIN_ERROR, 
    OBTENER_USUARIO,
    CERRAR_SESION
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.message);
            return{
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false,
            }
        case LOGIN_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                mensaje: action.payload,
                cargando: false,
            }
        case OBTENER_USUARIO:
        return {
            ...state,
            autenticado: true,
            usuario: action.payload,
            cargando: false,
        }
        case CERRAR_SESION:
            return {
                ...state,
                token: null,
                usuario: {},
                autenticado: null,
                cargando: false,
            }
        default:
            return state;
    }

}