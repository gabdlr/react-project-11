import React, { useContext } from 'react';
import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext'

const Tarea = ( { tarea }) => {
    const { nombre, estado } = tarea;

    //Demasiados context 
    //Con esto sabemos de que proyecto debemos obtener las tareas tras eliminar una tarea
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //Obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;

    //Destructuring a proyecto
    const [ proyectoActual ] = proyecto;

    //Funcion que se ejecuta al presiona eliminar tarea
    const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual._id);
    }

    //Función que modifica el estado de las tareas (terminada/no terminada)
    const cambiarEstado = tarea => {
        if(estado) {
            tarea.estado = false;
        } else {
            tarea.estado = true;
        }
        actualizarTarea(tarea);
    }

    //Agrega una tarea actual cuando el usuario desea editarla
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return ( 
        <li className="tarea sombra">
            <p>{nombre}</p>
            <div className="estado">
                {tarea.estado ? 
                 (
                    <button
                    type="button"
                    className="completo"
                    onClick={() => cambiarEstado(tarea)}
                    >Completo</button>
                 )
                :(<button
                    type="button"
                    onClick={() => cambiarEstado(tarea)}
                    className="incompleto">Incompleto</button>
                )
                }
            </div>
            <div className="acciones">
                <button
                type="button"
                onClick={() => seleccionarTarea(tarea)}
                className="btn btn-primario">Editar</button>
                <button
                type="button"
                onClick={() => tareaEliminar(tarea._id)}
                className="btn btn-primario">Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tarea; 