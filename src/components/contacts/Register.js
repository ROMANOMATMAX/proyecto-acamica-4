import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/authentication/authContext';
import ContactContext from '../../context/contacts/contactContext';
import { Table, Radio, Divider, Dropdown } from 'antd';
import './css/register.css'
import logo from './img/logo-test.jpg'; // with import
import avatar from './img/avatar.jpg'; // with import
const Register = () => {
    //Estado para manejar el manu de cerrar sesion
    const [isActive, setActive] = useState(false);
    //DropDownManu function
    const dropDownMenu = () => {
        setActive(!isActive)
    }
    //Extraer la informacion de la autenticacion
    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = authContext;
    //Extraer la informacion del contact context
    const contactContext = useContext(ContactContext);
    const { contactos, obtenerContactos} = contactContext;
    //Para obtener la info del usuario cuando la pagina se actualice vamos a usar useEffect
    useEffect(() => {
        usuarioAutenticado();
        obtenerContactos();
    }, [])

    //Configuraciones de la tabla de contactos
    const columns = [
        {
          title: 'Name',
          dataIndex: 'fullname',
        //   render: (text) => <a>{text}</a>,
        },
        {
          title: 'Email',
          dataIndex: 'email',
        },
        {
          title: 'Address',
          dataIndex: 'address',
        },
        {
            title: 'Contact channels',
            dataIndex: 'contactChannel',
        },
        {
            title: 'Company',
            dataIndex: 'company_name',
        },
        {
            title: 'City',
            dataIndex: 'city_name',
        }
      ];

    const [selectionType, setSelectionType] = useState('checkbox');

    const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
        },
        {
          key: '4',
          name: 'Disabled User',
          age: 99,
          address: 'Sidney No. 1 Lake Park',
        },
      ];
    const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
    }),
    };

    const prueba = () => {
        console.log("hello world");
    }

    return (  
        <div>
        <header>
            <div className="logo-container">
                <img src={logo} alt="" className="w-100"/>
            </div>
            <ul>
                <li>Contactos</li>
                <li>Compañias</li>
                <li>Usuarios</li>
                <li>
                    <Link to={'/regiones'} className='enlace-cuenta'>
                    Regiones/paises
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
                    <p>Sign in as: MR</p>
                    <button onClick={() => cerrarSesion()}>Cerrar Session</button>
                </div>
            </div>
        </header>
        {/* <header>
            {usuario 
            ? (<p>{usuario[0].fullname}</p>)
            : null}
            <button
            onClick={() => cerrarSesion()}
            >
                Cerrar Sesion
            </button>
        </header> */}
        <Radio.Group
        onChange={({ target: { value } }) => {
            setSelectionType(value);
        }}
        value={selectionType}
        >
        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">radio</Radio>
        </Radio.Group>

        <Divider />

        <Table
        rowSelection={{
            type: selectionType,
            ...rowSelection,
        }}
        columns={columns}
        dataSource={contactos       }
        />
        </div>
    );
}
 
export default Register;