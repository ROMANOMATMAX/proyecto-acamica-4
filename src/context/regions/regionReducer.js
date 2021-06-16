import {
    OBTENER_REGIONES,
    ERROR_OBTENER_REGIONES,
} from '../../types'

export default (state, action) => {
    switch(action.type) {
        case OBTENER_REGIONES:
            return {
                ...state,
                dataTreeInformation: action.payload
            
            }
        case ERROR_OBTENER_REGIONES:
            return {
                ...state
            }
        default:
            return state;
    }
}