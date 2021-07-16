import React, {Fragment, useState, useEffect, useContext, useRef} from 'react';
import swal from 'sweetalert';
import { CloseOutlined } from '@ant-design/icons'
import {Link} from 'react-router-dom';
import Header from '../shared/Header'
import AlertaContext from '../../context/alertas/alertaContext'
import ContactContext from '../../context/contacts/contactContext';
import { Form, Input, Button, Select } from 'antd';
import { Row, Col } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import ('./css/newContact.css')


const NewContact = (props) => {

    const thirdSelectRef = useRef();
    const formularioRef = useRef();

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
    const [cuentaUsuario, setCuentaUsuario] = useState("");
    const [canalContacto, setCanalContacto] = useState(undefined);
    const [preference, setPreference] = useState(undefined);
    const [activeNewContactChannelBtn, setActiveNewContactChannelBtn] = useState(false)
    const [contadorContactChannel, setContadorContactChannel] = useState(0)
    const [channels, setChannels ] = useState([false, false, false, false, false])
    const [contactChannel1, setContactChannel1] = useState("")
    const [contactChannel2, setContactChannel2] = useState("")
    const [contactChannel3, setContactChannel3] = useState("")
    const [contactChannel4, setContactChannel4] = useState("")
    const [contactChannel5, setContactChannel5] = useState("")
    const [contactChannel6, setContactChannel6] = useState("")
    const [disable1, setDisable1 ] = useState(false);
    const [disable2, setDisable2 ] = useState(false);
    const [disable3, setDisable3 ] = useState(false);
    const [disable4, setDisable4 ] = useState(false);
    const [disable5, setDisable5 ] = useState(false);
    const [disable6, setDisable6 ] = useState(false);
    // const [channel1, setChannel1] = useState(true);
    // const [channel2, setChannel2] = useState(true);
    // const [channel3, setChannel3] = useState(true);
    // const [channel4, setChannel4] = useState(true);
    // const [channel5, setChannel5] = useState(true);
    //Traigo el context de alertas
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta, ocultarAlarma} = alertaContext; 
    //Traigo el context de contactos
    const contactContext = useContext(ContactContext);
    const {regiones, paisesDeRegion, regionName, country, city, getRegions, getCountriesByRegion, ciudadesDePais, companias, getCitiesByCountry, getCompanies, fillRegionField, fillCountryField, fillCityField, createContact, deleteCitiesByCountry} = contactContext;
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
        if(cuentaUsuario!=="" && canalContacto!==undefined && preference!== undefined) {
            setActiveNewContactChannelBtn(true)
        }else{
            setActiveNewContactChannelBtn(false)
        }
        let contadorDeCanalesActivos = 0;
        channels.forEach(channel => {
            if(channel === true) {
                contadorDeCanalesActivos++;
            }
        })
        console.log(contadorDeCanalesActivos);
        if(contadorDeCanalesActivos === 5){
            setActiveNewContactChannelBtn(false);
        }
    }, [cuentaUsuario, canalContacto, preference, channels])
    
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
        setActiveCitySelect(true)
        setPlaceHolderCity("First Select a country")
        // setRegion(e.target.name);
        deleteCitiesByCountry();
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
    const changeOptionToFalse = (currentOption) =>{
        switch(currentOption) {
            case '1': setDisable1(false); 
                break;
            case '2': setDisable2(false); 
                break;
            case '3': setDisable3(false); 
                break;
            case '4': setDisable4(false); 
                break;
            case '5': setDisable5(false); 
                break;
            case '6': setDisable6(false); 
                break;
            default: break;
        }
    }
    const changeOptionToTrue = (value) =>{
        switch(value) {
            case '1': setDisable1(true); 
                break;
            case '2': setDisable2(true); 
                break;
            case '3': setDisable3(true); 
                break;
            case '4': setDisable4(true); 
                break;
            case '5': setDisable5(true); 
                break;
            case '6': setDisable6(true); 
                break;
            default: break;
        }
    }
    const onContactChannelChange = (value) => {
        console.log(value);
        console.log(typeof(value));
        setCanalContacto(value);
        if(contactChannel1 ===""){
            console.log("hello world true");
            changeOptionToTrue(value)
            setContactChannel1(value)
        }else{
            console.log("hello world true");
            console.log(contactChannel1);
            switch(value){
                case '1':   setDisable1(true); 
                            changeOptionToFalse(contactChannel1)
                            break;
                case '2':   setDisable2(true); 
                            changeOptionToFalse(contactChannel1)
                            break;
                case '3':   setDisable3(true); 
                            changeOptionToFalse(contactChannel1)
                            break;
                case '4':   setDisable4(true); 
                            changeOptionToFalse(contactChannel1)
                            break;
                case '5':   setDisable5(true); 
                            changeOptionToFalse(contactChannel1)
                            break;
                case '6':   setDisable6(true); 
                            changeOptionToFalse(contactChannel1)
                            break;
                default: break;
            }
            setContactChannel1(value)
        }
        // let thereIsRowsActives = false;
        // channels.forEach(channel => {
        //     if(channel === true){
        //     thereIsRowsActives = true;
        //     }
        // })
        // if(!thereIsRowsActives){ //No hay rows extras por ahora
            // switch(value){
            //     case '1': setDisable1(true); setDisable2(false); setDisable3(false); setDisable4(false); setDisable5(false); setDisable6(false);
            //         break;
            //     case '2': setDisable1(false); setDisable2(true); setDisable3(false); setDisable4(false); setDisable5(false); setDisable6(false);
            //         break;
            //     case '3': setDisable1(false); setDisable2(false); setDisable3(true); setDisable4(false); setDisable5(false); setDisable6(false);
            //         break;
            //     case '4': setDisable1(false); setDisable2(false); setDisable3(false); setDisable4(true); setDisable5(false); setDisable6(false);
            //         break;
            //     case '5': setDisable1(false); setDisable2(false); setDisable3(false); setDisable4(false); setDisable5(true); setDisable6(false);
            //         break;
            //     case '6': setDisable1(false); setDisable2(false); setDisable3(false); setDisable4(false); setDisable5(false); setDisable6(true);
            //         break;
            //     default: break;
            // }
        //     setContactChannel1(value)
        // }else{//Hay rows extras y necesitas verificar antes de hacer un reseteo

        // }
        // console.log("hello are you changin contact channel");
        // console.log(value);
        // setRegion(value);
    }
    const onContactChannelChange0 = (value) => {
        console.log(value);
        setCanalContacto(value);
        if(contactChannel2 ===""){
            changeOptionToTrue(value)
            setContactChannel2(value)
        }else{
            switch(value){
                case '1':   setDisable1(true); 
                            changeOptionToFalse(contactChannel2)
                            break;
                case '2':   setDisable2(true); 
                            changeOptionToFalse(contactChannel2)
                            break;
                case '3':   setDisable3(true); 
                            changeOptionToFalse(contactChannel2)
                            break;
                case '4':   setDisable4(true); 
                            changeOptionToFalse(contactChannel2)
                            break;
                case '5':   setDisable5(true); 
                            changeOptionToFalse(contactChannel2)
                            break;
                case '6':   setDisable6(true); 
                            changeOptionToFalse(contactChannel2)
                            break;
                default: break;
            }
        // console.log("hello are you changin contact channel");
        // console.log(value);
        // setRegion(value);
        setContactChannel2(value)
        }
    }
    const onContactChannelChange1 = (value) => {
        console.log(value);
        setCanalContacto(value);
        if(contactChannel3 ===""){
            changeOptionToTrue(value)
            setContactChannel3(value)
        }else{
            switch(value){
                case '1':   setDisable1(true); 
                            changeOptionToFalse(contactChannel3)
                            break;
                case '2':   setDisable2(true); 
                            changeOptionToFalse(contactChannel3)
                            break;
                case '3':   setDisable3(true); 
                            changeOptionToFalse(contactChannel3)
                            break;
                case '4':   setDisable4(true); 
                            changeOptionToFalse(contactChannel3)
                            break;
                case '5':   setDisable5(true); 
                            changeOptionToFalse(contactChannel3)
                            break;
                case '6':   setDisable6(true); 
                            changeOptionToFalse(contactChannel3)
                            break;
                default: break;
            }
            setContactChannel3(value)
        }
        // console.log("hello are you changin contact channel");
        // console.log(value);
        // setRegion(value);
    }
    const onContactChannelChange2 = (value) => {
        console.log(value);
        setCanalContacto(value);
        if(contactChannel4 ===""){
            changeOptionToTrue(value)
            setContactChannel4(value)
        }else{
            switch(value){
                case '1':   setDisable1(true); 
                            changeOptionToFalse(contactChannel4)
                            break;
                case '2':   setDisable2(true); 
                            changeOptionToFalse(contactChannel4)
                            break;
                case '3':   setDisable3(true); 
                            changeOptionToFalse(contactChannel4)
                            break;
                case '4':   setDisable4(true); 
                            changeOptionToFalse(contactChannel4)
                            break;
                case '5':   setDisable5(true); 
                            changeOptionToFalse(contactChannel4)
                            break;
                case '6':   setDisable6(true); 
                            changeOptionToFalse(contactChannel4)
                            break;
                default: break;
            }
            setContactChannel4(value)
        }
        // console.log("hello are you changin contact channel");
        // console.log(value);
        // setRegion(value);
    }
    const onContactChannelChange3 = (value) => {
        console.log(value);
        setCanalContacto(value);
        if(contactChannel5 ===""){
            changeOptionToTrue(value)
            setContactChannel5(value)
        }else{
            switch(value){
                case '1':   setDisable1(true); 
                            changeOptionToFalse(contactChannel5)
                            break;
                case '2':   setDisable2(true); 
                            changeOptionToFalse(contactChannel5)
                            break;
                case '3':   setDisable3(true); 
                            changeOptionToFalse(contactChannel5)
                            break;
                case '4':   setDisable4(true); 
                            changeOptionToFalse(contactChannel5)
                            break;
                case '5':   setDisable5(true); 
                            changeOptionToFalse(contactChannel5)
                            break;
                case '6':   setDisable6(true); 
                            changeOptionToFalse(contactChannel5)
                            break;
                default: break;
            }
            setContactChannel5(value)
        }
        // console.log("hello are you changin contact channel");
        // console.log(value);
        // setRegion(value);
    }
    const onContactChannelChange4 = (value) => {
        console.log(value);
        setCanalContacto(value);
        if(contactChannel6 ===""){
            changeOptionToTrue(value)
            setContactChannel6(value)
        }else{
            switch(value){
                case '1':   setDisable1(true); 
                            changeOptionToFalse(contactChannel6)
                            break;
                case '2':   setDisable2(true); 
                            changeOptionToFalse(contactChannel6)
                            break;
                case '3':   setDisable3(true); 
                            changeOptionToFalse(contactChannel6)
                            break;
                case '4':   setDisable4(true); 
                            changeOptionToFalse(contactChannel6)
                            break;
                case '5':   setDisable5(true); 
                            changeOptionToFalse(contactChannel6)
                            break;
                case '6':   setDisable6(true); 
                            changeOptionToFalse(contactChannel6)
                            break;
                default: break;
            }
            setContactChannel6(value)
        }
        // console.log("hello are you changin contact channel");
        // console.log(value);
        // setRegion(value);
    }
    const onPreferenceChange = (value) => {
        console.log(value);
        setPreference(value);
        // console.log("hello are you changin preference");
        // console.log(value);
        // setRegion(value);
    }
    const onCuentaUsuarioChange = (e) => {
        console.log(e.target.value);
        setCuentaUsuario(e.target.value);
        // console.log("hello are you changin the contact channel value");
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
        console.log(values.fullname);
        console.log(values.contactChannel0);//Fue solo una prueba para ver si es que uno no venia era undefined
        const newContactData = { //Datos del nuevo contacto
            fullname: values.fullname,
            email: values.email,
            charge: values.charge,
            company_id: values.company_id,
            address: values.address,
            fk_city_id: values.fk_city_id,
            fk_country_id: values.fk_country_id,
            fk_region_id: values.fk_region_id
        }
        let channelsOfContact = [];
        if(values.contactChannel){
            channelsOfContact.push({
                channel_id: values.contactChannel,
                channel_value: values.contactChannelValue,
                preference: values.preference
            })
        }
        if(values.contactChannel0){
            channelsOfContact.push({
                channel_id: values.contactChannel0,
                channel_value: values.contactChannelValue0,
                preference: values.preference0
            })
        }
        if(values.contactChannel1){
            channelsOfContact.push({
                channel_id: values.contactChannel1,
                channel_value: values.contactChannelValue1,
                preference: values.preference1
            })
        }
        if(values.contactChannel2){
            channelsOfContact.push({
                channel_id: values.contactChannel2,
                channel_value: values.contactChannelValue2,
                preference: values.preference2
            })
        }
        if(values.contactChannel3){
            channelsOfContact.push({
                channel_id: values.contactChannel3,
                channel_value: values.contactChannelValue3,
                preference: values.preference3
            })
        }
        if(values.contactChannel4){
            channelsOfContact.push({
                channel_id: values.contactChannel4,
                channel_value: values.contactChannelValue4,
                preference: values.preference4
            })
        }
        console.log(channelsOfContact);
        //Hay que trabajar los datos de values para que los que sean necesarios pa crear el contact se manden ahí y los que sean para crear channel se agrupen y se mandan a su correspondiente endpoint
        createContact(newContactData, channelsOfContact)
        swal("A new contact has been saved!", {
            icon: "success",
            // title: 'A new contact has been saved',
            buttons: false,
            timer: 1500
          });
        // swal.fire({
        //     position: 'top-end',
        //     icon: 'success',
        //     title: 'Your work has been saved',
        //     showConfirmButton: false,
        //     timer: 1500
        //   })
        // mostrarAlerta("You have added successfuly a new contact")
        // ocultarAlarma();
        // // props.history.push('/registrarse')
        props.history.push('/registrarse')
      
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

      const newContactChannelRow = () => {
          const channelsModified = [];
          let contadorFalse = 0;
          channels.forEach(channel => {
            let item = channel;
            if(channel === false){
                if(contadorFalse == 0) {
                    item = !channel;
                    contadorFalse++;
                }
            }
            channelsModified.push(item);
          })
          console.log(channelsModified);
          setChannels([...channelsModified])
      }

      const channel1off = ()=>{
        formularioRef.current.setFieldsValue({
            contactChannel0: undefined
        })
          let channelsModified = [...channels];
          channelsModified[0] = !channelsModified[0];
          setChannels([...channelsModified])
          setActiveNewContactChannelBtn(true)
          changeOptionToFalse(contactChannel2)
          setContactChannel2("")
      }
      const channel2off = ()=>{
        console.log(formularioRef);
        formularioRef.current.setFieldsValue({
            contactChannel1: undefined
        })
        console.log(formularioRef.current);
        console.log(thirdSelectRef.current.props.value);
        //   thirdSelectRef.current.props.value = undefined;
          let channelsModified = [...channels];
          channelsModified[1] = !channelsModified[1];
          setChannels([...channelsModified])
          setActiveNewContactChannelBtn(true)
          changeOptionToFalse(contactChannel3)
          setContactChannel3("")
    }
    const channel3off = ()=>{
        formularioRef.current.setFieldsValue({
            contactChannel2: undefined
        })
          let channelsModified = [...channels];
          channelsModified[2] = !channelsModified[2];
          setChannels([...channelsModified])
          setActiveNewContactChannelBtn(true)
          changeOptionToFalse(contactChannel4)
          setContactChannel4("")
    }
    const channel4off = ()=>{
        formularioRef.current.setFieldsValue({
            contactChannel3: undefined
        })
          let channelsModified = [...channels];
          channelsModified[3] = !channelsModified[3];
          setChannels([...channelsModified])
          setActiveNewContactChannelBtn(true)
          changeOptionToFalse(contactChannel5)
          setContactChannel5("")
    }
    const channel5off = ()=>{
        formularioRef.current.setFieldsValue({
            contactChannel4: undefined
        })
          let channelsModified = [...channels];
          channelsModified[4] = !channelsModified[4];
          setChannels([...channelsModified])
          setActiveNewContactChannelBtn(true)
          changeOptionToFalse(contactChannel6)
          setContactChannel6("")
    }
    
    return (  
        <Fragment>
            <Header/>
            <h3 className="text-primary text-center">Enter new contact data</h3>
            {alerta ? ( <div className="alert alert-success position-fixed top-0 left-0 index-3">{alerta.msg}</div>): null}
            <div className="d-flex justify-content-center">
                <Form 
                    ref={formularioRef}
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
                                name="fullname" 
                                label="Fullname" 
                                rules={[{ required: true, message: 'Please input your fullname!!' }]}
                            >
                                <Input placeholder="Enter your fullname"/>
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
                                rules={[{ required: true, message: 'Please input your email!!' }]}
                            >
                                <Input placeholder="Enter your email"/>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item 
                                name="charge" 
                                label="Charge" 
                                rules={[{ required: true, message: 'Please input your charge!!' }]}
                            >
                                <Input placeholder="Enter your charge"/>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item 
                            name="company_id" 
                            label="Company" 
                            rules={[{ required: true, message: 'Please input your company!!' }]}
                            >
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
                                {/* <Button type="primary" icon={<PlusCircleOutlined />} className="add-new-item"></Button> */}
                                <Link to={'/add-new-company'} className='btn btn-sm btn-primary mt-1'>
                                    Add new one
                                </Link>
                            </Form.Item>
                        </Col>
                        {/* <Col span={5}>
                            <Form.Item 
                                name="contactChannel" 
                                label="Contact Channel" 
                                rules={[{ required: true, message: 'Select one contact channel!!' }]}
                            >
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
                        </Col> */}
                        <Col span={2}></Col>
                </Row>
                <Row gutter={16}>
                    <Col span={2}></Col>
                    <Col span={5}>
                            <Form.Item 
                                name="contactChannel" 
                                label="Contact channel 1" 
                                rules={[{ required: true, message: 'Select contact channel' }]}
                            >
                                <Select
                                placeholder="Select your contact channels"
                                onChange={onContactChannelChange}
                                allowClear
                                >
                                <Option value="1" disabled={disable1}>Whatsapp</Option>
                                <Option value="2" disabled={disable2}>LLamada</Option>
                                <Option value="3" disabled={disable3}>Email</Option>
                                <Option value="4" disabled={disable4}>LinkedIn</Option>
                                <Option value="5" disabled={disable5}>Facebook</Option>
                                <Option value="6" disabled={disable6}>Instagram</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item 
                                name="contactChannelValue" 
                                label="user account" 
                                onChange={onCuentaUsuarioChange}
                                rules={[{ required: true, message: 'Fill value of this channel' }]}
                            >
                                <Input placeholder="Enter contact value channel"/>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item 
                                name="preference" 
                                label="Preference" 
                                rules={[{ required: true, message: 'Select preference' }]}
                            >
                                <Select
                                placeholder="Select preference"
                                onChange={onPreferenceChange}
                                allowClear
                                >
                                <Option value="fv">Canal Favorito</Option>
                                <Option value="sp">Sin preferencia</Option>
                                <Option value="nm">No molestar   </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5} className="d-flex justify-content-center align-items-center">
                        <Button type="primary" onClick={newContactChannelRow} disabled={!activeNewContactChannelBtn}>
                            One more
                        </Button>
                        </Col>
                    <Col span={2}></Col>
                </Row>
                { channels[0]? <Row gutter={16}>
                    <Col span={2}></Col>
                    <Col span={5}>
                            <Form.Item 
                                name="contactChannel0" 
                                label="Contact Channel 2" 
                                rules={[{ required: true, message: 'Select contact channel' }]}
                                // rules={[{ required: true, message: 'Select one contact channel!!' }]}
                            >
                                <Select
                                placeholder="Select your contact channels"
                                onChange={onContactChannelChange0}
                                allowClear
                                >
                                <Option value="1" disabled={disable1}>Whatsapp</Option>
                                <Option value="2" disabled={disable2}>LLamada</Option>
                                <Option value="3" disabled={disable3}>Email</Option>
                                <Option value="4" disabled={disable4}>LinkedIn</Option>
                                <Option value="5" disabled={disable5}>Facebook</Option>
                                <Option value="6" disabled={disable6}>Instagram</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item 
                                name="contactChannelValue0" 
                                label="user account" 
                                onChange={onCuentaUsuarioChange}
                                rules={[{ required: true, message: 'Fill value of this channel' }]}
                                // rules={[{ required: true, message: 'Please input your account or address!!' }]}
                            >
                                <Input placeholder="Enter contact value channel"/>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item 
                                name="preference0" 
                                label="Preference" 
                                rules={[{ required: true, message: 'Select preference' }]}
                                // rules={[{ required: true, message: 'Select one contact channel!!' }]}
                            >
                                <Select
                                placeholder="Select your contact channels"
                                onChange={onPreferenceChange}
                                allowClear
                                >
                                <Option value="fv">Canal Favorito</Option>
                                <Option value="sp">Sin preferencia</Option>
                                <Option value="nm">No molestar   </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5} className="d-flex justify-content-center align-items-center">
                        <Button type="primary" className="d-flex justify-content-center align-items-center" onClick={channel1off}  icon={<CloseOutlined />}/>
                        </Col>
                    <Col span={2}></Col>
                </Row>
                
                :null}
                { channels[1]? <Row gutter={16}>
                    <Col span={2}></Col>
                    <Col span={5}>
                            <Form.Item 
                                name="contactChannel1" 
                                label="Contact Channel 3" 
                                rules={[{ required: true, message: 'Select contact channel' }]}
                                // rules={[{ required: true, message: 'Select one contact channel!!' }]}
                            >
                                <Select
                                ref={thirdSelectRef}
                                placeholder="Select your contact channels"
                                onChange={onContactChannelChange1}
                                allowClear
                                >
                                <Option value="1" disabled={disable1}>Whatsapp</Option>
                                <Option value="2" disabled={disable2}>LLamada</Option>
                                <Option value="3" disabled={disable3}>Email</Option>
                                <Option value="4" disabled={disable4}>LinkedIn</Option>
                                <Option value="5" disabled={disable5}>Facebook</Option>
                                <Option value="6" disabled={disable6}>Instagram</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item 
                                name="contactChannelValue1" 
                                label="user account" 
                                onChange={onCuentaUsuarioChange}
                                rules={[{ required: true, message: 'Fill value of this channel' }]}
                                // rules={[{ required: true, message: 'Please input your account or address!!' }]}
                            >
                                <Input placeholder="Enter contact value channel"/>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item 
                                name="preference1" 
                                label="Preference" 
                                rules={[{ required: true, message: 'Select preference' }]}
                                // rules={[{ required: true, message: 'Select one contact channel!!' }]}
                            >
                                <Select
                                placeholder="Select your contact channels"
                                onChange={onPreferenceChange}
                                allowClear
                                >
                                <Option value="fv">Canal Favorito</Option>
                                <Option value="sp">Sin preferencia</Option>
                                <Option value="nm">No molestar   </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5} className="d-flex justify-content-center align-items-center">
                        <Button type="primary" className="d-flex justify-content-center align-items-center" onClick={channel2off} icon={<CloseOutlined />}/>
                        </Col>
                    <Col span={2}></Col>
                </Row>
                
                :null}
                { channels[2] ? <Row gutter={16}>
                    <Col span={2}></Col>
                    <Col span={5}>
                            <Form.Item 
                                name="contactChannel2" 
                                label="Contact Channel 4" 
                                rules={[{ required: true, message: 'Select contact channel' }]}
                                // rules={[{ required: true, message: 'Select one contact channel!!' }]}
                            >
                                <Select
                                placeholder="Select your contact channels"
                                onChange={onContactChannelChange2}
                                allowClear
                                >
                                <Option value="1" disabled={disable1}>Whatsapp</Option>
                                <Option value="2" disabled={disable2}>LLamada</Option>
                                <Option value="3" disabled={disable3}>Email</Option>
                                <Option value="4" disabled={disable4}>LinkedIn</Option>
                                <Option value="5" disabled={disable5}>Facebook</Option>
                                <Option value="6" disabled={disable6}>Instagram</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item 
                                name="contactChannelValue2" 
                                label="user account" 
                                onChange={onCuentaUsuarioChange}
                                rules={[{ required: true, message: 'Fill value of this channel' }]}
                                // rules={[{ required: true, message: 'Please input your account or address!!' }]}
                            >
                                <Input placeholder="Enter contact value channel"/>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item 
                                name="preference2" 
                                label="Preference" 
                                rules={[{ required: true, message: 'Select preference' }]}
                                // rules={[{ required: true, message: 'Select one contact channel!!' }]}
                            >
                                <Select
                                placeholder="Select your contact channels"
                                onChange={onPreferenceChange}
                                allowClear
                                >
                                <Option value="fv">Canal Favorito</Option>
                                <Option value="sp">Sin preferencia</Option>
                                <Option value="nm">No molestar   </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5} className="d-flex justify-content-center align-items-center">
                        <Button type="primary" className="d-flex justify-content-center align-items-center" onClick={channel3off} icon={<CloseOutlined />}/>
                        </Col>
                    <Col span={2}></Col>
                </Row>
                
                :null}
                { channels[3] ? <Row gutter={16}>
                    <Col span={2}></Col>
                    <Col span={5}>
                            <Form.Item 
                                name="contactChannel3" 
                                label="Contact Channel 5" 
                                rules={[{ required: true, message: 'Select contact channel' }]}
                                // rules={[{ required: true, message: 'Select one contact channel!!' }]}
                            >
                                <Select
                                placeholder="Select your contact channels"
                                onChange={onContactChannelChange3}
                                allowClear
                                >
                                <Option value="1" disabled={disable1}>Whatsapp</Option>
                                <Option value="2" disabled={disable2}>LLamada</Option>
                                <Option value="3" disabled={disable3}>Email</Option>
                                <Option value="4" disabled={disable4}>LinkedIn</Option>
                                <Option value="5" disabled={disable5}>Facebook</Option>
                                <Option value="6" disabled={disable6}>Instagram</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item 
                                name="contactChannelValue3" 
                                label="user account" 
                                onChange={onCuentaUsuarioChange}
                                rules={[{ required: true, message: 'Fill value of this channel' }]}
                                // rules={[{ required: true, message: 'Please input your account or address!!' }]}
                            >
                                <Input placeholder="Enter contact value channel"/>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item 
                                name="preference3" 
                                label="Preference" 
                                rules={[{ required: true, message: 'Select preference' }]}
                                // rules={[{ required: true, message: 'Select one contact channel!!' }]}
                            >
                                <Select
                                placeholder="Select your contact channels"
                                onChange={onPreferenceChange}
                                allowClear
                                >
                                <Option value="fv">Canal Favorito</Option>
                                <Option value="sp">Sin preferencia</Option>
                                <Option value="nm">No molestar   </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5} className="d-flex justify-content-center align-items-center">
                        <Button type="primary" className="d-flex justify-content-center align-items-center" onClick={channel4off} icon={<CloseOutlined />}/>
                        </Col>
                    <Col span={2}></Col>
                </Row>
                
                :null}
                { channels[4] ? <Row gutter={16}>
                    <Col span={2}></Col>
                    <Col span={5}>
                            <Form.Item 
                                name="contactChannel4" 
                                label="Contact Channel 6" 
                                rules={[{ required: true, message: 'Select contact channel' }]}
                                // rules={[{ required: true, message: 'Select one contact channel!!' }]}
                            >
                                <Select
                                placeholder="Select your contact channels"
                                onChange={onContactChannelChange4}
                                allowClear
                                >
                                <Option value="1" disabled={disable1}>Whatsapp</Option>
                                <Option value="2" disabled={disable2}>LLamada</Option>
                                <Option value="3" disabled={disable3}>Email</Option>
                                <Option value="4" disabled={disable4}>LinkedIn</Option>
                                <Option value="5" disabled={disable5}>Facebook</Option>
                                <Option value="6" disabled={disable6}>Instagram</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item 
                                name="contactChannelValue4" 
                                label="user account" 
                                onChange={onCuentaUsuarioChange}
                                rules={[{ required: true, message: 'Fill value of this channel' }]}
                                // rules={[{ required: true, message: 'Please input your account or address!!' }]}
                            >
                                <Input placeholder="Enter contact value channel"/>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item 
                                name="preference4" 
                                label="Preference" 
                                rules={[{ required: true, message: 'Select preference' }]}
                                // rules={[{ required: true, message: 'Select one contact channel!!' }]}
                            >
                                <Select
                                placeholder="Select your contact channels"
                                onChange={onPreferenceChange}
                                allowClear
                                >
                                <Option value="fv">Canal Favorito</Option>
                                <Option value="sp">Sin preferencia</Option>
                                <Option value="nm">No molestar   </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={5} className="d-flex justify-content-center align-items-center">
                        <Button type="primary" className="d-flex justify-content-center align-items-center" onClick={channel5off} icon={<CloseOutlined />}/>
                        </Col>
                    <Col span={2}></Col>
                </Row>
                
                :null}
                    <Row gutter={16}>
                            <Col span={2}></Col>
                            <Col span={5}>
                                <Form.Item 
                                    name="fk_region_id" 
                                    label="Region"
                                    rules={[{ required: true, message: 'Please input your region!!' }]} 
                                >
                                    <Select
                                    placeholder="Select your region"
                                    onChange={onRegionChange}
                                    allowClear
                                    // value={region}
                                    notFoundContent="Please add the region"
                                    >
                                    {regiones.map( region => (
                                        <Select.Option value={region.region_id} key={region.region_id}>{region.region_name}</Select.Option>    
                                    ))}
                                    
                                    </Select>
                                    {/* <Button type="primary" icon={<PlusCircleOutlined />} className="add-new-item"></Button> */}
                                    {/* <Link to={'/add-new-region'} className='btn btn-sm btn-primary mt-1'>
                                        Add new one
                                    </Link> */}
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item 
                                    name="fk_country_id" 
                                    label="Country"
                                    rules={[{ required: true, message: 'Please input your country!!' }]} 
                                >
                                    <Select
                                    placeholder={placeHolderCountry}
                                    onChange={onCountryChange}
                                    allowClear
                                    // value={country}
                                    notFoundContent="Please add the country"
                                    disabled = {activeCountrySelect}
                                    >
                                    {paisesDeRegion.map( country => (
                                        <Select.Option value={country.country_id} key={country.country_id}>{country.country_name}</Select.Option>    
                                    ))}
                                    </Select>
                                    {/* <Button type="primary" icon={<PlusCircleOutlined />} className="add-new-item"></Button> */}
                                    {/* <Link to={'/add-new-country'} className='btn btn-sm btn-primary mt-1'>
                                        Add new one
                                    </Link> */}
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item 
                                    name="fk_city_id" 
                                    label="City"
                                    rules={[{ required: true, message: 'Please input your city!!' }]} 
                                >
                                    <Select
                                    placeholder={placeHolderCity}
                                    onChange={onCityChange}
                                    allowClear
                                    // value={city}
                                    notFoundContent="Please add the city"
                                    disabled = {activeCitySelect}
                                    >
                                    {ciudadesDePais.map( city => (
                                        <Select.Option value={city.city_id} key={city.city_id}>{city.city_name}</Select.Option>    
                                    ))}
                                    </Select>
                                    {/* <Button type="primary" icon={<PlusCircleOutlined />} className="add-new-item"></Button> */}
                                    <Link to={'/regiones'} className='btn btn-sm btn-primary mt-1'>
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
                <Row>
                    <Col span={1}></Col>
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
 
export default NewContact;