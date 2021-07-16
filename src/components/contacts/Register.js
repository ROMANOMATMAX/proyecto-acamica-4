import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/authentication/authContext';
import ContactContext from '../../context/contacts/contactContext';
import { Table, Radio, Divider, Dropdown, Tag, Space, Button } from 'antd';
import './css/register.css'
import Header from '../shared/Header'
import SearchContact from '../shared/SearchContact'
import swal from 'sweetalert';

// import logo from './img/logo-test.jpg'; // with import
// import avatar from './img/avatar.jpg'; // with import
const Register = () => {

    if(!localStorage.getItem('currentComponent')){
    localStorage.setItem('currentComponent', "/registrarse");
    }else{
        localStorage.removeItem("currentComponent");
        localStorage.setItem('currentComponent', "/registrarse");
    }
    //Estado para manejar el manu de cerrar sesion
    const [isActive, setActive] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [filterActive, setFilterActive] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [deleteGroup, setDeleteGroup] = useState(false)
    const [loading, setLoading] = useState(false);
    const [hasSelectedState, setHasSelectedState] = useState(false);
    //DropDownManu function
    const dropDownMenu = () => {
        setActive(!isActive)
    }
    //Traigo el context de alertas
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta, ocultarAlarma} = alertaContext; 
    //Extraer la informacion de la autenticacion
    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = authContext;
    //Extraer la informacion del contact context
    const contactContext = useContext(ContactContext);
    const { contactos, filterForm, deleteFilter, obtenerContactos, deleteContact, updateCurrentContact, modifiedFilterForm, modifiedDeleteFilter, allChannelsOfOneContact, deleteAllChannelsOfOneContact, deleteCurrentContact} = contactContext;
    //Para obtener la info del usuario cuando la pagina se actualice vamos a usar useEffect
    useEffect(() => {
        console.log("useEffect 1");
        localStorage.removeItem('currentContactChannels')
        localStorage.removeItem('currentContact')
        // updateCurrentContact({})
        deleteCurrentContact();
        deleteAllChannelsOfOneContact();
        usuarioAutenticado();
        obtenerContactos();
    }, [])
  //   useEffect(() => {
  //     console.log("useEffect 2");
  //     searchBtn.current.click()
  //     if(filterActive){
  //       setFilterActive(false);
  //     }else{
  //       setFilterActive(true)
  //     }
  
  // }, [contactos])
    //Configuraciones de la tabla de contactos
    const columns = [
        {
          title: 'Name',
          dataIndex: 'fullname',
        //   render: (text) => <a>{text}</a>,
        responsive: ['lg'],
        },
        {
          title: 'Email',
          dataIndex: 'email',
          responsive: ['lg'],
        },
        {
          title: 'Charge',
          dataIndex: 'charge',
          responsive: ['lg'],
        },
        {
          title: 'Country',
          dataIndex: 'fk_country_id',
          responsive: ['lg'],
        },
        {
          title: 'City',
          dataIndex: 'fk_city_id',
          responsive: ['lg'],
        },
        {
          title: 'Address',
          dataIndex: 'address',
          responsive: ['lg'],
        },
        {
            title: 'Company',
            dataIndex: 'company_name',
            responsive: ['lg'],
        },
        {
          title: 'Whatsapp',
          dataIndex: 'whatsapp',
          responsive: ['lg'],
        },
        {
          title: 'Llamada',
          dataIndex: 'llamada',
          responsive: ['lg'],
        },
        {
          title: 'Email Channel',
          dataIndex: 'emailchannel',
          responsive: ['lg'],
        },
        {
          title: 'LinkedIn',
          dataIndex: 'linkedIn',
          responsive: ['lg'],
        },
        {
          title: 'Facebook',
          dataIndex: 'facebook',
          responsive: ['lg'],
        },
        {
          title: 'Instagram',
          dataIndex: 'instagram',
          responsive: ['lg'],
        },
          {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <Space size="middle">
                <a>
                  <Link to={'/modify-contact'} className='enlace-cuenta' onClick={updateItem}>
                    Update  
                  </Link>
                </a>
                <a onClick={deleteItem}>Delete</a>
              </Space>
            ),
          },
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

    const onSelectChange = selectedRowKeys => {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      console.log(selectedRowKeys.length);
      setSelectedRowKeys([...selectedRowKeys])
      if(selectedRowKeys.length >0){
        console.log("mayor que 0");
        setHasSelectedState(true);
        setDeleteGroup(true);  
      }else{
        console.log("menor o igual que 0");
        setHasSelectedState(false);
        setDeleteGroup(false);
      }
    };  

    const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
    }),
    };

    const prueba = () => {
        console.log("hello world");
    }

    const deleteItem = (e) => {
      console.log(e.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data-row-key"));
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this contact!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          deleteContact(e.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data-row-key"));
          console.log("you are deleting an item");
          mostrarAlerta("You have deleted a contact")
          ocultarAlarma();
          swal("The contact has been deleted!", {
            icon: "success",
          });
        } else {
          swal("The contact is safe!");
        }
      });
    }
    const updateItem = (e) => {
      console.log(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("data-row-key"))
      //Tengo que de alguna manera actualizar un estado que tenga el id del item en cuestion o la info del item en cuestion
      updateCurrentContact(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("data-row-key"))
      allChannelsOfOneContact(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("data-row-key"))
      console.log("you are updating an item");
    }

    const onClickSearch = () => {
      console.log("hizo click");
      modifiedFilterForm();
    }
  
    const onClickDeleteFilter = () => {
      swal("Filtro eliminado");
      obtenerContactos();
      modifiedDeleteFilter();
      console.log(selectedRowKeys)
    }
    const start = () => {
      setLoading(true);
      // ajax request after empty completing
      setTimeout(() => {
        setSelectedRowKeys([]);
        setLoading(false);
        setDeleteGroup(false);
        setHasSelectedState(false);
      }, 1000);
    };

    const onClickDeleteSelected = () => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover these contacts!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            console.log("You can now delete al this items", selectedRowKeys);
            selectedRowKeys.forEach(row => {
              deleteContact(row);
            })
            setHasSelectedState(false);
            setDeleteGroup(false);
            swal("The selected contacts have been deleted!", {
                icon: "success",
            });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    // console.log("You can now delete al this items", selectedRowKeys);
    // selectedRowKeys.forEach(row => {
    //   console.log(row);
    // })
    // setHasSelectedState(false);
    // setDeleteGroup(false);
    obtenerContactos();
    }
    return (  
        <div>
        <Header/>
        <div className="d-flex justify-content-between px-4 mx-4">
          <div className="d-flex color-gris">
                <div className="d-flex align-items-center mx-4 text-white">Search contact</div>
                <a className="btn btn-primary" onClick={onClickSearch}><i class="fas fa-search"></i></a>
          </div>
          <Link to={'/add-new-contact'} className='btn btn-primary'>
              Add new contact
          </Link>
        </div>
        {filterForm ? <SearchContact /> : null}
        {alerta ? ( <div className="alert alert-success position-fixed top-0 left-0 index-3">{alerta.msg}</div>): null}
        {/* <div className="alert alert-success position-fixed index-3" style={{"z-index":3}}>Borrado Exitoso</div> */}
        <Radio.Group
        onChange={({ target: { value } }) => {
            setSelectionType(value);
        }}
        value={selectionType}
        >
        {/* <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">radio</Radio> */}
        </Radio.Group>

        <Divider />
        <div style={{ marginBottom: 16 }} className="mx-5">
          <Button type="primary" onClick={start} disabled={!hasSelectedState} loading={loading}>
            Reload
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelectedState ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table
        className="overflow-scroll"
        rowSelection={{
            type: selectionType,
            ...rowSelection,
        }}
        columns={columns}
        dataSource={contactos}
        />
        {deleteFilter ? <div className="d-flex justify-content-center my-4"><a className="btn btn-primary" onClick={onClickDeleteFilter}>Eliminar Filtros</a></div> : null}
        
        {deleteGroup ? <div className="d-flex justify-content-center my-4"><a className="btn btn-primary" onClick={onClickDeleteSelected}>delete selected</a></div> : null}
        </div>
    );
}
 
export default Register;