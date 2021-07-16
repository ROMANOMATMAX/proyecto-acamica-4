import React, {Fragment, useState, useEffect, useContext} from 'react';
import swal from 'sweetalert';
import Header from '../shared/Header'
import ContactContext from '../../context/contacts/contactContext';
import UserContext from '../../context/usuarios/userContext';
import { Form, Input, Button, Select } from 'antd';
import { Row, Col } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
// import ('./css/newContact.css')


const NewUser = (props) => {
    //State necesarios para el componente
    const [activeCountrySelect, setActiveCountrySelect] = useState(true);
    const [placeHolderCountry, setPlaceHolderCountry] = useState("First select region");
    const [activeCitySelect, setActiveCitySelect] = useState(true);       
    const [placeHolderCity, setPlaceHolderCity] = useState("First select country");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    const [mostrarMensajeExito, setMostrarMensajeExito] = useState(false);
    const [mostrarMensajeError, setMostrarMensajeError] = useState(false);
    //Traigo el context de contactos
    const contactContext = useContext(ContactContext);
    const {regiones, paisesDeRegion, getRegions, getCountriesByRegion, ciudadesDePais, companias, getCitiesByCountry, getCompanies, fillRegionField, fillCountryField, fillCityField, regionName, country, city} = contactContext;
    const userContext = useContext(UserContext);
    const { crearUsuario} = userContext;
    //UseEffect
    useEffect(() => {
        console.log("Entre al use effect de nuevo contacto");
        getRegions();
        getCompanies();
        // console.log(regiones.map(item => {
        //     console.log("hola mundo");
        // }));
    }, [])
    
    useEffect(() => {
        if(passwordTwo === "" && passwordOne === ""){
            setMostrarMensajeExito(false);
            setMostrarMensajeError(false);
        }
        if(passwordOne !== "" && passwordTwo === ""){
            setMostrarMensajeExito(false);
            setMostrarMensajeError(true);
        }
        if(passwordTwo !== "" && passwordOne === ""){
            setMostrarMensajeExito(false);
            setMostrarMensajeError(true);
        }
        if((passwordOne !== "" && passwordTwo !== "")&&(passwordOne !== passwordTwo)){
            setMostrarMensajeExito(false);
            setMostrarMensajeError(true);
        }
        if((passwordOne !== "" && passwordTwo !== "")&&(passwordOne === passwordTwo)){
            setMostrarMensajeExito(true);
            setMostrarMensajeError(false);
        }
    }, [passwordOne, passwordTwo])


    const layout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 9 },
    };
    const tailLayout = {
        wrapperCol: { offset: 12, span: 12 },
    };
      
    const { Option } = Select;

    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('vertical');

    const onFormLayoutChange = ({ layout }) => {
        setFormLayout(layout);
    }

    const onRegionChange = (value, datos, hola, hola2) => {
        console.log(value);
        console.log(datos);
        fillRegionField(value);
        form.resetFields(['country', 'city']);
        form.setFieldsValue({
            fk_region_id: value,
          });
        setActiveCountrySelect(false)
        setPlaceHolderCountry("Select country")
        // setRegion(e.target.name);
        getCountriesByRegion(value);
    }

    const onCityChange = (value, datos) => {
        // console.log(value);
        console.log(datos);
        fillCityField(value);
        form.setFieldsValue({
            fk_city_id: value,
          });
        // setCity(datos.children);
        // setCity(value);
    }

    const onCountryChange = (value, datos) => {
        console.log(value);
        console.log(datos);
        fillCountryField(value);
        form.setFieldsValue({
            fk_country_id: value,
          });
        // setCountry(datos.children)
        form.resetFields(['city']);
        setActiveCitySelect(false)
        setPlaceHolderCity("Select city")
        // setCountry(value);
        getCitiesByCountry(value)
    }

    const onGenderChange = (value) => {
        // console.log(value);
        // setRegion(value);
    }
    const onCompanyChange = (value) => {
        console.log(value);
        form.setFieldsValue({
            company_id: value,
        });
    }

      const onFinish = (values) => {
        console.log(values);
        if(!mostrarMensajeExito){
            swal("Por favor chequee las contraseñas", {
                icon: "warning",
              });
        }else{
            crearUsuario(values);
            swal("A new user has been saved!", {
                icon: "success",
                // title: 'A new contact has been saved',
                buttons: false,
                timer: 1500
              });
              props.history.push('/usuarios')
        }
      };
    
      const onReset = () => {
        form.resetFields();
      };
    
      const onFill = () => {
        form.setFieldsValue({
          note: 'Hello world!',
          gender: 'male',
        });
      };

      const arrayTest = [
          {
            region_id: 1,
            region_name: "test"
          },
          {
            region_id: 2,
            region_name: "test"
          },
          {
            region_id: 3,
            region_name: "test"
          },
      ]

    const onChangePassOne = (e) => {
        console.log(e.target.value);
        setPasswordOne(e.target.value)
    }
    const onChangePassTwo = (e) => {
        console.log(e.target.value);
        setPasswordTwo(e.target.value)
    }
    return (  
        <Fragment>
            <Header/>
            <h1>Complete con los datos del nuevo contacto</h1>
            <div className="d-flex justify-content-center">
                <Form layout={formLayout} form={form} name="control-hooks" onFinish={onFinish} className="formulario">
                    <Row gutter={16}>
                        <Col span={8}></Col>
                        <Col span={8}>
                            <Form.Item 
                                name="fullname" 
                                label="Name" 
                                rules={[{ required: true, message: 'Please enter user fullname!!' }]}
                            >
                                <Input placeholder="Enter user name"/>
                            </Form.Item>
                        </Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row gutter={16}>
                            <Col span={8}></Col>
                            <Col span={8}>
                            <Form.Item 
                                name="email" 
                                label="Email" 
                                rules={[{ required: true, message: 'Please enter user email!!' }]}    
                            >
                                <Input placeholder="Enter user email"/>
                            </Form.Item>
                        </Col>
                            <Col span={8}></Col>
                    </Row>
                    <Row gutter={16}>
                            <Col span={8}></Col>
                            <Col span={8}>
                            <Form.Item 
                                name="password" 
                                label="Password" 
                                onChange={onChangePassOne}
                                rules={[{ required: true, message: 'Please enter user password!!' }]}    
                            >
                                <Input.Password placeholder="Enter your password"/>
                            </Form.Item>
                        </Col>
                            <Col span={8}></Col>
                    </Row>  
                    <Row gutter={16}>
                            <Col span={8}></Col>
                            <Col span={8}>
                            <Form.Item name="doblepassword" label="Confirm password" onChange={onChangePassTwo}>
                                <Input.Password placeholder="Enter your password again"/>
                            </Form.Item>
                        </Col>
                            <Col span={8}></Col>
                    </Row> 
                    <Row gutter={16} className="mb-3">
                            <Col span={8}></Col>
                            <Col span={8}>
                            {mostrarMensajeExito ? <div><div className="text-success" role="alert">Same passwords!!</div></div> : null}
                            {mostrarMensajeError ? <div><div className="text-danger" role="alert">The passwords are different!</div></div> : null}
                        </Col>
                            <Col span={8}></Col>
                    </Row> 
                    <Row gutter={16}>
                            <Col span={8}></Col>
                            <Col span={8}>
                            <Form.Item 
                                name="role" 
                                label="Role" 
                                rules={[{ required: true, message: 'Select Role' }]}
                                // rules={[{ required: true, message: 'Select one contact channel!!' }]}
                            >
                                <Select
                                placeholder="Select the role of the user"
                                // onChange={onPreferenceChange}
                                allowClear
                                >
                                <Option value="BASIC">BASIC</Option>
                                <Option value="ADMIN">ADMIN</Option>
                                </Select>
                            </Form.Item>
                            </Col>
                            <Col span={8}></Col>
                    </Row>   
                    <Row>
                    <Col span={7}></Col>
                        <Form.Item {...tailLayout}>
                            <Button htmlType="submit" type="primary">
                                Submit
                            </Button>
                        </Form.Item>
                </Row>                            
            </Form>
        </div>
    </Fragment>
    );
}
 
export default NewUser;