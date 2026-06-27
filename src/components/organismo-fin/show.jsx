import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './show.css';

function ShowOrganismoFin() {
    const [organismos, setOrganismos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrganismo, setSelectedOrganismo] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrganismos = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://vsaif-backend.onrender.com/api/organismo-fin');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setOrganismos(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrganismos();
    }, []);

    async function handleEliminar() {
        if (!selectedOrganismo) return;
        const ok = window.confirm(`¿Eliminar el organismo "${selectedOrganismo.nomorg}"?`);
        if (!ok) return;
        setDeleting(true);
        try {
            const url = `https://vsaif-backend.onrender.com/api/organismo-fin/${selectedOrganismo.codorg}`;
            const res = await fetch(url, { method: 'DELETE' });
            if (!res.ok) {
                const txt = await res.text();
                throw new Error(txt || res.statusText);
            }
            setOrganismos(prev => prev.filter(o => o.codorg !== selectedOrganismo.codorg));
            setSelectedOrganismo(null);
        } catch (err) {
            alert('Error al eliminar: ' + (err.message || err));
        } finally {
            setDeleting(false);
        }
    }

    function handleRowClick(organismo) {
        setSelectedOrganismo(prev => prev?.codorg === organismo.codorg ? null : organismo);
    }

    if (loading) return <div style={{ padding: '20px', fontFamily: 'Arial' }}>Cargando organismos fin...</div>;
    if (error) return <div style={{ padding: '20px', color: 'red', fontFamily: 'Arial' }}>Error: {error}</div>;

    return (
        <div className="oficina-container">
            <div className="oficina-table-title">ORGANISMO FIN</div>

            <div className="table-scroll-wrapper">
                <table className="table-wrapper">
                    <thead>
                    <tr>
                        <th>Cód. Org.</th>
                        <th>Nombre Organismo</th>
                        <th>Sigla</th>
                        <th>Tipo</th>
                        <th>Observación</th>
                        <th>Estado</th>
                    </tr>
                    </thead>
                    <tbody>
                    {organismos.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="empty-message">
                                No existen registros en la tabla Organismo Fin. Presione "Nuevo" para agregar uno.
                            </td>
                        </tr>
                    ) : (
                        organismos.map((org, i) => (
                            <tr
                                key={org.codorg ? org.codorg + '-' + i : i}
                                onClick={() => handleRowClick(org)}
                                className={selectedOrganismo?.codorg === org.codorg ? 'selected' : ''}
                            >
                                <td style={{ width: '80px', textAlign: 'center' }}>{org.codorg}</td>
                                <td>{org.nomorg}</td>
                                <td style={{ width: '80px', textAlign: 'center' }}>{org.sigla || ''}</td>
                                <td style={{ width: '80px', textAlign: 'center' }}>{org.tipo || ''}</td>
                                <td>{org.observ || ''}</td>
                                <td style={{ width: '100px', textAlign: 'center' }}>
                                    {org.api_estado === 1 ? "ACTIVO" : "INACTIVO"}
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            <div className="control-panel">
                <button className="nav-btns" disabled>Activar</button>
                <button
                    className="nav-btns btn-eliminar"
                    onClick={handleEliminar}
                    disabled={!selectedOrganismo || deleting}
                >
                    {deleting ? 'Eliminando…' : 'Eliminar'}
                </button>
                <Link to="/organismo-fin/create" className="nav-btns-link">Nuevo</Link>
                <Link
                    to={selectedOrganismo ? `/organismo-fin/edit/${selectedOrganismo.codorg}` : '#'}
                    className={`nav-btns-link ${!selectedOrganismo ? 'disabled' : ''}`}
                    style={{ pointerEvents: selectedOrganismo ? 'auto' : 'none' }}
                >
                    Modificar
                </Link>
                <button className="nav-btns" disabled>Guardar</button>
                <button className="nav-btns" disabled>Deshacer</button>
                <Link to="/" className="nav-btns-link btn-salir">Salir</Link>
            </div>
        </div>
    );
}

export default ShowOrganismoFin;