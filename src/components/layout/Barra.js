import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Barra = () => {

    //Context authContext
    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

    // useEffect(() => {
    //     //Mantiene los datos del usuario pero autenticado queda null
    //     usuarioAutenticado();
    // }, [ usuarioAutenticado ]);

    return ( 
        //No quede nada convencido de eso de que la primera vez no va a tener
        //un usuario porque react tarda en cargar I mean wtf
        <header className="app-header">
            { usuario ? <p className="nombre-usuario">Hola, <span>{usuario.nombre}</span></p> : null}
            <nav className="nav-principal">
                <button 
                    className="btn btn-blank cerrar-sesion"
                    onClick={ () => cerrarSesion() }
                >
                   Cerrar Sesión 
                </button>
            </nav>
        </header>
     );
}
 
export default Barra;