import React,{ useState } from 'react'
import { Link } from 'react-router-dom';
const NuevaCuenta = () => {

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

        //Password minimo 6 caracteres

        //Los 2 passwords iguales

        //Pasarlo al action

    }


    return ( 
        <div className="form-usuario">
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