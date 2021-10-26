import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {

    //Extraer los valores del context (alerta)
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;
    
    //Context authContext
    const authContext = useContext(AuthContext);
    const { iniciarSesion, mensaje, autenticado } = authContext;

    //En caso de que el usuario o password no exist
    useEffect(() => {
        if(autenticado) props.history.push("/proyectos");
        if(mensaje) mostrarAlerta(mensaje.msg, mensaje.categoria);

        //Tomamos props, para tomar props.history de react-router-dom
    }, [ mensaje, autenticado, props.history, mostrarAlerta ]);

    //State para iniciar sesión
    const [ usuario, guardarUsuario ] = useState(
        {
            email: "",
            password: ""
        }
    )

    //Pas los valores al state
    const onChange = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    //Extrae de usuario
    const { email, password } = usuario;

    //Cuando el usuario quiere iniciar sesión
    const onSubmit = e => {
        e.preventDefault();

        //Validar que no haya campos vacios
        if(email.trim === "" || password.trim() === ""){
            mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
            return;
        } 
        //Pasarlo al action
        iniciarSesion({ email, password });
    }

    return ( 
        <div className="form-usuario">
            { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null }
            <div className="contenedor-form sombra-dark">
                <form
                    onSubmit={onSubmit}
                >
                    <h1>Iniciar Sesión</h1>
                    <div className="campo-form">
                        <label htmlFor="email">E-mail</label>
                        <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value={email} 
                        placeholder="Tu Email"
                        onChange={onChange} 
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                        type="password" 
                        id="password" 
                        name="password"
                        value={password} 
                        placeholder="Tu Contraseña"
                        onChange={onChange} 
                        />
                    </div>
                    <div className="campo-form">
                        <input onSubmit={onSubmit} type="submit" className="btn btn-primario btn-block" value="Iniciar Sesión"/>
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>
            </div>
        </div>
     );
}
 
export default Login;