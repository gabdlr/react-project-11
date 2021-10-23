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
    const { eliminarTarea, obtenerTareas, cambiarEstadoTarea, guardarTareaActual } = tareasContext;

    //Destructuring a proyecto
    const [ proyectoActual ] = proyecto;

    //Funcion que se ejecuta al presiona eliminar tarea
    //Si esto no esta enredado entonces no se que es enredado ...
    const tareaEliminar = id => {
        eliminarTarea(id);
        obtenerTareas(proyectoActual.id);
    }

    //Función que modifica el estado de las tareas (terminada/no terminada)
    const cambiarEstado = tarea => {
        if(estado) {
            tarea.estado = false;
        } else {
            tarea.estado = true;
        }
        cambiarEstadoTarea(tarea);
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
                onClick={() => tareaEliminar(tarea.id)}
                className="btn btn-primario">Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tarea; 