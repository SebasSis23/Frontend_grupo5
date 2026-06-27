import React, { useState } from "react";
import ShowUnidadAdmin from "../components/unidadadmin/show";
import CreateUnidadAdmin from "../components/unidadadmin/create";

function UnidadAdmin() {
    // Vistas posibles: "tabla", "crear", "editar"
    const [vistaActual, setVistaActual] = useState("tabla");
    const [unidadAEditar, setUnidadAEditar] = useState(null);

    // Función que simula la acción del botón SELECCIONAR reflejándose en la pantalla
    const handleSeleccionarGlobal = (unidadSeleccionada) => {
        // Guardamos los datos seleccionados exactamente con el formato visual de la cabecera
        localStorage.setItem("vsiaf_entidad_id", "0025");
        localStorage.setItem("vsiaf_entidad_nombre", "Ministerio de la Presidencia");
        localStorage.setItem("vsiaf_unidad_id", unidadSeleccionada.unidad);
        localStorage.setItem("vsiaf_unidad_nombre", unidadSeleccionada.descrip);
        
        // Despachamos un evento personalizado para avisarle al Header/MainLayout que se actualice al instante
        window.dispatchEvent(new Event("vsiaf_seleccion_cambiada"));
    };

    const activarModoEditar = (unidad) => {
        setUnidadAEditar(unidad);
        setVistaActual("editar");
    };

    return (
        <div style={{ padding: "10px", width: "100%", boxSizing: "border-box" }}>
            {vistaActual === "tabla" && (
                <ShowUnidadAdmin 
                    alPresionarNuevo={() => setVistaActual("crear")} 
                    alPresionarEditar={activarModoEditar}
                    alPresionarSeleccionar={handleSeleccionarGlobal}
                />
            )}

            {vistaActual === "crear" && (
                <CreateUnidadAdmin 
                    modo="crear"
                    alTerminar={() => setVistaActual("tabla")} 
                />
            )}

            {vistaActual === "editar" && (
                <CreateUnidadAdmin 
                    modo="editar"
                    datosIniciales={unidadAEditar}
                    alTerminar={() => setVistaActual("tabla")} 
                />
            )}
        </div>
    );
}

export default UnidadAdmin;