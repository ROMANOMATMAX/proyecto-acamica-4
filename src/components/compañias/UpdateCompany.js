import React, {Fragment, useState, useEffect, useContext} from 'react';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext'
import Header from '../shared/Header'
import ContactContext from '../../context/contacts/contactContext';
import { Form, Input, Button, Select } from 'antd';
import { Row, Col } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
// import ('./css/newContact.css')


const UpdateCompany = (props) => {
    // if(!localStorage.getItem('currentComponent')){
    //     localStorage.setItem('currentComponent', "/add-new-company");
    // }else{
    //     localStorage.removeItem("currentComponent");
    //     localStorage.setItem('currentComponent', "/add-new-company");
    // }
    //State necesarios para el componente
    const [activeCountrySelect, setActiveCountrySelect] = useState(true);
    const [placeHolderCountry, setPlaceHolderCountry] = useState("First select region");
    const [activeCitySelect, setActiveCitySelect] = useState(true);       
    const [placeHolderCity, setPlaceHolderCity] = useState("First select country");
    const [activeInputForAddress, setActiveInputForAddress] = useState(false);
    //Traigo el context de alertas
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta, ocultarAlarma} = alertaContext; 
    //Traigo el context de contactos
    const contactContext = useContext(ContactContext);
    const {regiones, paisesDeRegion, getRegions, getCountriesByRegion, ciudadesDePais, companias, getCitiesByCountry, getCompanies, fillRegionField, fillCountryField, fillCityField, regionName, country, city, createCompany, updateCurrentCompanyInDB} = contactContext;
    //UseEffect
    useEffect(() => {
        console.log("Entre al use effect de nuevo contacto");
        getRegions();
        getCompanies();
        // console.log(regiones.map(item => {
        //     console.log("hola mundo");
        // }));
    }, [])
    
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
        const copyOfValues = values;
        if(activeInputForAddress === false) {
            copyOfValues.address=JSON.parse(localStorage.getItem("currentCompany")).address;
            copyOfValues.fk_city_id=JSON.parse(localStorage.getItem("currentCompany")).fk_city_id;
            copyOfValues.fk_country_id=JSON.parse(localStorage.getItem("currentCompany")).fk_country_id;
            copyOfValues.fk_region_id=JSON.parse(localStorage.getItem("currentCompany")).fk_region_id;
        }
        console.log(copyOfValues);
        // createContact(values)
        updateCurrentCompanyInDB(JSON.parse(localStorage.getItem("currentCompany")).id, copyOfValues)
        swal("One company has been updated!", {
            icon: "success",
            // title: 'A new contact has been saved',
            buttons: false,
            timer: 1500
        });
        // props.history.push('/registrarse')
        props.history.push('/companias')
      };

      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
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
      const showInputRegion = () => {
        console.log("presionaste el boton");
        setActiveInputForAddress(true);
    }
    const linkClick = () => {
        console.log("click en link");
        if(!localStorage.getItem('currentComponent')){
          localStorage.setItem('currentComponent', "/modify-company");
          }else{
              localStorage.removeItem("currentComponent");
              localStorage.setItem('currentComponent', "/modify-company");
          }
    }
    return (  
        <Fragment>
            <Header/>
            <h1>Complete con los datos del nuevo contacto</h1>
            <Form 
                layout={formLayout} 
                form={form} 
                name="control-hooks" 
                onFinish={onFinish} 
                className="formulario"
                onFinishFailed={onFinishFailed}
            >
                <Row gutter={16}>
                    <Col span={2}></Col>
                    <Col span={5}>
                        <Form.Item 
                            name="name" 
                            label="Name" 
                            initialValue={JSON.parse(localStorage.getItem("currentCompany")).name}
                            rules={[{ required: true, message: 'Please input company name!!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    {/* <Col span={4}>
                        <Form.Item name="lastName" label="Last Name" >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name="position" label="Position" >
                            <Input />
                        </Form.Item>
                    </Col> */}
                    <Col span={5}>
                        <Form.Item 
                            name="email" 
                            label="Email" 
                            initialValue={JSON.parse(localStorage.getItem("currentCompany")).email}
                            rules={[{ required: true, message: 'Please input the email company!!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item 
                            name="phone" 
                            label="Phone" 
                            initialValue={JSON.parse(localStorage.getItem("currentCompany")).phone}
                            rules={[{ required: true, message: 'Please input the phone company!!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={2}></Col>
            </Row>
            {!activeInputForAddress 
                ? <Row>
                    <Col span={2}>
                    </Col>
                    <Col span={20}>
                        <p className="m-0 text-dark">Your current address is: <span className="px-3 text-danger">{JSON.parse(localStorage.getItem("currentCompany")).region_name} - {JSON.parse(localStorage.getItem("currentCompany")).country_name} - {JSON.parse(localStorage.getItem("currentCompany")).city_name} - {JSON.parse(localStorage.getItem("currentCompany")).address}</span><a className="px-3 btn btn-danger" onClick={showInputRegion}>change address?</a></p>
                    </Col>
                    <Col span={2}>
                    </Col>
                  </Row>
                : null
            }
            { activeInputForAddress
                ?<Row gutter={16}>
                        <Col span={2}></Col>
                        <Col span={5}>
                            <Form.Item 
                                name="fk_region_id" 
                                label="Region"
                                rules={[{ required: true, message: 'Please input the region!!' }]}
                            >
                                <Select
                                placeholder="Select your region"
                                onChange={onRegionChange}
                                allowClear
                                // value={region}
                                // defaultValue={[`${JSON.parse(localStorage.getItem("currentContact")).fk_region_id}`]}
                                // defaultValue={currentContact.fk_region_id}
                                notFoundContent="Please add the region"
                                >
                                {regiones.map( region => (
                                    <Select.Option value={region.region_id} key={region.region_id}>{region.region_name}</Select.Option>    
                                ))}
                                
                                </Select>
                                {/* <Button type="primary" icon={<PlusCircleOutlined />} className="add-new-item"></Button> */}
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item 
                                name="fk_country_id" 
                                label="Country"
                                rules={[{ required: true, message: 'Please input the country!!' }]}
                            >
                                <Select
                                placeholder={placeHolderCountry}
                                onChange={onCountryChange}
                                allowClear
                                // value={country}
                                // defaultValue={[`${JSON.parse(localStorage.getItem("currentContact")).fk_country_id}`]}
                                // value={currentContact.fk_country_id}
                                notFoundContent="Please add the country"
                                disabled = {activeCountrySelect}
                                >
                                {paisesDeRegion.map( country => (
                                    <Select.Option value={country.country_id} key={country.country_id}>{country.country_name}</Select.Option>    
                                ))}
                                </Select>
                                {/* <Button type="primary" icon={<PlusCircleOutlined />} className="add-new-item"></Button> */}
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item 
                                name="fk_city_id" 
                                label="City"
                                rules={[{ required: true, message: 'Please input the city!!' }]}
                            >
                                <Select
                                placeholder={placeHolderCity}
                                onChange={onCityChange}
                                allowClear
                                // value={city}
                                // defaultValue={[`${JSON.parse(localStorage.getItem("currentContact")).fk_city_id}`]}
                                // defaultValue={currentContact.fk_city_id}
                                notFoundContent="Please add the city"
                                disabled = {activeCitySelect}
                                >
                                {ciudadesDePais.map( city => (
                                    <Select.Option value={city.city_id} key={city.city_id}>{city.city_name}</Select.Option>    
                                ))}
                                </Select>
                                {/* <Button type="primary" icon={<PlusCircleOutlined />} className="add-new-item"></Button> */}
                                <Link to={'/regiones'} className='btn btn-sm btn-primary mt-1' onClick={linkClick}>
                                    Add new one
                                </Link>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item name="address" label="Address" >
                                <Input />
                            </Form.Item>
                        </Col>
                        
                        <Col span={2}></Col>
                </Row>
                : null           
            }
            <Row>
                <Col span={1}></Col>
                    <Form.Item {...tailLayout}>
                        <Button htmlType="submit" type="primary">
                            Submit
                        </Button>
                    </Form.Item>
            </Row>                                
        </Form>
    </Fragment>
    );
}
 
export default UpdateCompany;