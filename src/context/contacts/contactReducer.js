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
    UPDATE_CURRENT_CONTACT,
    UPDATE_CURRENT_COMPANY,
    DELETE_COMPANY,
    FILTRAR_CONTACTOS,
    FILTER_FORM,
    DELETE_FILTER,
    OBTENER_CONTACT_CHANNELS,
    DELETE_CONTACT_CHANNELS,
    DELETE_CURRENT_CONTACT,
    DELETE_CURRENT_COMPANY
} from '../../types'

export default (state, action) => {
    switch(action.type) {
        case OBTENER_CONTACTOS:
            return {
                ...state,
                contactos: action.payload,
            }
        case OBTENER_REGIONES_FORMULARIO:
            return {
                ...state,
                regiones: action.payload
            }
        case OBTENER_PAISES_DE_REGION:
            return{
                ...state,
                paisesDeRegion: action.payload
            }
        case OBTENER_CIUDADES_DE_PAIS:
            return{
                ...state,
                ciudadesDePais: action.payload
            }
        case OBTENER_COMPANIAS:
            return{
                ...state,
                companias: action.payload
            }
        case SELECCIONAR_REGION:
            return{
                ...state,
                regionName: action.payload
            }
        case SELECCIONAR_PAIS:
            return{
                ...state,
                country: state.paisesDeRegion.find(pais => pais.country_id === action.payload)
            }
        case SELECCIONAR_CIUDAD:
            return{
                ...state,
                city: state.ciudadesDePais.find(ciudad => ciudad.city_id === action.payload)
            }
        case DELETE_CONTACT: 
            return{
                ...state,
                contactos: state.contactos.filter(contacto => contacto.id.toString() !== action.payload)
            }
        case DELETE_COMPANY: 
            return{
                ...state,
                companias: state.companias.filter(compania => compania.id.toString() !== action.payload)
        }
        case UPDATE_CURRENT_CONTACT:
            localStorage.setItem('currentContact', JSON.stringify(state.contactos.find(contacto => contacto.id.toString() === action.payload)))
            return{
                ...state,
                currentContact: state.contactos.find(contacto => contacto.id.toString() === action.payload)
            }
        case DELETE_CURRENT_CONTACT:
            return{
                ...state,
                currentContact: {}
            }
        case UPDATE_CURRENT_COMPANY:
            localStorage.setItem('currentCompany', JSON.stringify(state.companias.find(compania => compania.id.toString() === action.payload)))
            return{
                ...state,
                currentCompany: state.companias.find(compania => compania.id.toString() === action.payload)
            }
        case DELETE_CURRENT_COMPANY:
            return{
                ...state,
                currentCompany: {}
            }
        case FILTRAR_CONTACTOS:
            return{
                ...state,
                contactos: action.payload,
            }
        case FILTER_FORM: 
            return{
                ...state,
                filterForm: !state.filterForm
            }
        case DELETE_FILTER: 
            return{
                ...state,
                deleteFilter: !state.deleteFilter
            }
        case OBTENER_CONTACT_CHANNELS:
            localStorage.setItem('currentContactChannels', JSON.stringify(action.payload))
            return{
                ...state,
                currentContactChannels: [...action.payload]
            }
        case DELETE_CONTACT_CHANNELS:
            return{
                ...state,
                currentContactChannels: []
            }
        default: 
            return state;
    }
}