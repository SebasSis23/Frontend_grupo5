import React, { useState, useEffect } from 'react';
import './BloqueSeleccion.css';

function BloqueSeleccion() {
  const [seleccion, setSeleccion] = useState({
    entidadId: localStorage.getItem("vsiaf_entidad_id") || "0025",
    entidadNombre: localStorage.getItem("vsiaf_entidad_nombre") || "Ministerio de la Presidencia",
    unidadId: localStorage.getItem("vsiaf_unidad_id") || "0",
    unidadNombre: localStorage.getItem("vsiaf_unidad_nombre") || ""
  });

  useEffect(() => {
    const actualizarSeleccion = () => {
      setSeleccion({
        entidadId: localStorage.getItem("vsiaf_entidad_id") || "0025",
        entidadNombre: localStorage.getItem("vsiaf_entidad_nombre") || "Ministerio de la Presidencia",
        unidadId: localStorage.getItem("vsiaf_unidad_id") || "0",
        unidadNombre: localStorage.getItem("vsiaf_unidad_nombre") || ""
      });
    };

    window.addEventListener("vsiaf_seleccion_cambiada", actualizarSeleccion);
    return () => window.removeEventListener("vsiaf_seleccion_cambiada", actualizarSeleccion);
  }, []);

  return (
    <div className="vsiaf-selection-container">
      {/* Línea de la Entidad */}
      <div className="selection-line">
        <span className="selection-title">ENTIDAD:</span>
        <span className="selection-entidad-id">{seleccion.entidadId}</span>
        <span className="selection-entidad-text">{seleccion.entidadNombre}</span>
      </div>

      {/* Línea de la Unidad */}
      <div className="selection-line">
        <span className="selection-title">UNIDAD:</span>
        <div className="selection-unidad-box">
          {seleccion.unidadId}
        </div>
        <span className="selection-unidad-text">
          {seleccion.unidadNombre || "NINGUNA UNIDAD SELECCIONADA"}
        </span>
      </div>
    </div>
  );
}

export default BloqueSeleccion;