import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Login = () => {

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

        //Pasarlo al action

    }

    return ( 
        <div className="form-usuario">
            <div className="contenedor-form sombra-dark">
                <form>
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