import {
    OBTENER_USUARIOS,
    UPDATE_CURRENT_USER,
    DELETE_CURRENT_USER,
    DELETE_USER
} from '../../types'

export default (state, action) => {
    switch(action.type) {
        case OBTENER_USUARIOS:
            return {
                ...state, 
                usuarios: action.payload           
            }
        case UPDATE_CURRENT_USER: 
        localStorage.setItem('currentUser', JSON.stringify(state.usuarios.find(usuario => usuario.id.toString() === action.payload)))
            return{
                ...state,
                currentUser: state.usuarios.find(usuario => usuario.id.toString() === action.payload)
            }
        case DELETE_CURRENT_USER:
            return{
                ...state,
                currentUser: {}
            }
        case DELETE_USER:
            return{
                ...state,
                usuarios: state.usuarios.filter(usuario => usuario.id.toString() !== action.payload)
            }
        default:
            return state;
    }
}