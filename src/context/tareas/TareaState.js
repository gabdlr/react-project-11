import React, { useReducer } from "react";
import tareaContext from './tareaContext';
import TareaReducer from "./tareaReducer";
import { v4 as uuidv4 } from 'uuid';

import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA } from "../../types";

const TareaState = props => {
    const initialState = {
        tareas: [
            { id: 1, nombre: "Elegir color", estado: true, proyectoId: 1},
            { id: 2, nombre: "Elegir Pasarela de pago", estado: true, proyectoId:2},
            { id: 3, nombre: "Elegir Hosting", estado: false, proyectoId:3},
            { id: 4, nombre: "Elegir Lenguaje Backend", estado: false, proyectoId:4}
        ],
        tareasProyecto: null,
        errorTarea: false,
        tareaSeleccionada: null
    }

    //Crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //Crear las funciones

    //Obtener las tareas de un proyecto
    const obtenerTareas = proyectoId => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        })
    }

    //Agregar una tarea al proyecto seleccionado
    const agregarTarea = tarea => {
        tarea.id = uuidv4();
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }

    //Valida y muestra un error en caso de que sea necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //Eliminar tarea por id
    const eliminarTarea = id => {
        dispatch(
            {
                type: ELIMINAR_TAREA,
                payload: id
            }
        )
    }

    //Cambia el estado de cada tarea
    //Le pasamos la tarea completa
    const cambiarEstadoTarea = tarea => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        });
    }

    //Tarea actual, extrae una tarea para edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        });
    }

    //Edita o modifica una tarea
    const actualizarTarea = tarea => {
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea
        })
    }

    //Elimina la tarea seleccionada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return (
        <tareaContext.Provider
        value={{
            tareas: state.tareas,
            tareasProyecto: state.tareasProyecto,
            errorTarea: state.errorTarea,
            tareaSeleccionada: state.tareaSeleccionada,
            obtenerTareas,
            agregarTarea,
            validarTarea,
            eliminarTarea,
            cambiarEstadoTarea,
            guardarTareaActual,
            actualizarTarea,
            limpiarTarea
            
        }}>
            {props.children}
        </tareaContext.Provider>
    )

}

export default TareaState;