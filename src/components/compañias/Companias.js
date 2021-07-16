import React, {Fragment, useState, useContext, useEffect} from 'react';
import swal from 'sweetalert';
import AlertaContext from '../../context/alertas/alertaContext'
import Header from '../shared/Header'
import {Link} from 'react-router-dom';
import { Table, Radio, Divider, Dropdown, Tag, Space, Button} from 'antd';
import ContactContext from '../../context/contacts/contactContext';
const Companias = () => {
    if(!localStorage.getItem('currentComponent')){
        localStorage.setItem('currentComponent', "/companias");
    }else{
        localStorage.removeItem("currentComponent");
        localStorage.setItem('currentComponent', "/companias");
    }
    const [loading, setLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [hasSelectedState, setHasSelectedState] = useState(false);
    const [deleteGroup, setDeleteGroup] = useState(false)
    //Traigo el context de alertas
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta, ocultarAlarma} = alertaContext; 
    //Traigo el context de contactos
    const contactContext = useContext(ContactContext);
    const { companias, getCompanies, updateCurrentCompany, deleteCompany, deleteCurrentCompany} = contactContext;
    useEffect(() => {
        getCompanies();
        localStorage.removeItem('currentCompany')
        deleteCurrentCompany();
    }, [])
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
        //   render: (text) => <a>{text}</a>,
        },
        {
          title: 'Country',
          dataIndex: 'country_name',
        },
        {
          title: 'City',
          dataIndex: 'city_name'
        },
        {
          title: 'Address',
          dataIndex: 'address',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone number',
            dataIndex: 'phone',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                <a onClick={updateItem}>
                  <Link to={'/modify-company'} className='enlace-cuenta'>
                    Update  
                  </Link>
                </a>
                <a onClick={deleteItem}>Delete</a>
              </Space>
            ),
        },
      ];
      const [selectionType, setSelectionType] = useState('checkbox');
    const data =  [
        {
            id: 31,
            name: "Mercado Libre",
            address: "Belgrano 121",
            email: "mercadolibre@gmail.com",
            phone: "3884137627",
            country_name: "argentina",
            city_name: "Cordoba"
        },
        {
            id: 32,
            name: "Google",
            address: "Belgrano 121",
            email: "mercadolibre@gmail.com",
            phone: "3884137627",
            country_name: "argentina",
            city_name: "Cordoba"
        },
        {
            id: 33,
            name: "Globant",
            address: "Belgrano 121",
            email: "mercadolibre@gmail.com",
            phone: "3884137627",
            country_name: "argentina",
            city_name: "Cordoba"
        }
    ]

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
    const deleteItem = (e) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this company!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
            deleteCompany(e.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data-row-key"))
            console.log("you are deleting an item");
              mostrarAlerta("You have deleted a contact")
              ocultarAlarma();
              swal("The company has been deleted!", {
                icon: "success",
              });
            } else {
              swal("The company is safe!");
            }
          });
        // console.log(e.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data-row-key"))
        // deleteCompany(e.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data-row-key"))
        // console.log("you are deleting an item");
        // mostrarAlerta("You have deleted a company")
        // ocultarAlarma();
    }
    const updateItem = (e) => {
        console.log(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("data-row-key"))
        updateCurrentCompany(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("data-row-key"))
        console.log("you are updating an item");
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
            text: "Once deleted, you will not be able to recover these companies!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                console.log("You can now delete al this items", selectedRowKeys);
                selectedRowKeys.forEach(row => {
                    deleteCompany(row)
                })
                setHasSelectedState(false);
                setDeleteGroup(false);
                swal("The selected companies have been deleted!", {
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
        getCompanies();
      }
    return (  
        <Fragment>
            <Header/>
            <div className="d-flex justify-content-end px-4">
                <Link to={'/add-new-company'} className='btn btn-primary'>
                Add new company
                </Link>
            </div>
            {alerta ? ( <div className="alert alert-success position-fixed top-0 left-0 index-3">{alerta.msg}</div>): null}
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
            dataSource={companias }
            />
            {deleteGroup ? <div className="d-flex justify-content-center my-4"><a className="btn btn-primary" onClick={onClickDeleteSelected}>delete selected</a></div> : null}
        </Fragment>
    );
}
 
export default Companias;