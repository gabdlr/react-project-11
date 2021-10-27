import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router';
import AuthContext from '../../context/auth/authContext';

const RutaPrivada = ({ component: Component, ...props }) => {
    const authContext = useContext(AuthContext);
    const { autenticado, usuarioAutenticado, cargando } = authContext;
    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);

    return ( 
        //La demencia
        <Route
         { ...props } render = { props => !autenticado && !cargando ? (
             <Redirect to="./"/>
         ) : <Component {...props}/> }
        />
     );
}
 
export default RutaPrivada;