import { useEffect, useState } from "react";
import "./show.css";

function ShowUnidadAdmin({ alPresionarNuevo, alPresionarEditar, alPresionarSeleccionar }) {
    const [unidades, setUnidades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUnidad, setSelectedUnidad] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUnidades = async () => {
            try {
                setLoading(true);
                const response = await fetch("https://vsaif-backend.onrender.com/api/unidadadmin");
                if (!response.ok) {
                    throw new Error(`HTTP Error ${response.status}`);
                }
                const data = await response.json();
                
                // Evitamos registros duplicados provenientes del backend
                if (Array.isArray(data)) {
                    const hash = Object.create(null);
                    const listadoUnico = data.filter(item => {
                        if (!item.unidad) return false;
                        return hash[item.unidad] ? false : (hash[item.unidad] = true);
                    });
                    setUnidades(listadoUnico);
                } else {
                    setUnidades([]);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUnidades();
    }, []);

    if (loading) {
        return <div className="loading-message">Cargando Unidades Administrativas...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    async function handleDelete() {
        if (!selectedUnidad) return;

        const ok = window.confirm(`¿Eliminar la Unidad ${selectedUnidad.unidad}?`);
        if (!ok) return;

        setDeleting(true);
        try {
            const response = await fetch(
                `https://vsaif-backend.onrender.com/api/unidadadmin/${selectedUnidad.unidad}`,
                { method: "DELETE" }
            );

            if (!response.ok) {
                const txt = await response.text();
                throw new Error(txt || response.statusText);
            }

            setUnidades(prev => prev.filter(u => u.unidad !== selectedUnidad.unidad));
            setSelectedUnidad(null);
        } catch (err) {
            alert(err.message);
        } finally {
            setDeleting(false);
        }
    }

    return (
        <div className="unidad-container">
            <div className="unidad-table-title">
                ADMINISTRACIÓN UNIDAD ADMINISTRATIVA
            </div>

            <table className="table-wrapper">
                <thead>
                    <tr>
                        <th>UNIDAD</th>
                        <th>DESCRIPCIÓN</th>
                        <th>CIUDAD</th>
                    </tr>
                </thead>
                <tbody>
                    {unidades.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="no-records-cell">
                                No existen registros.
                            </td>
                        </tr>
                    ) : (
                        unidades.map((unidad) => (
                            <tr
                                key={unidad.unidad}
                                onClick={() => setSelectedUnidad(selectedUnidad?.unidad === unidad.unidad ? null : unidad)}
                                className={selectedUnidad?.unidad === unidad.unidad ? "selected" : ""}
                            >
                                <td className="col-col-unidad col-unidad">{unidad.unidad}</td>
                                <td>{unidad.descrip}</td>
                                <td className="col-ciudad">{unidad.ciudad}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="control-panel">
                <button className="nav-btns" onClick={alPresionarNuevo}>Nuevo</button>
                
                <button 
                    className="nav-btns" 
                    disabled={!selectedUnidad} 
                    onClick={() => alPresionarEditar(selectedUnidad)}
                >
                    Editar
                </button>
                
                <button 
                    className="nav-btns" 
                    onClick={handleDelete} 
                    disabled={!selectedUnidad || deleting}
                >
                    {deleting ? "Eliminando..." : "Eliminar"}
                </button>
                
                <button 
                    className="nav-btns" 
                    disabled={!selectedUnidad}
                    onClick={() => alPresionarSeleccionar(selectedUnidad)}
                >
                    Seleccionar
                </button>
                
                <button className="nav-btns btn-salir" onClick={() => window.location.href = "/"}>Salir</button>
            </div>
        </div>
    );
}

export default ShowUnidadAdmin;