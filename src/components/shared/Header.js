import React, {useState, useContext, useRef} from 'react';
import {Link} from 'react-router-dom';
import logo from './img/logo-test.jpg'; // with import
import logoUno from './img/logoUno.png'; // with import
import logoDos from './img/logoDos.png'; // with import
import logoTres from './img/logoTres.png'; // with import
import logoCuatro from './img/logoCuatro.png'; // with import
import avatar from './img/avatar.jpg'; // with import
import './css/register.css'
import AuthContext from '../../context/authentication/authContext';
const Header = (props) => {

    const { setBackToForm, backToForm} = props;
    console.log(backToForm);

    //Estado para manejar el manu de cerrar sesion
    const [isActive, setActive] = useState(false);
    //DropDownManu function
    const dropDownMenu = () => {
        setActive(!isActive)
    }
    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = authContext;
    const currentContact = () => {
        if(!localStorage.getItem('currentComponent')){
            localStorage.setItem('currentComponent', "/registrarse");
        }else{
            localStorage.removeItem("currentComponent");
            localStorage.setItem('currentComponent', "/registrarse");
        }
    }
    const currentCompania = () => {
        if(!localStorage.getItem('currentComponent')){
            localStorage.setItem('currentComponent', "/companias");
        }else{
            localStorage.removeItem("currentComponent");
            localStorage.setItem('currentComponent', "/companias");
        }
    }
    const currentUsuarios = () => {
        if(!localStorage.getItem('currentComponent')){
            localStorage.setItem('currentComponent', "/usuarios");
        }else{
            localStorage.removeItem("currentComponent");
            localStorage.setItem('currentComponent', "/usuarios");
        }
    }
    const currentRegiones = () => {
        if(!localStorage.getItem('currentComponent')){
            localStorage.setItem('currentComponent', "/regiones");
        }else{
            localStorage.removeItem("currentComponent");
            localStorage.setItem('currentComponent', "/regiones");
        }
        if(props.backToForm){
            setBackToForm(false)
        }
    }
    return (  
        <header className="my-4">
            <div className="logo-container">
                <img src={logoCuatro} alt="" className="w-100"/>
            </div>
            <ul>
                <li>
                    <Link to={'/registrarse'} className='enlace-cuenta' onClick={currentContact}>
                    Contacts
                    </Link>
                </li>
                <li>
                    <Link to={'/companias'} className='enlace-cuenta' onClick={currentCompania}>
                    Companies
                    </Link>
                </li>
                {/* <li>
                    <Link to={'/usuarios'} className='enlace-cuenta' onClick={currentUsuarios}>
                    {usuario.role}
                    </Link>
                </li> */}
                {usuario.role === "ADMIN" ? <li>
                    <Link to={'/usuarios'} className='enlace-cuenta' onClick={currentUsuarios}>
                    Users
                    </Link>
                </li>
                : null}
                <li>
                    <Link to={'/regiones'} className='enlace-cuenta' onClick={currentRegiones}>
                    Regions/countries
                    </Link>
                </li>
            </ul>

            <div className="avatar-session-container">
                <div className="img-avatar-container">
                    <img src={avatar} alt="" className="w-100"/>
                </div>
                <span id="option-session" className="align-self-center" onClick={dropDownMenu}>
                    <i className="fas fa-caret-down"></i>
                </span>
            </div>
            <div className={isActive ? "menu-close-session display-menu" : "menu-close-session"}>
                <div className="close-session-list">
                    <p className="mx-1 text-white">Sign in as: {usuario.fullname}</p>
                    <button onClick={() => cerrarSesion()}>Exit</button>
                </div>
            </div>
        </header>
    );
}
 
export default Header;