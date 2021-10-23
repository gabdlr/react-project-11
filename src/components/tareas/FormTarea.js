import React, { useContext, useState, useEffect } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {
    
    //Traemos el state del context
    //Extraer si un proyecto esta activo 
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;
    
    //Extraer si un proyecto esta activo 
    const tareasContext = useContext(tareaContext);
    const { tareaSeleccionada, agregarTarea, validarTarea, errorTarea,
         obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    //Effect que detecta si hay una tarea seleccionada
    useEffect(() =>{
        if (tareaSeleccionada !== null) {
            guardarTarea(tareaSeleccionada);
        } else {
            guardarTarea("");
        }
    }, [tareaSeleccionada]);

    //State del formulario
    const [ tarea, guardarTarea ] = useState({
        nombre: ""
    });

    //Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    //Si no hay proyecto seleccionado
    if(!proyecto) return null;

    //Array destructuring para extraer el proyecto actual 
    const [ proyectoActual ] = proyecto;

    //Extraer el nombre del proyecto
    const { nombre } = tarea;

    //Funcion para agregar una tarea
    const onSubmit = e => {
        e.preventDefault();

        //validar
        if(nombre.trim() === ""){
            validarTarea()
            return;
        }
        
        //pasar la validación
        //Ver si la tarea es nueva o es una edicion
        if(tareaSeleccionada === null) {
            //tarea nueva
            //agregar nueva tarea al state de tareas
            tarea.proyectoId = proyectoActual.id;
            tarea.estado = false;
            agregarTarea(tarea);
        } else {
            //Actualiza la tarea existente
            actualizarTarea(tarea);
            //Elimina tarea seleccionada del state
            limpiarTarea();
        }



        //Obtener y filtrar las tareas del proyecto actual
        //(para el futuro creo que aca aplicaria mas usar un useEffect)
        obtenerTareas(proyectoActual.id);

        //reiniciar el form
        guardarTarea({
            nombre: ""
        });
    }
    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                     />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaSeleccionada ? "Editar tarea" : "Agregar Tarea"}
                     />
                </div>
            </form>
            {errorTarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p>
            : "" }
        </div> 

     );
}
 
export default FormTarea;