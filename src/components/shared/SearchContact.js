import React, {Fragment, useState, useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext'
import ContactContext from '../../context/contacts/contactContext';
import { Form, Input, Button, Select } from 'antd';
import { Row, Col } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import ('./css/newContact.css')


const SearchContact = () => {

    let history = useHistory();

    if(!localStorage.getItem('currentComponent')){
        localStorage.setItem('currentComponent', "/add-new-contact");
    }else{
        localStorage.removeItem("currentComponent");
        localStorage.setItem('currentComponent', "/add-new-contact");
    }
    //State necesarios para el componente
    const [activeCountrySelect, setActiveCountrySelect] = useState(true);
    const [placeHolderCountry, setPlaceHolderCountry] = useState("First select region");
    const [activeCitySelect, setActiveCitySelect] = useState(true);       
    const [placeHolderCity, setPlaceHolderCity] = useState("First select country");
    //Traigo el context de alertas
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta, ocultarAlarma} = alertaContext; 
    //Traigo el context de contactos
    const contactContext = useContext(ContactContext);
    const {filterForm, deleteFilter, regiones, paisesDeRegion, regionName, country, city, getRegions, getCountriesByRegion, ciudadesDePais, companias, getCitiesByCountry, getCompanies, fillRegionField, fillCountryField, fillCityField, createContact, getFilteredContact, modifiedFilterForm, modifiedDeleteFilter} = contactContext;
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
        form.resetFields(['fk_country_id', 'fk_city_id']);
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
        form.resetFields(['fk_city_id']);
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
        modifiedFilterForm();
        console.log(values);
        getFilteredContact(values);
        // createContact(values)
        // mostrarAlerta("You have added successfuly a new contact")
        // ocultarAlarma();
        modifiedDeleteFilter();
        // props.history.push('/registrarse')
        // history.push('/registrarse')
      
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
    return (  
        <Fragment>
            {alerta ? ( <div className="alert alert-success position-fixed top-0 left-0 index-3">{alerta.msg}</div>): null}
            <Form 
                layout="horizontal"
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
                            name="fullname" 
                            label="full name" 
                            // rules={[{ required: true, message: 'Please input your fullname!!' }]}
                        >
                            <Input placeholder="fullname to search"/>
                        </Form.Item>  
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <Row gutter={16}>
                    <Col span={2}></Col>
                    <Col span={5}>
                        <Form.Item 
                            name="email" 
                            label="Email" 
                            // rules={[{ required: true, message: 'Please input your fullname!!' }]}
                        >
                            <Input placeholder="email to search"/>
                        </Form.Item>  
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <Row gutter={16}>
                    <Col span={2}></Col>
                    <Col span={5}>
                    <Form.Item label="region" name="region">
                        <Select
                        placeholder="Select your region"
                        onChange={onRegionChange}
                        >
                        {regiones.map( region => (
                                    <Select.Option value={region.region_id} key={region.region_id}>{region.region_name}</Select.Option>    
                        ))}
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item label="country" name="country">
                            <Select
                            placeholder={placeHolderCountry}
                            onChange={onCountryChange}
                            disabled = {activeCountrySelect}
                            >
                            {paisesDeRegion.map( country => (
                                    <Select.Option value={country.country_id} key={country.country_id}>{country.country_name}</Select.Option>    
                            ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item label="city" name="city">
                            <Select
                            placeholder={placeHolderCity}
                            onChange={onCityChange}
                            disabled = {activeCitySelect}
                            >
                            {ciudadesDePais.map( city => (
                                    <Select.Option value={city.city_id} key={city.city_id}>{city.city_name}</Select.Option>    
                            ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <Row gutter={16}>
                    <Col span={2}></Col>
                    <Col span={5}>
                    <Form.Item label="compañia" name="compania">
                        <Select>
                        {companias.map( company => (
                                <Select.Option value={company.id} key={company.id}>{company.name}</Select.Option>    
                        ))}
                        </Select>
                    </Form.Item>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <Row gutter={16}>
                    <Col span={2}></Col>
                    <Col span={5}>
                    <Form.Item 
                            name="charge" 
                            label="Charge" 
                            rules={[{ required: true, message: 'Please input your charge!!' }]}
                        >
                            <Input placeholder="charge to search"/>
                    </Form.Item>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                {/* <Row gutter={16}>
                    <Col span={2}></Col>
                    <Col span={5}>
                        <Form.Item 
                            name="fullname" 
                            label="full name" 
                            rules={[{ required: true, message: 'Please input your fullname!!' }]}
                        >
                            <Input />
                        </Form.Item>  
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <Row gutter={16}>
                    <Col span={2}></Col>
                    <Col span={5}>
                        <Form.Item 
                            name="fullname" 
                            label="full name" 
                            rules={[{ required: true, message: 'Please input your fullname!!' }]}
                        >
                            <Input />
                        </Form.Item>  
                    </Col>
                    <Col span={2}></Col>
                </Row> */}
                        
                            {/* <Select
                            placeholder="Select your company"
                            onChange={onCompanyChange}
                            allowClear
                            notFoundContent="Please add the company"
                            >
                            {companias.map( company => (
                                <Select.Option value={company.id} key={company.id}>{company.name}</Select.Option>    
                            ))}
                            </Select>
                            {/* <Button type="primary" icon={<PlusCircleOutlined />} className="add-new-item"></Button> */}
                           
                   
                        
                        
                    
                    <Row gutter={16}>
                        <Col span={19}></Col>
                        <Col span={4}>
                            <Form.Item {...tailLayout}>
                                <Button htmlType="submit" type="primary">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Col>
                        <Col span={1}></Col>
                    </Row>                                  
        </Form>
    </Fragment>
    );
}
 
export default SearchContact;