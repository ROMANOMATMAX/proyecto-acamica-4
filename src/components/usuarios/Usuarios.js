import React, {Fragment, useState, useContext, useEffect} from 'react';
import swal from 'sweetalert';
import Header from '../shared/Header'
import {Link} from 'react-router-dom';
import UserContext from '../../context/usuarios/userContext';
import { Table, Radio, Divider, Dropdown, Tag, Space } from 'antd';
import ContactContext from '../../context/contacts/contactContext';
const Companias = () => {
    const userContext = useContext(UserContext);
    const { usuarios, obtenerUsuarios, updateCurrentUser, deleteCurrentUser, deleteUser} = userContext;
    useEffect(() => {
        localStorage.removeItem('currentUser')
        deleteCurrentUser();
        obtenerUsuarios();
    }, [])
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
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <Space size="middle">
                <a onClick={updateItem}>
                    <Link to={'/modify-user'} className='enlace-cuenta'>
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
            fullname: "Romano Matias",
            email: "mercadolibre@gmail.com",
            password: "jaecmaceace",
            role: "ADMIN",
            active: 1
        },
        {
            id: 32,
            fullname: "Jimena Carolina",
            email: "mercadolibre@gmail.com",
            password: "jaecmaceace",
            role: "ADMIN",
            active: 1
        },
        {
            id: 33,
            fullname: "Agustina Rivera",
            email: "mercadolibre@gmail.com",
            password: "jaecmaceace",
            role: "ADMIN",
            active: 1
        }
    ]
    
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
    const deleteItem = (e) => {
        console.log(e.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data-row-key"))
        console.log("you are deleting an item");
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this user!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
            deleteUser(e.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data-row-key"));
            console.log("you are deleting an item");
            swal("The user has been deleted!", {
                icon: "success",
            });
            } else {
            swal("The user is safe!");
            }
        });
    }
    const updateItem = (e) => {
        console.log(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("data-row-key"))
        // console.log("you are updating an item");
        updateCurrentUser(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("data-row-key"))
    }
    return (  
        <Fragment>
            <Header/>
            <div className="d-flex justify-content-end px-4">
                <Link to={'/add-new-user'} className='btn btn-primary'>
                    Add new user
                </Link>
            </div>
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

            <Table
            className="overflow-scroll"
            rowSelection={{
                type: selectionType,
                ...rowSelection,
            }}
            columns={columns}
            dataSource={usuarios }
            />
        </Fragment>
    );
}
 
export default Companias;