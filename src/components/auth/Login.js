import React, {useContext, useState, useEffect} from 'react';
import styled from '@emotion/styled';
import {Link} from 'react-router-dom';
import authContext from '../../context/authentication/authContext'
import AlertaContext from '../../context/alertas/alertaContext'

const ContenedorLoginForm = styled.div`
    /* background-color: #26c6da; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width:30%;
    border: 1px solid #ced4da;
    padding: 1vh 2%;
    /* padding: 3vh 10%; */
`;


const Login = (props) => {
    if(!localStorage.getItem('currentComponent')){
        localStorage.setItem('currentComponent', "/");
    }else{
        localStorage.removeItem("currentComponent");
        localStorage.setItem('currentComponent', "/");
    }
    //Traigo el context de alertas
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta, ocultarAlarma} = alertaContext; 

    //Traigo el context de authentication
    const authsContext = useContext(authContext);
    const {token, autenticado, mensaje, loguearUsuario} = authsContext; 
    //En caso de que el usuario se haya autenticado o se haya logueado con error
    useEffect(() => {
        console.log(autenticado);
        if(autenticado) {
            console.log("helloworld");
            props.history.push('/registrarse');
        }
        if(mensaje) {
            console.log("hay mensaje error");
            console.log(mensaje.msg);
            mostrarAlerta(mensaje.msg, mensaje.categoria)
            ocultarAlarma();
        }
    }, [mensaje, autenticado, props.history])

    //State
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })
    //destructuring of the state 
    const {email, password} = credentials;
    //Funcion para manejar los cambios en los inputs
    const onChangeHandle = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }
    //Funcion para manejar los submit del formulario
    const onSubmitHandle = (e) => {
        e.preventDefault();

        //Validar que nada venga vacio
        if(email.trim()==='' || password.trim()===''){
            console.log("Algo dato es erroneo");
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            ocultarAlarma();
            return;
        }
        //Pasar los datos a un estado 
        loguearUsuario({
            email,
            password
        })
    }

    return (  
        <ContenedorLoginForm>
            <h1 className="text-primary text-center my-5">Data Warehouse</h1>
            {alerta 
            ? (<div className="alert alert-danger">{alerta.msg}</div>)
            : null}
            <Form
            onSubmit={onSubmitHandle}
            >
                <label 
                htmlFor="email"
                className="form-label"
                >Email</label>
                <input 
                type="email" 
                name="email"
                value={email}
                onChange={onChangeHandle}
                className="form-control mb-3"
                />
                <label 
                htmlFor="password"
                className="form-label"
                >Password</label>
                <input 
                type="password" 
                name="password"
                value={password}
                onChange={onChangeHandle}
                className="form-control mb-3"
                />
                <input 
                type="submit" 
                value="login" 
                className="btn  btn-primary mb-3 w-25"
                />
            </Form>
        </ContenedorLoginForm>
    );
}
 
export default Login;