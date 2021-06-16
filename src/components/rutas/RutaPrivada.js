import React, {useContext, useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthContext from '../../context/authentication/authContext';

const RutaPrivada = ({component: Component, ...props}) => {//Compónente que toma un componente

    const authContext = useContext(AuthContext);
    const {autenticado, cargando, usuarioAutenticado} = authContext;

    useEffect(() => {
       usuarioAutenticado(); 
    }, [])

    return(
        <Route {...props} render={props => !autenticado && !cargando ? (
            <Redirect to="/" />
        ):(
            <Component {...props}/>
        )}

        />
    );  
}

export default RutaPrivada