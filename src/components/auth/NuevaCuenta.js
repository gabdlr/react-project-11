import React,{ useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from '../../context/auth/authContext';

const NuevaCuenta = (props) => {

    //Extraer los valores del context (alerta)
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;
    

    //Context authContext
    const authContext = useContext(AuthContext);
    const { registrarUsuario, mensaje, autenticado } = authContext;

    //En caso de que el usuario sea autenticado o registrado o sea un registro duplicado

    useEffect(() => {
        if(autenticado) props.history.push("/proyectos");
        if(mensaje) mostrarAlerta(mensaje.msg, mensaje.categoria);

        //Tomamos props, para tomar props.history de react-router-dom
    }, [ mensaje, autenticado, props.history, mostrarAlerta])
    //State para crear nuevo usuario
    const [ usuario, guardarUsuario ] = useState(
    {
        nombre: "",
        email: "",
        password: "",
        confirmarPassword: ""
    }
)

    //Pasa los valores al state
    const onChange = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    //Extrae de usuario
    const { nombre, email, password, confirmarPassword } = usuario;

    //Cuando el usuario quiere iniciar sesión
    const onSubmit = e => {
        e.preventDefault();

        //Validar que no haya campos vacios
        if(nombre.trim() === "" || email.trim() === "" || password.trim === "" || confirmarPassword.trim() === ""){
            mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
            return;
        }
        //Password minimo 6 caracteres
        if(password.length < 6){
            mostrarAlerta("El password debe ser de al menos 6 caracteres", "alerta-error");
            return;
        }
        //Los 2 passwords iguales
        if( password !== confirmarPassword){
            mostrarAlerta("Los passwords no son iguales", "alerta-error");
            return;
        }
        //Pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        })
    }


    return ( 
        <div className="form-usuario">
            { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null }
            <div className="contenedor-form sombra-dark">
                <form
                    onSubmit={onSubmit}
                >
                    <h1>Crear Nueva Cuenta</h1>
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text" 
                            id="nombre" 
                            name="nombre" 
                            placeholder="Tu Nombre" 
                            value={nombre}
                            onChange={onChange} 
                        />
                    </div>
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
                        <label htmlFor="password">Repetir Contraseña</label>
                        <input 
                            type="password" 
                            id="confirmarPassword" 
                            name="confirmarPassword"
                            value={confirmarPassword} 
                            placeholder="Repetir contraseña"
                            onChange={onChange} 
                        />
                    </div>
                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Crear Cuenta"/>
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Iniciar Sesión
                </Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;