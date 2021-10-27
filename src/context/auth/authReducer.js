import { REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION } from "../../types";
    
//eslint-disable-next-line
export default (state, action) => {
    switch(action.type){
        case REGISTRO_EXITOSO:
        case LOGIN_EXITOSO:    
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                token: action.payload.token,
                autenticado: true,
                mensaje: null,
                cargando: false
            };
        case OBTENER_USUARIO:
            return{
                ...state,
                usuario: action.payload,
                autenticado: true,
                cargando: false
            }    
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
        case CERRAR_SESION:  
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                usuario: null,
                autenticado: null,
                mensaje: action.payload,
                cargando: false
            }                
        default:
            return state;
    }
}
