// import React, {useReducer} from 'react';
// import CompaniaContext from './companiaContext';
// import CompaniaReducer from './companiaReducer';
// import clienteAxios from '../../config/axios'
// import tokenAuth from '../../config/token'
// import {
// } from '../../types'

// const CompaniaState = props => {
//     //Estado inicial
//     const initialState = {
//         companias: []
//     }
//     //Asociar with useReducer the function and the state
//     const [state, dispatch] = useReducer(CompaniaReducer, initialState);
//     //Funciones dispatch
//     //funcion para obtener todos los contactos 
//     const obtenerCompanias = async () => {
//         const token = localStorage.getItem('token');
//         if(token){
//             tokenAuth(token);
//         }
//         try{//vamos a tratar traer todos los contactos
//             const respuesta = await clienteAxios.get('/companies/allCompanies');
//             // console.log(respuesta.data);
//             // console.log(dataContactNeeded);
//             dispatch({
//                 type: OBTENER_COMPANIAS,
//                 payload: respuesta
//             })
//         }catch(error){
//             console.log(error);
//             // dispatch({
//             //     type: LOGIN_ERROR,
//             // })
//         }
//     }
//     //retornamos el provider
//     return(
//         <CompaniaContext.Provider
//             value={{

//                 obtenerCompanias
//             }}
//         >
//             {props.children}
//         </CompaniaContext.Provider>
//     )
// }

// export default CompaniaState;