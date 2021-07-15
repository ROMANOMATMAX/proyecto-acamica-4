import React, {useReducer} from 'react';
import UserContext from './userContext';
import UserReducer from './userReducer';
import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/token';
import {
  OBTENER_USUARIOS,
  UPDATE_CURRENT_USER,
  DELETE_CURRENT_USER,
  DELETE_USER
} from '../../types'


const UserState = props => {
    const initialState = {
        usuarios: [],
        currentUser: {}
    }

    const [state, dispatch] = useReducer(UserReducer, initialState)
    //Funciones with dispatch
    const obtenerUsuarios = async () => {
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        try {
            const respuesta = await clienteAxios.get('/users/getUsers');
            console.log(respuesta.data.activesModified);
            dispatch({
                type: OBTENER_USUARIOS,
                payload: respuesta.data.activesModified
            })
        }catch(error) {
            console.log(error)
            // dispatch({
            //     type: ERROR_OBTENER_REGIONES,
            // })
        }
    }
    const crearUsuario = async (userData) => {
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        try {
            const respuesta = await clienteAxios.post('/users/addUser', userData);
            obtenerUsuarios();
        }catch(error) {
            console.log(error)
            // dispatch({
            //     type: ERROR_OBTENER_REGIONES,
            // })
        }
    }
    const updateCurrentUser = async (userId) =>{
        dispatch({
            type: UPDATE_CURRENT_USER,
            payload: userId
        })
    }
    const deleteCurrentUser = async() => {
        // localStorage.setItem('currentContact', contactId)
        dispatch({
            type: DELETE_CURRENT_USER
        })
    }
    const updateCurrentUserInDB = async (userId, dataUser) => {
        console.log(userId);
        console.log(dataUser);
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        //ACTUALIZO EL CONTACTO SIN TENER EN CUENTA SUS CONTACT CHANNELS
        const companiesList = await clienteAxios.put(`/users/modifyUser/${userId}`, dataUser);
        //A la info que me llego de los contact channels le agrego el contact_id
        obtenerUsuarios();
    }

    const deleteUser = async (userId) => {
        console.log(userId);
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        const companiesList = await clienteAxios.delete(`/users/desactiveUser/${userId}`);
        dispatch({
            type: DELETE_USER,
            payload: userId
        })
    }
    return(
        <UserContext.Provider
            value={{
                usuarios: state.usuarios,
                obtenerUsuarios,
                crearUsuario,
                updateCurrentUser,
                deleteCurrentUser,
                updateCurrentUserInDB,
                deleteUser
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;