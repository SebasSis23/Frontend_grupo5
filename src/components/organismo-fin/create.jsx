import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './show.css';

function CreateOrganismoFin() {
    const [codorg, setCodorg] = useState("");
    const [nomorg, setNomorg] = useState("");
    const [sigla, setSigla] = useState("");
    const [tipo, setTipo] = useState("");
    const [observ, setObserv] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (!codorg.trim() || !nomorg.trim()) {
            setError("Código y Nombre son obligatorios.");
            return;
        }
        const payload = { codorg, nomorg, sigla, tipo, observ, api_estado: 1 };
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://vsaif-backend.onrender.com/api/organismo-fin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                const txt = await response.text();
                throw new Error(txt || response.statusText);
            }
            navigate('/organismo-fin');
        } catch (err) {
            setError(err.message || 'Error al crear el organismo fin');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="oficina-container">
            <div className="oficina-table-title">NUEVO ORGANISMO FIN</div>

            {error && <div className="form-error">{error}</div>}

            <div className="form-grid">
                <div className="form-row">
                    <label htmlFor="codorg">Código Organismo:</label>
                    <input type="text" id="codorg" maxLength={2} value={codorg}
                           onChange={(e) => setCodorg(e.target.value)} required
                           className="form-input" placeholder="Máx. 2 caracteres" />
                </div>
                <div className="form-row">
                    <label htmlFor="nomorg">Nombre Organismo:</label>
                    <input type="text" id="nomorg" maxLength={60} value={nomorg}
                           onChange={(e) => setNomorg(e.target.value)} required
                           className="form-input" placeholder="Máx. 60 caracteres" />
                </div>
                <div className="form-row">
                    <label htmlFor="sigla">Sigla:</label>
                    <input type="text" id="sigla" maxLength={10} value={sigla}
                           onChange={(e) => setSigla(e.target.value)}
                           className="form-input" placeholder="Máx. 10 caracteres" />
                </div>
                <div className="form-row">
                    <label htmlFor="tipo">Tipo:</label>
                    <input type="text" id="tipo" maxLength={1} value={tipo}
                           onChange={(e) => setTipo(e.target.value)}
                           className="form-input" placeholder="1 carácter" />
                </div>
                <div className="form-row">
                    <label htmlFor="observ">Observación:</label>
                    <textarea id="observ" rows={3} value={observ}
                              onChange={(e) => setObserv(e.target.value)}
                              className="form-input" />
                </div>
            </div>

            <div className="control-panel">
                <button onClick={handleSubmit} disabled={loading} className="nav-btns-link">
                    {loading ? 'Guardando...' : 'Guardar'}
                </button>
                <button onClick={() => navigate('/organismo-fin')} className="nav-btns-link btn-salir">
                    Cancelar
                </button>
            </div>
        </div>
    );
}

export default CreateOrganismoFin;