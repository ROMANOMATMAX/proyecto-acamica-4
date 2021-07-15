import React, {Fragment, useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext'
import ContactContext from '../../context/contacts/contactContext';
import { Form, Input, Button, Select } from 'antd';
import { Row, Col } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import ('../contacts/css/newContact.css')


const NewRegion = (props) => {
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
    const {regiones, paisesDeRegion, regionName, country, city, getRegions, getCountriesByRegion, ciudadesDePais, companias, getCitiesByCountry, getCompanies, fillRegionField, fillCountryField, fillCityField, createContact} = contactContext;
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
        console.log(values);
        createContact(values)
        mostrarAlerta("You have added successfuly a new contact")
        ocultarAlarma();
        // props.history.push('/registrarse')
        props.history.push('/registrarse')
      
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
            <h1>Complete con los datos de la nueva region</h1>
            {alerta ? ( <div className="alert alert-success position-fixed top-0 left-0 index-3">{alerta.msg}</div>): null}
            <Form layout={formLayout} form={form} name="control-hooks" onFinish={onFinish} className="formulario">
                {/* <Row gutter={16}>
                    <Col span={2}></Col>
                    <Col span={5}>
                        <Form.Item name="fullname" label="full name" >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item name="email" label="Email" >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item name="company_id" label="Company" >
                            <Select
                            placeholder="Select your company"
                            onChange={onCompanyChange}
                            allowClear
                            notFoundContent="Please add the company"
                            >
                            {companias.map( company => (
                                <Select.Option value={company.id} key={company.id}>{company.name}</Select.Option>    
                            ))}
                            </Select>
                            <Link to={'/add-new-company'} className='btn btn-sm btn-primary mt-1'>
                                Add new one
                            </Link>
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item name="contactChannel" label="Contact Channel" >
                            <Select
                            placeholder="Select your contact channels"
                            onChange={onGenderChange}
                            allowClear
                            >
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                            <Option value="other">other</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={2}></Col>
            </Row> */}
                <Row gutter={16}>
                        <Col span={2}></Col>
                        <Col span={5}>
                            <Form.Item name="region" label="Region" >
                                <Input />
                            </Form.Item>
                        </Col>
                        
                        <Col span={2}></Col>
                </Row>
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
 
export default NewRegion;