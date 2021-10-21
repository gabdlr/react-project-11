import React, { Fragment, useContext, useState } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';


const NuevoProyecto = () => {

    //Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const { formulario, mostrarFormulario } = proyectosContext;

    //State para proyecto
    const [ proyecto, guardarProyecto ] = useState({
        nombre: '',

    });

    //Lee los contenidos del input y los copia al state
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    //Extraer nombre de proyecto
    const { nombre } = proyecto;

    //Al hacer submit
    const onSubmitProyecto = e => {
        e.preventDefault();

        //Validar el proyecto

        //Agregar al state

        //Reiniciar el form
    }

    //Mostrar el formulario
    const onClick = () => {
        mostrarFormulario();
    }
    return (
        <Fragment> 
            <button
            type="button"
            className="btn btn-block btn-primario"
            onClick={onClick}
            >Nuevo Proyecto</button>
           { formulario ? (
            <form
                className="formulario-nuevo-proyecto"
                onSubmit={onSubmitProyecto} 
            >
            <input 
                type="text"
                className="input-text"
                placeholder="Nombre Proyecto"
                name="nombre"
                value={nombre}
                onChange= {onChangeProyecto}
            />
            <input 
                type="submit"
                className="btn btn-primario btn-block"
                value="Agregar Proyecto" 
            />
            </form>
           )
           :  
            null
           }
        </Fragment>
     );
}
 
export default NuevoProyecto;