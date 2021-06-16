import React, {useReducer} from 'react';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/token'
import {
    OBTENER_CONTACTOS
} from '../../types'

const ContactState = props => {
    //Estado inicial
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        contactos: null,
    }
    //Asociar with useReducer the function and the state
    const [state, dispatch] = useReducer(ContactReducer, initialState);
    //Funciones dispatch
    //funcion para obtener todos los contactos 
    const obtenerContactos = async () => {
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        try{//vamos a tratar traer todos los contactos
            const respuesta = await clienteAxios.get('/contacts/allContacts');
            // console.log(respuesta.data);
            const dataContactNeeded = respuesta.data.map( item => (
                {
                    key: item.id.toString(),
                    fullname: item.fullname,
                    email: item.email,
                    address: item.address,
                    contactChannel: item.contactChannel,
                    company_name: item.name,
                    city_name: item.city_name,
                }
            )
            )
            console.log(dataContactNeeded);
            dispatch({
                type: OBTENER_CONTACTOS,
                payload: dataContactNeeded
            })
        }catch(error){
            console.log(error);
            // dispatch({
            //     type: LOGIN_ERROR,
            // })
        }
    }
    //retornamos el provider
    return(
        <ContactContext.Provider
            value={{
                contactos: state.contactos,
                obtenerContactos
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;