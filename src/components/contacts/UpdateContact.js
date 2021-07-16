import React, {Fragment, useState, useEffect, useContext, useRef} from 'react';
import {Link} from 'react-router-dom';
import Header from '../shared/Header'
import swal from 'sweetalert';
import { CloseOutlined } from '@ant-design/icons'
import AlertaContext from '../../context/alertas/alertaContext'
import ContactContext from '../../context/contacts/contactContext';
import { Form, Input, Button, Select } from 'antd';
import { Row, Col } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { OBTENER_CONTACTOS } from '../../types';
import ('./css/newContact.css')


const UpdateContact = (props) => {
    const thirdSelectRef = useRef();
    const formularioRef = useRef();

    if(!localStorage.getItem('currentComponent')){
        localStorage.setItem('currentComponent', "/modify-contact");
    }else{
        localStorage.removeItem("currentComponent");
        localStorage.setItem('currentComponent', "/modify-contact");
    }
    //State necesarios para el componente
    const [activeCountrySelect, setActiveCountrySelect] = useState(true);
    const [placeHolderCountry, setPlaceHolderCountry] = useState("First select region");
    const [activeCitySelect, setActiveCitySelect] = useState(true);       
    const [placeHolderCity, setPlaceHolderCity] = useState("First select country");
    const [activeInputForAddress, setActiveInputForAddress] = useState(false);
    const [activeNewContactChannelBtn, setActiveNewContactChannelBtn] = useState(true)
    const [cuentaUsuario, setCuentaUsuario] = useState("");
    const [canalContacto, setCanalContacto] = useState(undefined);
    const [preference, setPreference] = useState(undefined);
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
    //Traigo el context de alertas
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta, ocultarAlarma} = alertaContext; 
    //Traigo el context de contactos
    const contactContext = useContext(ContactContext);
    const {contactos, regiones, paisesDeRegion, regionName, country, city, currentContactChannels, getRegions, obtenerContactos, getCountriesByRegion, ciudadesDePais, companias, getCitiesByCountry, getCompanies, fillRegionField, fillCountryField, fillCityField, createContact, currentContact, updateCurrentContactInDB, updateCurrentContact, allChannelsOfOneContact, deleteCitiesByCountry} = contactContext;
    
    //UseEffect
    useEffect(() => {
        console.log("Entre al use effect de nuevo contacto");
        const currentContactFromLS = JSON.parse(localStorage.getItem('currentContact'))
        getRegions();
        getCountriesByRegion(currentContactFromLS.region_id);
        getCitiesByCountry(currentContactFromLS.country_id)
        getCompanies();
        console.log(currentContact.id);
        // console.log(JSON.parse(localStorage.getItem('currentContact')));
        // allChannelsOfOneContact(currentContactFromLS.id)
        initialStateOfContactChannelRows();
        fillFormWithCurrentData();
        // console.log(regiones.map(item => {
        //     console.log("hola mundo");
        // }));
    }, [currentContactChannels, currentContact])

    
    useEffect(() => {
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
    }, [channels])

    const initialStateOfContactChannelRows = () =>{
        //Necesitamos preguntar cuantos canales de contactos ahi y en base a eso activar el numero correcto de rows
        const currentContactChannelsLS = JSON.parse(localStorage.getItem('currentContactChannels'))
        console.log(currentContactChannelsLS);
        console.log(currentContactChannels.length);
        //Activando las rows
        const channelsModified = [...channels]
        console.log(channelsModified);
        if(currentContactChannelsLS){
            for(let i=0; i<currentContactChannelsLS.length-1; i++){
                channelsModified[i] = true;
            }
        }else{
            for(let i=0; i<currentContactChannels.length-1; i++){
                channelsModified[i] = true;
            }
        }
        console.log(channelsModified);
        setChannels([...channelsModified])
    }
    
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
        console.log(currentContact.id);
        if(activeInputForAddress === false) {
            copyOfValues.address=JSON.parse(localStorage.getItem("currentContact")).address;
            copyOfValues.fk_city_id=JSON.parse(localStorage.getItem("currentContact")).city_id;
            copyOfValues.fk_country_id=JSON.parse(localStorage.getItem("currentContact")).country_id;
            copyOfValues.fk_region_id=JSON.parse(localStorage.getItem("currentContact")).region_id;
        }
        console.log(copyOfValues);

        const valuesDos = functionToPreventSentAnyChannelValueToDB(values);
        console.log(valuesDos);
        const newContactData = { //Datos del nuevo contacto
            fullname: valuesDos.fullname,
            email: valuesDos.email,
            charge: valuesDos.charge,
            company_id: valuesDos.company_id,
            address: valuesDos.address,
            fk_city_id: valuesDos.fk_city_id,
            fk_country_id: valuesDos.fk_country_id,
            fk_region_id: valuesDos.fk_region_id
        }
        console.log(newContactData);
        let channelsOfContact = [];
        if(valuesDos.contactChannel){
            channelsOfContact.push({
                channel_id: valuesDos.contactChannel,
                channel_value: valuesDos.contactChannelValue,
                preference: valuesDos.preference
            })
        }
        if(valuesDos.contactChannel0){
            channelsOfContact.push({
                channel_id: valuesDos.contactChannel0,
                channel_value: valuesDos.contactChannelValue0,
                preference: valuesDos.preference0
            })
        }
        if(valuesDos.contactChannel1){
            channelsOfContact.push({
                channel_id: valuesDos.contactChannel1,
                channel_value: valuesDos.contactChannelValue1,
                preference: valuesDos.preference1
            })
        }
        if(valuesDos.contactChannel2){
            channelsOfContact.push({
                channel_id: valuesDos.contactChannel2,
                channel_value: valuesDos.contactChannelValue2,
                preference: valuesDos.preference2
            })
        }
        if(valuesDos.contactChannel3){
            channelsOfContact.push({
                channel_id: valuesDos.contactChannel3,
                channel_value: valuesDos.contactChannelValue3,
                preference: valuesDos.preference3
            })
        }
        if(valuesDos.contactChannel4){
            channelsOfContact.push({
                channel_id: valuesDos.contactChannel4,
                channel_value: valuesDos.contactChannelValue4,
                preference: valuesDos.preference4
            })
        }
        console.log(channelsOfContact);
        // createContact(values)
        updateCurrentContactInDB(JSON.parse(localStorage.getItem("currentContact")).id, newContactData, channelsOfContact)
        // mostrarAlerta("You have updated successfuly a contact")
        // ocultarAlarma();
        // // props.history.push('/registrarse')
        swal("One contact has been updated!", {
            icon: "success",
            // title: 'A new contact has been saved',
            buttons: false,
            timer: 1500
        });
        props.history.push('/registrarse')
      };
      const functionToPreventSentAnyChannelValueToDB = (values) =>{
        if(values.contactChannel){
            values.contactChannel = functionToSwitchBetweenNameAndValuesChannels(values.contactChannel)
            values.preference = functionToSwitchBetweenNameAndPreferenceChannels(values.preference);
        }
        if(values.contactChannel0){
            values.contactChannel0 = functionToSwitchBetweenNameAndValuesChannels(values.contactChannel0)
            values.preference0 = functionToSwitchBetweenNameAndPreferenceChannels(values.preference0);
        }
        if(values.contactChannel1){
            values.contactChannel1 = functionToSwitchBetweenNameAndValuesChannels(values.contactChannel1)
            values.preference1 = functionToSwitchBetweenNameAndPreferenceChannels(values.preference1);
        }
        if(values.contactChannel2){
            values.contactChannel2 = functionToSwitchBetweenNameAndValuesChannels(values.contactChannel2)
            values.preference2 = functionToSwitchBetweenNameAndPreferenceChannels(values.preference2);
        }
        if(values.contactChannel3){
            values.contactChannel3 = functionToSwitchBetweenNameAndValuesChannels(values.contactChannel3)
            values.preference3 = functionToSwitchBetweenNameAndPreferenceChannels(values.preference3);
        }
        if(values.contactChannel4){
            values.contactChannel4 = functionToSwitchBetweenNameAndValuesChannels(values.contactChannel4)
            values.preference4 = functionToSwitchBetweenNameAndPreferenceChannels(values.preference4);
        }

        return values;
      }

      const functionToSwitchBetweenNameAndValuesChannels = (channelName) => {
        let channelValue = ""
        switch (channelName) {
            case 'Whatsapp':
                channelValue = "1";
                break;
            case 'Llamada':
                channelValue = "2";
                break;   
            case 'Email':
                channelValue = "3";
                break;          
            case 'LinkedIn':
                channelValue = "4";
                break;
            case 'Facebook':
                channelValue = "5";
                break;
            case 'Instagram':
                channelValue = "6";
                break;
            case '1':
                channelValue = "1";
                break;
            case '2':
                channelValue = "2";
                break;       
            case '3':
                channelValue = "3";
                break;             
            case '4':
                channelValue = "4";
                break;
            case '5':
                channelValue = "5";
                break;
            case '6':
                channelValue = "6";
                break;
            default:
                break;
        }
        return channelValue;
      }

      const functionToSwitchBetweenNameAndPreferenceChannels = (preferenceName) => {
        let preferenceValue = ""
        switch (preferenceName) {
            case 'Canal Favorito':
                preferenceValue = "fv";
                break;
            case 'Sin preferencia':
                preferenceValue = "sp";
                break;        
            case 'No molestar':
                preferenceValue = "nm";
                break;     
            case 'fv':
                preferenceValue = "fv";
                break;
            case 'sp':
                preferenceValue = "sp";
                break;        
            case 'nm':
                preferenceValue = "nm";
                break;           
            default:
                break;
        }
        return preferenceValue;
      }

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

        const contactChannelName = (channelId) => {
            let channelName = ""
            switch (channelId) {
                case 1: channelName = "Whatsapp"
                break;
                case 2: channelName = "Llamada"
                break;
                case 3: channelName = "Email"
                break;
                case 4: channelName = "LinkedIn"
                break;
                case 5: channelName = "Facebook"
                break;
                case 6: channelName = "Instagram"
                break;                                                                            
                default:
                    break;
            }
            // console.log(channelName);
            return channelName;
        }
        const preferenceChannelName = (preference) => {
            let preferenceName = ""
            switch (preference) {
                case 'fv': preferenceName = "Canal Favorito"
                break;
                case 'sp': preferenceName = "Sin preferencia"
                break;
                case 'nm': preferenceName = "No molestar"
                break;                                                                       
                default:
                    break;
            }
            // console.log(channelName);
            return preferenceName;
        }

      const fillFormWithCurrentData = () => {
        console.log("Entrando al rellenador");
        const currentContactLS = JSON.parse(localStorage.getItem("currentContact"))
        const currentContactChannelsLS = JSON.parse(localStorage.getItem("currentContactChannels"))
        console.log(currentContactChannelsLS);
        let value1, value2, value3, value4, value5, value6;
        //Necesitamos varias opciones aqui por que el contacto puede venir con 1 o 5 canales de contactos
        if(currentContactChannelsLS){
            console.log("ESta funcionando los canales del LS");
            switch(currentContactChannelsLS.length){
                case 1: 
                    console.log("Just one contactChannel");
                    form.setFieldsValue({
                        fullname: currentContactLS.fullname,
                        email: currentContactLS.email,
                        charge: currentContactLS.charge,
                        company_id: currentContactLS.company_id,
                        contactChannelValue: currentContactChannelsLS[0].channel_value,
                        contactChannel: contactChannelName(currentContactChannelsLS[0].channel_id),//Here you are filling the form items
                        //You need to fill also the contactChannel state
                        preference: preferenceChannelName(currentContactChannelsLS[0].preference)
                    });
                    value1 = currentContactChannelsLS[0].channel_id.toString();
                    setContactChannel1(value1);
                break;
                case 2:
                    console.log("two contactChannel");
                    form.setFieldsValue({
                        fullname: currentContactLS.fullname,
                        email: currentContactLS.email,
                        charge: currentContactLS.charge,
                        company_id: currentContactLS.company_id,
                        contactChannelValue: currentContactChannelsLS[0].channel_value,
                        contactChannelValue0: currentContactChannelsLS[1].channel_value,
                        contactChannel: contactChannelName(currentContactChannelsLS[0].channel_id),
                        contactChannel0: contactChannelName(currentContactChannelsLS[1].channel_id),
                        preference: preferenceChannelName(currentContactChannelsLS[0].preference),
                        preference0: preferenceChannelName(currentContactChannelsLS[1].preference),
                    });
                    value1 = currentContactChannelsLS[0].channel_id.toString();
                    setContactChannel1(value1);
                    value2 = currentContactChannelsLS[1].channel_id.toString();
                    setContactChannel2(value2);
                break;
                case 3:
                    console.log("three contactChannel");
                    form.setFieldsValue({
                        fullname: currentContactLS.fullname,
                        email: currentContactLS.email,
                        charge: currentContactLS.charge,
                        company_id: currentContactLS.company_id,
                        contactChannelValue: currentContactChannelsLS[0].channel_value,
                        contactChannelValue0: currentContactChannelsLS[1].channel_value,
                        contactChannelValue1: currentContactChannelsLS[2].channel_value,
                        contactChannel: contactChannelName(currentContactChannelsLS[0].channel_id),
                        contactChannel0: contactChannelName(currentContactChannelsLS[1].channel_id),
                        contactChannel1: contactChannelName(currentContactChannelsLS[2].channel_id),
                        preference: preferenceChannelName(currentContactChannelsLS[0].preference),
                        preference0: preferenceChannelName(currentContactChannelsLS[1].preference),
                        preference1: preferenceChannelName(currentContactChannelsLS[2].preference),
                    });
                    value1 = currentContactChannelsLS[0].channel_id.toString();
                    setContactChannel1(value1);
                    value2 = currentContactChannelsLS[1].channel_id.toString();
                    setContactChannel2(value2);
                    value3 = currentContactChannelsLS[2].channel_id.toString();
                    setContactChannel3(value3);
                break;
                case 4:
                    console.log("four contactChannel");
                    form.setFieldsValue({
                        fullname: currentContactLS.fullname,
                        email: currentContactLS.email,
                        charge: currentContactLS.charge,
                        company_id: currentContactLS.company_id,
                        contactChannelValue: currentContactChannelsLS[0].channel_value,
                        contactChannelValue0: currentContactChannelsLS[1].channel_value,
                        contactChannelValue1: currentContactChannelsLS[2].channel_value,
                        contactChannelValue2: currentContactChannelsLS[3].channel_value,
                        contactChannel: contactChannelName(currentContactChannelsLS[0].channel_id),
                        contactChannel0: contactChannelName(currentContactChannelsLS[1].channel_id),
                        contactChannel1: contactChannelName(currentContactChannelsLS[2].channel_id),
                        contactChannel2: contactChannelName(currentContactChannelsLS[3].channel_id),
                        preference: preferenceChannelName(currentContactChannelsLS[0].preference),
                        preference0: preferenceChannelName(currentContactChannelsLS[1].preference),
                        preference1: preferenceChannelName(currentContactChannelsLS[2].preference),
                        preference2: preferenceChannelName(currentContactChannelsLS[3].preference),
                    });
                    value1 = currentContactChannelsLS[0].channel_id.toString();
                    setContactChannel1(value1);
                    value2 = currentContactChannelsLS[1].channel_id.toString();
                    setContactChannel2(value2);
                    value3 = currentContactChannelsLS[2].channel_id.toString();
                    setContactChannel3(value3);
                    value4 = currentContactChannelsLS[3].channel_id.toString();
                    setContactChannel4(value4);
                break;
                case 5:
                    console.log("five contactChannel");
                    form.setFieldsValue({
                        fullname: currentContactLS.fullname,
                        email: currentContactLS.email,
                        charge: currentContactLS.charge,
                        company_id: currentContactLS.company_id,
                        contactChannelValue: currentContactChannelsLS[0].channel_value,
                        contactChannelValue0: currentContactChannelsLS[1].channel_value,
                        contactChannelValue1: currentContactChannelsLS[2].channel_value,
                        contactChannelValue2: currentContactChannelsLS[3].channel_value,
                        contactChannelValue3: currentContactChannelsLS[4].channel_value,
                        contactChannel: contactChannelName(currentContactChannelsLS[0].channel_id),
                        contactChannel0: contactChannelName(currentContactChannelsLS[1].channel_id),
                        contactChannel1: contactChannelName(currentContactChannelsLS[2].channel_id),
                        contactChannel2: contactChannelName(currentContactChannelsLS[3].channel_id),
                        contactChannel3: contactChannelName(currentContactChannelsLS[4].channel_id),
                        preference: preferenceChannelName(currentContactChannelsLS[0].preference),
                        preference0: preferenceChannelName(currentContactChannelsLS[1].preference),
                        preference1: preferenceChannelName(currentContactChannelsLS[2].preference),
                        preference2: preferenceChannelName(currentContactChannelsLS[3].preference),
                        preference3: preferenceChannelName(currentContactChannelsLS[4].preference),
                    });
                    value1 = currentContactChannelsLS[0].channel_id.toString();
                    setContactChannel1(value1);
                    value2 = currentContactChannelsLS[1].channel_id.toString();
                    setContactChannel2(value2);
                    value3 = currentContactChannelsLS[2].channel_id.toString();
                    setContactChannel3(value3);
                    value4 = currentContactChannelsLS[3].channel_id.toString();
                    setContactChannel4(value4);
                    value5 = currentContactChannelsLS[4].channel_id.toString();
                    setContactChannel4(value5);
                break;
                case 6:
                    console.log("six contactChannel");
                    form.setFieldsValue({
                        fullname: currentContactLS.fullname,
                        email: currentContactLS.email,
                        charge: currentContactLS.charge,
                        company_id: currentContactLS.company_id,
                        contactChannelValue: currentContactChannelsLS[0].channel_value,
                        contactChannelValue0: currentContactChannelsLS[1].channel_value,
                        contactChannelValue1: currentContactChannelsLS[2].channel_value,
                        contactChannelValue2: currentContactChannelsLS[3].channel_value,
                        contactChannelValue3: currentContactChannelsLS[4].channel_value,
                        contactChannelValue4: currentContactChannelsLS[5].channel_value,
                        contactChannel: contactChannelName(currentContactChannelsLS[0].channel_id),
                        contactChannel0: contactChannelName(currentContactChannelsLS[1].channel_id),
                        contactChannel1: contactChannelName(currentContactChannelsLS[2].channel_id),
                        contactChannel2: contactChannelName(currentContactChannelsLS[3].channel_id),
                        contactChannel3: contactChannelName(currentContactChannelsLS[4].channel_id),
                        contactChannel4: contactChannelName(currentContactChannelsLS[5].channel_id),
                        preference: preferenceChannelName(currentContactChannelsLS[0].preference),
                        preference0: preferenceChannelName(currentContactChannelsLS[1].preference),
                        preference1: preferenceChannelName(currentContactChannelsLS[2].preference),
                        preference2: preferenceChannelName(currentContactChannelsLS[3].preference),
                        preference3: preferenceChannelName(currentContactChannelsLS[4].preference),
                        preference4: preferenceChannelName(currentContactChannelsLS[5].preference),
                    });
                    value1 = currentContactChannelsLS[0].channel_id.toString();
                    setContactChannel1(value1);
                    value2 = currentContactChannelsLS[1].channel_id.toString();
                    setContactChannel2(value2);
                    value3 = currentContactChannelsLS[2].channel_id.toString();
                    setContactChannel3(value3);
                    value4 = currentContactChannelsLS[3].channel_id.toString();
                    setContactChannel4(value4);
                    value5 = currentContactChannelsLS[4].channel_id.toString();
                    setContactChannel4(value5);
                    value6 = currentContactChannelsLS[5].channel_id.toString();
                    setContactChannel4(value6);
                break;
                default: break;
            }
            currentContactChannelsLS.forEach(item => {
                changeOptionToTrue(item.channel_id.toString())
            })
        }else{
            console.log(currentContactChannels);
            switch(currentContactChannels.length){
                case 1: 
                    console.log("Just one contactChannel");
                    form.setFieldsValue({
                        fullname: currentContactLS.fullname,
                        email: currentContactLS.email,
                        company_id: currentContactLS.company_id,
                        contactChannelValue: currentContactChannels[0].channel_value,
                        contactChannel: contactChannelName(currentContactChannels[0].channel_id),//Here you are filling the form items
                        //You need to fill also the contactChannel state
                        preference: preferenceChannelName(currentContactChannels[0].preference)
                    });
                    value1 = currentContactChannels[0].channel_id.toString();
                    setContactChannel1(value1);
                break;
                case 2:
                    console.log("two contactChannel");
                    form.setFieldsValue({
                        fullname: currentContactLS.fullname,
                        email: currentContactLS.email,
                        company_id: currentContactLS.company_id,
                        contactChannelValue: currentContactChannels[0].channel_value,
                        contactChannelValue0: currentContactChannels[1].channel_value,
                        contactChannel: contactChannelName(currentContactChannels[0].channel_id),
                        contactChannel0: contactChannelName(currentContactChannels[1].channel_id),
                        preference: preferenceChannelName(currentContactChannels[0].preference),
                        preference0: preferenceChannelName(currentContactChannels[1].preference),
                    });
                    value1 = currentContactChannels[0].channel_id.toString();
                    setContactChannel1(value1);
                    value2 = currentContactChannels[1].channel_id.toString();
                    setContactChannel2(value2);
                break;
                case 3:
                    console.log("three contactChannel");
                    form.setFieldsValue({
                        fullname: currentContactLS.fullname,
                        email: currentContactLS.email,
                        company_id: currentContactLS.company_id,
                        contactChannelValue: currentContactChannels[0].channel_value,
                        contactChannelValue0: currentContactChannels[1].channel_value,
                        contactChannelValue1: currentContactChannels[2].channel_value,
                        contactChannel: contactChannelName(currentContactChannels[0].channel_id),
                        contactChannel0: contactChannelName(currentContactChannels[1].channel_id),
                        contactChannel1: contactChannelName(currentContactChannels[2].channel_id),
                        preference: preferenceChannelName(currentContactChannels[0].preference),
                        preference0: preferenceChannelName(currentContactChannels[1].preference),
                        preference1: preferenceChannelName(currentContactChannels[2].preference),
                    });
                    value1 = currentContactChannels[0].channel_id.toString();
                    setContactChannel1(value1);
                    value2 = currentContactChannels[1].channel_id.toString();
                    setContactChannel2(value2);
                    value3 = currentContactChannels[2].channel_id.toString();
                    setContactChannel3(value3);
                break;
                case 4:
                    console.log("four contactChannel");
                    form.setFieldsValue({
                        fullname: currentContactLS.fullname,
                        email: currentContactLS.email,
                        company_id: currentContactLS.company_id,
                        contactChannelValue: currentContactChannels[0].channel_value,
                        contactChannelValue0: currentContactChannels[1].channel_value,
                        contactChannelValue1: currentContactChannels[2].channel_value,
                        contactChannelValue2: currentContactChannels[3].channel_value,
                        contactChannel: contactChannelName(currentContactChannels[0].channel_id),
                        contactChannel0: contactChannelName(currentContactChannels[1].channel_id),
                        contactChannel1: contactChannelName(currentContactChannels[2].channel_id),
                        contactChannel2: contactChannelName(currentContactChannels[3].channel_id),
                        preference: preferenceChannelName(currentContactChannels[0].preference),
                        preference0: preferenceChannelName(currentContactChannels[1].preference),
                        preference1: preferenceChannelName(currentContactChannels[2].preference),
                        preference2: preferenceChannelName(currentContactChannels[3].preference),
                    });
                    value1 = currentContactChannels[0].channel_id.toString();
                    setContactChannel1(value1);
                    value2 = currentContactChannels[1].channel_id.toString();
                    setContactChannel2(value2);
                    value3 = currentContactChannels[2].channel_id.toString();
                    setContactChannel3(value3);
                    value4 = currentContactChannels[3].channel_id.toString();
                    setContactChannel4(value4);
                break;
                case 5:
                    console.log("five contactChannel");
                    form.setFieldsValue({
                        fullname: currentContactLS.fullname,
                        email: currentContactLS.email,
                        company_id: currentContactLS.company_id,
                        contactChannelValue: currentContactChannels[0].channel_value,
                        contactChannelValue0: currentContactChannels[1].channel_value,
                        contactChannelValue1: currentContactChannels[2].channel_value,
                        contactChannelValue2: currentContactChannels[3].channel_value,
                        contactChannelValue3: currentContactChannels[4].channel_value,
                        contactChannel: contactChannelName(currentContactChannels[0].channel_id),
                        contactChannel0: contactChannelName(currentContactChannels[1].channel_id),
                        contactChannel1: contactChannelName(currentContactChannels[2].channel_id),
                        contactChannel2: contactChannelName(currentContactChannels[3].channel_id),
                        contactChannel3: contactChannelName(currentContactChannels[4].channel_id),
                        preference: preferenceChannelName(currentContactChannels[0].preference),
                        preference0: preferenceChannelName(currentContactChannels[1].preference),
                        preference1: preferenceChannelName(currentContactChannels[2].preference),
                        preference2: preferenceChannelName(currentContactChannels[3].preference),
                        preference3: preferenceChannelName(currentContactChannels[4].preference),
                    });
                    value1 = currentContactChannels[0].channel_id.toString();
                    setContactChannel1(value1);
                    value2 = currentContactChannels[1].channel_id.toString();
                    setContactChannel2(value2);
                    value3 = currentContactChannels[2].channel_id.toString();
                    setContactChannel3(value3);
                    value4 = currentContactChannels[3].channel_id.toString();
                    setContactChannel4(value4);
                    value5 = currentContactChannels[4].channel_id.toString();
                    setContactChannel4(value5);
                break;
                case 6:
                    console.log("six contactChannel");
                    form.setFieldsValue({
                        fullname: currentContactLS.fullname,
                        email: currentContactLS.email,
                        company_id: currentContactLS.company_id,
                        contactChannelValue: currentContactChannels[0].channel_value,
                        contactChannelValue0: currentContactChannels[1].channel_value,
                        contactChannelValue1: currentContactChannels[2].channel_value,
                        contactChannelValue2: currentContactChannels[3].channel_value,
                        contactChannelValue3: currentContactChannels[4].channel_value,
                        contactChannelValue4: currentContactChannels[5].channel_value,
                        contactChannel: contactChannelName(currentContactChannels[0].channel_id),
                        contactChannel0: contactChannelName(currentContactChannels[1].channel_id),
                        contactChannel1: contactChannelName(currentContactChannels[2].channel_id),
                        contactChannel2: contactChannelName(currentContactChannels[3].channel_id),
                        contactChannel3: contactChannelName(currentContactChannels[4].channel_id),
                        contactChannel4: contactChannelName(currentContactChannels[5].channel_id),
                        preference: preferenceChannelName(currentContactChannels[0].preference),
                        preference0: preferenceChannelName(currentContactChannels[1].preference),
                        preference1: preferenceChannelName(currentContactChannels[2].preference),
                        preference2: preferenceChannelName(currentContactChannels[3].preference),
                        preference3: preferenceChannelName(currentContactChannels[4].preference),
                        preference4: preferenceChannelName(currentContactChannels[5].preference),
                    });
                    value1 = currentContactChannels[0].channel_id.toString();
                    setContactChannel1(value1);
                    value2 = currentContactChannels[1].channel_id.toString();
                    setContactChannel2(value2);
                    value3 = currentContactChannels[2].channel_id.toString();
                    setContactChannel3(value3);
                    value4 = currentContactChannels[3].channel_id.toString();
                    setContactChannel4(value4);
                    value5 = currentContactChannels[4].channel_id.toString();
                    setContactChannel4(value5);
                    value6 = currentContactChannels[5].channel_id.toString();
                    setContactChannel4(value6);
                break;
                default: break;
            }
            currentContactChannels.forEach(item => {
                changeOptionToTrue(item.channel_id.toString())
            })
        }
      }

      const showInputRegion = () => {
          console.log("presionaste el boton");
          setActiveInputForAddress(true);
      }
      const onContactChannelChange = (value) => {
        console.log(value);
        console.log(typeof(value));
        setCanalContacto(value);
        if(contactChannel1 ===""){
            console.log("hello world true");
            console.log(contactChannel1);
            changeOptionToTrue(value)
            setContactChannel1(value)
        }else{
            console.log("hello world false");
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
      }
      const onCuentaUsuarioChange = (e) => {
        console.log(e.target.value);
        setCuentaUsuario(e.target.value);
        // console.log("hello are you changin the contact channel value");
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
    const newContactChannelRow = () => {
        const channelsModified = [];
        let contadorFalse = 0;
        console.log(channels);
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
        console.log(formularioRef);
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
            <h3 className="text-primary text-center">Update the data of the contact</h3>
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
                                rules={[{ required: true, message: 'Please input your email!!' }]} 
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item 
                                name="charge" 
                                label="Charge" 
                                rules={[{ required: true, message: 'Please input your charge!!' }]}
                            >
                                <Input />
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
                                defaultValue={JSON.parse(localStorage.getItem("currentContact")).company_id}
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
                                rules={[{ required: true, message: 'Please input your contact channel!!' }]}
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
                                // rules={[{ required: true, message: 'Select one contact channel!!' }]}
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
                {!activeInputForAddress 
                    ? <Row>
                        <Col span={2}>
                        </Col>
                        <Col span={20}>
                            <p className="m-0 text-dark">Your current address is: <span className="px-3 text-danger">{JSON.parse(localStorage.getItem("currentContact")).fk_region_id} - {JSON.parse(localStorage.getItem("currentContact")).fk_country_id} - {JSON.parse(localStorage.getItem("currentContact")).fk_city_id} - {JSON.parse(localStorage.getItem("currentContact")).address}</span><a className="px-3 btn btn-danger" onClick={showInputRegion}>change address?</a></p>
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
                                    rules={[{ required: true, message: 'Please input your contact region!!' }]}
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
                                    rules={[{ required: true, message: 'Please input your contact country!!' }]}
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
                                    rules={[{ required: true, message: 'Please input your contact city!!' }]}
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
                                    <Link to={'/regiones'} className='btn btn-sm btn-primary mt-1'>
                                        Add new one
                                    </Link>
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item 
                                    name="address" 
                                    label="Address" 
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            
                            <Col span={2}></Col>
                    </Row>
                    : null           
                }
                    {/* <Row gutter={16}>
                            <Col span={2}></Col>
                            <Col span={5}>
                                <Form.Item name="fk_region_id" label="Region" initialValue={currentContact.region_id} valuePropName = "option">
                                    <Select
                                    name="fk_region_id"
                                    label="Region"
                                    placeholder="Select your region"
                                    onChange={onRegionChange}
                                    allowClear={false}
                                    // value={region}
                                    defaultValue={[`${currentContact.fk_region_id}`]}
                                    // defaultValue={currentContact.fk_region_id}
                                    notFoundContent="Please add the region"
                                    >
                                    {regiones.map( region => (
                                        <Select.Option value={region.region_id} key={region.region_id}>{region.region_name}</Select.Option>    
                                    ))}
                                    
                                    </Select>
                                    <Button type="primary" icon={<PlusCircleOutlined />} className="add-new-item"></Button>
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item name="fk_country_id" label="Country" initialValue={currentContact.country_id}>
                                    <Select
                                    placeholder={placeHolderCountry}
                                    onChange={onCountryChange}
                                    allowClear={false}
                                    // value={country}
                                    defaultValue={[`${currentContact.fk_country_id}`]}
                                    // value={currentContact.fk_country_id}
                                    notFoundContent="Please add the country"
                                    >
                                    {paisesDeRegion.map( country => (
                                        <Select.Option value={country.country_id} key={country.country_id}>{country.country_name}</Select.Option>    
                                    ))}
                                    </Select>
                                    <Button type="primary" icon={<PlusCircleOutlined />} className="add-new-item"></Button>
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item name="fk_city_id" label="City" initialValue={currentContact.city_id}>
                                    <Select
                                    placeholder={placeHolderCity}
                                    onChange={onCityChange}
                                    allowClear={false}
                                    // value={city}
                                    defaultValue={[`${currentContact.fk_city_id}`]}
                                    // defaultValue={currentContact.fk_city_id}
                                    notFoundContent="Please add the city"
                                    >
                                    {ciudadesDePais.map( city => (
                                        <Select.Option value={city.city_id} key={city.city_id}>{city.city_name}</Select.Option>    
                                    ))}
                                    </Select>
                                    <Button type="primary" icon={<PlusCircleOutlined />} className="add-new-item"></Button>
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item name="address" label="Address" >
                                    <Input />
                                </Form.Item>
                            </Col>
                            
                            <Col span={2}></Col>
                    </Row> */}
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
 
export default UpdateContact;