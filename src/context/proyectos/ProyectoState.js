import React, { useReducer } from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import clienteAxios from '../../config/axios';
import { AGREGAR_PROYECTO, 
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS, 
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR } from '../../types';

const ProyectoState = props => {

        const initialState = {
            proyectos: [],
            formulario: false,
            errorFormulario: false,
            proyecto: null,
            mensaje: null
        }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    //Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //Obtener los proyectos
    const obtenerProyectos = async () => {
        try {
           const resultado = await clienteAxios.get("/api/proyectos/");
           dispatch({
            type: OBTENER_PROYECTOS,
            payload: resultado.data
        });   
        } catch (error) {
            const alerta = {
                msg: "Hubo un error 🤷‍♀️",
                categoria: "alerta"
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
        }
    }

    //Agregar nuevo proyecto
    const agregarProyecto = async proyecto => {
       try {
        const resultado = await clienteAxios.post("/api/proyectos/", proyecto);
         //Insertar el proyecto en el state con un dispatch
        dispatch({
            type: AGREGAR_PROYECTO,
            payload: resultado.data
        });

       } catch (error) {
            const alerta = {
                msg: "Hubo un error 🤷‍♀️",
                categoria: "alerta"
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
        }
    }

    //Valida el formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        });
    }

    //Selecciona el proyecto al que el usuario da click
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        });
    }

    //Elimina un proyecto
    const eliminarProyecto = async proyectoId => {
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {
            const alerta = {
                msg: "Hubo un error 🤷‍♀️",
                categoria: "alerta"
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
        }
    }

    //Los datos fluyen del state al provider y el provider los hace disponibles en toda la aplicacion
    //Igual pasa con las funciones

    return(
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorFormulario: state.errorFormulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )

}

export default ProyectoState;