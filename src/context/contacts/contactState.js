import React, {useReducer} from 'react';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/token'
import {
    OBTENER_CONTACTOS,
    OBTENER_REGIONES_FORMULARIO,
    OBTENER_PAISES_DE_REGION,
    OBTENER_CIUDADES_DE_PAIS,
    OBTENER_COMPANIAS,
    SELECCIONAR_REGION,
    SELECCIONAR_PAIS,
    SELECCIONAR_CIUDAD,
    DELETE_CONTACT,
    CREATE_CONTACT,
    UPDATE_CURRENT_CONTACT,
    UPDATE_CURRENT_COMPANY,
    DELETE_COMPANY,
    FILTRAR_CONTACTOS,
    FILTER_FORM,
    DELETE_FILTER,
    OBTENER_CONTACT_CHANNELS,
    DELETE_CONTACT_CHANNELS,
    DELETE_CURRENT_CONTACT,
    DELETE_CURRENT_COMPANY,
    DELETE_CIUDADES_DE_PAIS
} from '../../types'
import { PoundOutlined } from '@ant-design/icons';

const ContactState = props => {
    //Estado inicial
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        contactos: null,
        regionId: 0,
        regiones: [],
        paisesDeRegion: [],
        ciudadesDePais: [],
        companias: [],
        regionName: "",
        countryName:"",
        city: "",
        currentContact: {},
        currentCompany: {},
        filterForm: false,
        deleteFilter: false,
        currentContactChannels: []
        // currentComponent: "",
    }
    //Asociar with useReducer the function and the state
    const [state, dispatch] = useReducer(ContactReducer, initialState);
    //Funciones dispatch
    //funcion para obtener todos los contactos 
    const obtenerContactos = async () => {
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        try{//vamos a tratar traer todos los contactos
            const respuesta = await clienteAxios.get('/contacts/allContacts');
            // console.log(respuesta.data);
            const dataContactNeeded = respuesta.data.map( item => (
                {
                    key: item.id.toString(),
                    id: item.id,
                    fullname: item.fullname,
                    email: item.email,
                    charge: item.charge,
                    address: item.address,
                    company_id: item.company_id,
                    company_name: item.name,
                    fk_city_id: item.city_name,
                    fk_country_id: item.country_name,
                    fk_region_id: item.region_name,
                    city_id: item.fk_city_id,
                    country_id: item.fk_country_id,
                    region_id: item.fk_region_id,
                    whatsapp: item.whatsapp,
                    llamada: item.llamada,
                    emailchannel: item.emailchannel,
                    linkedIn: item.linkedIn,
                    facebook: item.facebook,
                    instagram: item.instagram
                }
            )
            )
            // console.log(dataContactNeeded);
            //Dentro de dataContactNeeded tengo acceso a los id de todos los contactos 
            //Puedo hacer un forEach y hacer una consulta para cada uno e ir modificando el array
            //declaramos un array vacio que sera el que tendra la info de contactChannels
            // let dataContactNeededWithChannels = []
            // const newArrayDos = []
            // for(const dataContact of dataContactNeeded ) {
            //     const contactChannelData = await clienteAxios.get(`/contacts/allContactChannels/${dataContact.id}`);
            //     // console.log(contactChannelData);
            //     //contactChannelData.data es un array de objetos - ACa debo trabajarlo para que se dividan los datos de un contacto
            //     const newArray = [] //Va a ser un array de strings de la forma ["whatssap: 3884137627", "email: romanomatias99@gmail.com"]
            //     const objectOnTheWay  ={
            //         ...dataContact,
            //         whatsapp: "",
            //         llamada: "",
            //         email: "",
            //         linkedIn:"",
            //         facebook: "",
            //         instagram: ""
            //     }
            //     contactChannelData.data.forEach(element => {
            //         if(element.channel_id === 1){
            //             objectOnTheWay.whatsapp= element.channel_value;
            //         }
            //         if(element.channel_id === 2){
            //             objectOnTheWay.llamada=element.channel_value
            //         }
            //         if(element.channel_id === 3){
            //             objectOnTheWay.email=element.channel_value
            //         }
            //         if(element.channel_id === 4){
            //             objectOnTheWay.linkedIn=element.channel_value
            //         }
            //         if(element.channel_id === 5){
            //             objectOnTheWay.facebook=element.channel_value
            //         }
            //         if(element.channel_id === 6){
            //             objectOnTheWay.instagram=element.channel_value
            //         }
            //     });
            //     newArrayDos.push(objectOnTheWay)

            // }
            // console.log(newArrayDos);
            // const newArrayTres = []
            //     newArrayDos.forEach(item => {
            //         const objectOnTheWay  ={
            //             ...item
            //         }
            //         if(!item.whatsapp){
            //             objectOnTheWay.whatsapp="";
            //         }
            //         if(!item.llamada){
            //             objectOnTheWay.llamada="";
            //         }
            //         if(!item.email){
            //             objectOnTheWay.email="";
            //         }
            //         if(!item.linkedIn){
            //             objectOnTheWay.linkedIn="";
            //         }
            //         if(!item.facebook){
            //             objectOnTheWay.facebook="";
            //         }
            //         if(!item.instagram){
            //             objectOnTheWay.instagram="";
            //         }
            //         newArrayTres.push(objectOnTheWay)
            //     })
            // console.log(newArrayTres);
            // console.log(newArrayDos);
            dispatch({
                type: OBTENER_CONTACTOS,
                payload: dataContactNeeded
            })
        }catch(error){
            console.log(error);
            // dispatch({
            //     type: LOGIN_ERROR,
            // })
        }
    }
    //Funcion para obtener todas las regiones que hay en DB
    const getRegions = async () => {
        console.log("Soy el fetch de regions");
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        const allRegions = await clienteAxios.get(`/regions/allRegions`);
        const regionsData = allRegions.data;
        console.log(regionsData);
        dispatch({
            type: OBTENER_REGIONES_FORMULARIO,
            payload: regionsData
        })
        // let regionsArrayData = [];
        // Object.keys(regionsData).forEach(key => {
        //     regionsArrayData.push(regionsData[key]);
        // });
        // console.log("resultado de regions fetch", regionsArrayData);
        // await setRegions(regionsArrayData);
        // console.log(regionsArrayData);
        // // await setRegion(regionsArrayData[0].region_name)
        // console.log(region);
        // return regionsArrayData[0].id;
    }
    //Funcion para retornar todos los paises de una region
    const getCountriesByRegion = async (regionId) => {
        console.log("Soy el fetch de countries");
        console.log(regionId);
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        const countriesList = await clienteAxios.get(`/regions/countriesByRegion/${regionId}`);
        const countriesOfRegionData = countriesList.data;
        console.log(countriesOfRegionData);
        dispatch({
            type: OBTENER_PAISES_DE_REGION,
            payload: countriesOfRegionData
        })
        // Object.keys(countriesOfRegionData).forEach(key => {
        //     countriesOfRegionArrayData.push(countriesOfRegionData[key]);
        // });
        // console.log("resultado de countries fetch", countriesOfRegionArrayData); 
        // await setCountries(countriesOfRegionArrayData);
        // await setCountry(countries[0].country_name)
        // return countriesOfRegionArrayData[0].id;
    }
    /************ Ciudades de un Pais ***************/
    //Funcion para obtener todas las ciudades de un pais que hay en DB
    const getCitiesByCountry = async (countryId) => {
        const citiesList = await clienteAxios.get(`/regions/citiesByCountry/${countryId}`);
        const citiesOfCountryData = citiesList.data;
        console.log(citiesOfCountryData);
        dispatch({
            type: OBTENER_CIUDADES_DE_PAIS,
            payload: citiesOfCountryData
        })
        // let citiesOfCountryArrayData = [];
        // Object.keys(citiesOfCountryData).forEach(key => {
        //     citiesOfCountryArrayData.push(citiesOfCountryData[key]);
        // });
        // console.log(citiesOfCountryData[0].city_name);
        // await setCities(citiesOfCountryArrayData);
        // await setCity(citiesOfCountryArrayData[0].city_name)
    }

    const deleteCitiesByCountry = async () => {
        dispatch({
            type: DELETE_CIUDADES_DE_PAIS,
        })
    }
    /************ Companies ***************/
    //Funcion para obtener todas las compañias que hay en DB
    const getCompanies = async () => {
        console.log("Soy el fetch de companies");
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        const companiesList = await clienteAxios.get(`companies/allCompanies`);
        const companiesData = companiesList.data;
        console.log(companiesData);
        dispatch({
            type: OBTENER_COMPANIAS,
            payload: companiesData
        })
        // let companiesArrayData = [];
        // Object.keys(companiesData).forEach(key => {
        //     companiesArrayData.push(companiesData[key]);
        // });
        // await setCompanies(companiesArrayData);
        // console.log(companies);
    }
    const fillRegionField = (regionId) => {
        console.log(regionId);
        const regionFound = state.regiones.find(region => region.region_id === regionId)
        console.log(regionFound.region_name);
        dispatch({
            type: SELECCIONAR_REGION,
            payload: regionFound.region_name
        })
    }
    const fillCountryField = (countryId) => {
        console.log(countryId);
        dispatch({
            type: SELECCIONAR_PAIS,
            payload: countryId
        })
    }
    const fillCityField = (cityId) => {
        console.log(cityId);
        dispatch({
            type: SELECCIONAR_CIUDAD,
            payload: cityId
        })
    }
    const deleteContact = async (contactId) => {
        console.log(contactId);
        console.log("Soy el fetch de companies");
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        const companiesList = await clienteAxios.delete(`/contacts/removeContact/${contactId}`);
        const companiesData = companiesList.data;
        console.log(companiesData);
        dispatch({
            type: DELETE_CONTACT,
            payload: contactId
        })
    }
    const createContact = async (contactData, contactChannelsData) => {//Hay que pasarle 1- la data del nuevo contacto 2- la data de los canales de contacto
        console.log(contactData);  
        console.log(contactChannelsData);
        console.log("Soy el fetch de companies");
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        const respuesta = await clienteAxios.post(`/contacts/addContact`, contactData);
        console.log(respuesta.data.new_contact_id); //Aca tengo el id del nuevo contacto creado ahora necesito pasarle este dato a la funcion que crea los contactos
        //Luego de obtener el id del nuevo contacto creado debemos formar el array de canales que necesita de contact_id channel_id preference channel_value
        // const contactChannelsDataWithId = [];
        const contactChannelsDataWithId = contactChannelsData.map(channel => {
            return {
                ...channel,
                contact_id: respuesta.data.new_contact_id
            }
        })
        console.log(contactChannelsDataWithId);
        //Aquí tendremos un array de objetos el cual deberá ser recorrido y se debe hacer una query por cada item
        for (const contactChannel of contactChannelsDataWithId) {
            const contents = await clienteAxios.post(`/contacts/addChannelToContact`, contactChannel);
            console.log(contents);
        }
        obtenerContactos();
    }
    const deleteCompany = async (companyId) => {
        console.log(companyId);
        console.log(typeof(companyId));
        let companyIdNumber;
        if(typeof(companyId) === "number"){//Si es un numero esta viniendo de deleteSelected necesito pasar a string
            companyIdNumber = companyId.toString();
        }else{
            companyIdNumber = companyId;
        }
        console.log(companyIdNumber);
        console.log("Soy el fetch de companies");
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        const companiesList = await clienteAxios.delete(`/companies/removeCompany/${companyIdNumber}`);
        const companiesData = companiesList.data;
        console.log(companiesData);
        dispatch({
            type: DELETE_COMPANY,
            payload: companyIdNumber
        })
    }
    const createCompany = async (companyData) => {
        console.log(companyData);
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        const respuesta = await clienteAxios.post(`/companies/addCompany`, companyData);
        console.log(respuesta);
        getCompanies();
    }

    const updateCurrentContact = async(contactId) => {
        // localStorage.setItem('currentContact', contactId)
        dispatch({
            type: UPDATE_CURRENT_CONTACT,
            payload: contactId
        })
    }
    const deleteCurrentContact = async() => {
        // localStorage.setItem('currentContact', contactId)
        dispatch({
            type: DELETE_CURRENT_CONTACT
        })
    }

    const updateCurrentCompany = async(companyId) => {
        // localStorage.setItem('currentContact', contactId)
        dispatch({
            type: UPDATE_CURRENT_COMPANY,
            payload: companyId
        })
    }

    const deleteCurrentCompany = async() => {
        // localStorage.setItem('currentContact', contactId)
        dispatch({
            type: DELETE_CURRENT_COMPANY
        })
    }

    const updateCurrentContactInDB = async (contactId, values, contactChannelsData) => {
        console.log(contactId);
        console.log(values);
        console.log(contactChannelsData);
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        //ACTUALIZO EL CONTACTO SIN TENER EN CUENTA SUS CONTACT CHANNELS
        const companiesList = await clienteAxios.put(`contacts/modifyContact/${contactId}`, values);
        //A la info que me llego de los contact channels le agrego el contact_id
        const contactChannelsDataWithId = contactChannelsData.map(channel => {
            return {
                ...channel,
                contact_id: contactId
            }
        })
        console.log(contactChannelsDataWithId);
        //Borrar los anteriores canales de contactos de ese usuario para crear los nuevos
        await clienteAxios.delete(`/contacts/removeAllContactChannels/${contactId}`);
        //Creo los nuevos canales de contacto de ese usuario
        for (const contactChannel of contactChannelsDataWithId) {
            const contents = await clienteAxios.post(`/contacts/addChannelToContact`, contactChannel);
            console.log(contents);
        }
        obtenerContactos();
    }

    const updateCurrentCompanyInDB = async (companyId, values) => {
        console.log(companyId);
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        const companiesList = await clienteAxios.put(`companies/modifyCompany/${companyId}`, values);
        getCompanies();
    }
    const getFilteredContact = async (filterToApply) => {
        console.log("Hello world");
        console.log(filterToApply);
        const {city, compania, charge, country, email, fullname, region} = filterToApply;
        // console.log(typeof(region));
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        const companiesList = await clienteAxios.get(`/contacts/filterContact`, {params: {city, compania, country, email, fullname, charge, region}});
        console.log(companiesList.data.modifiedContacts);
        if(companiesList.data.atLessOneFilterIsUsed) {//Hay algun filtro aplicado
            //Actualizo la lista de contactos
            const dataContactNeeded = companiesList.data.modifiedContacts.map( item => (
                {
                    key: item.id.toString(),
                    id: item.id,
                    fullname: item.fullname,
                    email: item.email,
                    charge: item.charge,
                    address: item.address,
                    company_id: item.company_id,
                    company_name: item.name,
                    fk_city_id: item.city_name,
                    fk_country_id: item.country_name,
                    fk_region_id: item.region_name,
                    city_id: item.fk_city_id,
                    country_id: item.fk_country_id,
                    region_id: item.fk_region_id,
                    whatsapp: item.whatsapp,
                    llamada: item.llamada,
                    emailchannel: item.emailchannel,
                    linkedIn: item.linkedIn,
                    facebook: item.facebook,
                    instagram: item.instagram
                }
            ))
            dispatch({
                type: FILTRAR_CONTACTOS,
                payload: dataContactNeeded
            })
        }else{
            console.log("no aplicaste filtro se muestran todos los contactos");
        }
    }
    // const updateCurrentComponent = async (contactId, values) => {
    //     console.log(contactId);
    //     const token = localStorage.getItem('token');
    //     if(token){
    //         tokenAuth(token);
    //     }
    //     const companiesList = await clienteAxios.put(`contacts/modifyContact/${contactId}`, values);
    //     obtenerContactos();
    // }
    //retornamos el provider
    const modifiedFilterForm = () => {
        dispatch({
            type: FILTER_FORM,
        })
    }
    const modifiedDeleteFilter = () => {
        dispatch({
            type: DELETE_FILTER,
        })
    }
    const allChannelsOfOneContact = async (contact_id) =>{
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        const channelsList = await clienteAxios.get(`/contacts/allContactChannels/${contact_id}`);
        console.log(channelsList.data);
        dispatch({
            type: OBTENER_CONTACT_CHANNELS,
            payload: channelsList.data
        })
    }
    const deleteAllChannelsOfOneContact = async () =>{
        dispatch({
            type: DELETE_CONTACT_CHANNELS
        })
    }
    return(
        <ContactContext.Provider
            value={{
                contactos: state.contactos,
                regiones: state.regiones,
                paisesDeRegion: state.paisesDeRegion,
                ciudadesDePais: state.ciudadesDePais,
                companias: state.companias,
                regionName: state.regionName,
                country: state.country,
                city: state.city,
                currentContact: state.currentContact,
                currentCompany: state.currentCompany,
                filterForm: state.filterForm,
                deleteFilter: state.deleteFilter,
                currentContactChannels: state.currentContactChannels,
                modifiedFilterForm,
                modifiedDeleteFilter,
                obtenerContactos,
                getRegions,
                getCountriesByRegion,
                getCitiesByCountry,
                getCompanies,
                fillRegionField,
                fillCountryField,
                fillCityField,
                deleteContact,
                createContact,
                createCompany,
                updateCurrentContact,
                updateCurrentContactInDB,
                updateCurrentCompany,
                updateCurrentCompanyInDB,
                deleteCompany,
                getFilteredContact,
                allChannelsOfOneContact,
                deleteAllChannelsOfOneContact,
                deleteCurrentContact,
                deleteCurrentCompany,
                deleteCitiesByCountry
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;