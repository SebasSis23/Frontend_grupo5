import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './show.css';

function ShowOficina() {   
    const [oficinas, setOficinas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOficina, setSelectedOficina] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOficinas = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://vsaif-backend.onrender.com/api/oficina');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                if (Array.isArray(data)) {
                    setOficinas(data);
                } else {
                    setOficinas([]);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOficinas();        
    }, []);    

    if (loading) {
        return <div style={{ padding: '20px', fontFamily: 'Arial' }}>Cargando oficinas...</div>;
    }

    if (error) {
        return <div style={{ padding: '20px', color: 'red', fontFamily: 'Arial' }}>Error: {error}</div>;
    }

    async function handleInactivar() {
        if (!selectedOficina) return;

        const ok = window.confirm(`¿Cambiar estado de la oficina ${selectedOficina.nomofic}?`);
        if (!ok) return;

        setDeleting(true);
        try {
            const url = `https://vsaif-backend.onrender.com/api/oficina/${selectedOficina.codofic}`;
            const res = await fetch(url, { method: 'DELETE' });

            if (!res.ok) {
                const txt = await res.text();
                throw new Error(txt || res.statusText);
            }
            setOficinas(prev => prev.filter(o => !(o.codofic === selectedOficina.codofic)));
            setSelectedOficina(null);
        } catch (err) {
            alert('Error al procesar: ' + (err.message || err));
        } finally {
            setDeleting(false);
        }
    }

    function handleRowClick(oficina) {
        setSelectedOficina(oficina);
    }

    return (
        <div className="oficina-container">
            <div className="oficina-table-title">OFICINA</div>
            
            <table className="table-wrapper">
                <thead>
                    <tr>
                        <th>Cod.</th>
                        <th>Nombre Oficina</th>
                        <th>Entidad</th>
                        <th>Unidad</th>
                        <th>Observación</th>
                        <th>Estado</th>
                    </tr>   
                </thead>
                <tbody>
                    {oficinas.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#666', italic: 'true' }}>
                                No existen registros en la tabla Oficina. Presione "Nuevo" para agregar uno.
                            </td>
                        </tr>
                    ) : (
                        oficinas.map((oficina, i) => (
                            <tr 
                                key={oficina.codofic ? oficina.codofic + '-' + i : i} 
                                onClick={() => handleRowClick(oficina)}
                                className={selectedOficina === oficina ? 'selected' : ''}
                            >
                                <td style={{ width: '60px', textAlign: 'center' }}>{oficina.codofic}</td>
                                <td>{oficina.nomofic}</td>
                                <td>{oficina.entidad}</td>
                                <td>{oficina.unidad}</td>
                                <td>{oficina.observ || ''}</td>
                                <td style={{ width: '100px', textAlign: 'center' }}>
                                    {oficina.api_estado === 1 ? "ACTIVO" : "INACTIVO"}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>        
            </table>

            {/* Panel de control inferior */}
            <div className="control-panel">
                <button className="nav-btns" disabled>Activar</button>
                <button className="nav-btns" onClick={handleInactivar} disabled={!selectedOficina || deleting}>
                    {deleting ? 'Procesando…' : 'Inactivar'}
                </button>
                <Link to="/oficina/create" className="nav-btns-link">Nuevo</Link>
                <button className="nav-btns" disabled={!selectedOficina}>Modificar</button>
                <button className="nav-btns" disabled>Guardar</button>
                <button className="nav-btns" disabled>Deshacer</button>                
                <Link to="/" className="nav-btns-link btn-salir">Salir</Link>
            </div>
        </div>
    );
}

export default ShowOficina;