import React, { useReducer } from "react";
import tareaContext from './tareaContext';
import TareaReducer from "./tareaReducer";
import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA } from "../../types";

const TareaState = props => {
    const initialState = {
        tareas: [
            {nombre: "Elegir color", estado: true, proyectoId: 1},
            {nombre: "Elegir Pasarela de pago", estado: true, proyectoId:2},
            {nombre: "Elegir Hosting", estado: false, proyectoId:3},
            {nombre: "Elegir Lenguaje Backend", estado: false, proyectoId:4}
        ],
        tareasProyecto: null,
        errorTarea: false
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
    return (
        <tareaContext.Provider
        value={{
            tareas: state.tareas.tareas,
            tareasProyecto: state.tareasProyecto,
            errorTarea: state.errorTarea,
            obtenerTareas,
            agregarTarea,
            validarTarea
        }}>
            {props.children}
        </tareaContext.Provider>
    )

}

export default TareaState;