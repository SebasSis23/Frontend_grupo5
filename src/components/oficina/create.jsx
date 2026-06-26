import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateOficina() {
    const [entidad, setEntidad] = useState("");
    const [unidad, setUnidad] = useState("");
    const [codofic, setCodofic] = useState("");
    const [nomofic, setNomofic] = useState("");
    const [observ, setObserv] = useState("");
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();    

    async function handleSubmit(e) {
        e.preventDefault();

        const payload = { 
            entidad, 
            unidad, 
            codofic: parseInt(codofic), 
            nomofic, 
            observ,
            api_estado: 1 
        };

        setLoading(true);      
        
        try {
            const response = await fetch('https://vsaif-backend.onrender.com/api/oficina', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const txt = await response.text();
                throw new Error(txt || response.statusText);
            }

            setEntidad(''); 
            setUnidad(''); 
            setCodofic(''); 
            setNomofic('');
            setObserv('');
            
            navigate('/oficina');
        } catch (err) {
            setError(err.message || 'Error al crear la oficina');
        } finally {
            setLoading(false);
        }        
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ fontSize: '20px', color: '#004687', borderBottom: '2px solid #004687', paddingBottom: '5px' }}>
                Crear Nueva Oficina
            </h1>
            
            {error && <div style={{ color: 'red', marginBottom: '15px', fontWeight: 'bold' }}>{error}</div>}
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="entidad" style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>Entidad (Character 4):</label>
                    <input type="text" id="entidad" maxLength={4} value={entidad} onChange={(e) => setEntidad(e.target.value)} required style={{ padding: '6px', border: '1px solid #7f9db9' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="unidad" style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>Unidad (Character 5):</label>
                    <input type="text" id="unidad" maxLength={5} value={unidad} onChange={(e) => setUnidad(e.target.value)} required style={{ padding: '6px', border: '1px solid #7f9db9' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="codofic" style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>Código Oficina (Numeric 4):</label>
                    <input type="number" id="codofic" value={codofic} onChange={(e) => setCodofic(e.target.value)} required style={{ padding: '6px', border: '1px solid #7f9db9' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="nomofic" style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>Nombre Oficina (Character 65):</label>
                    <input type="text" id="nomofic" maxLength={65} value={nomofic} onChange={(e) => setNomofic(e.target.value)} required style={{ padding: '6px', border: '1px solid #7f9db9' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="observ" style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>Observación (Memo):</label>
                    <textarea id="observ" rows={3} value={observ} onChange={(e) => setObserv(e.target.value)} style={{ padding: '6px', border: '1px solid #7f9db9', resize: 'vertical' }} />
                </div>

                <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                    <button type="submit" disabled={loading} style={{ background: '#004687', color: 'white', border: 'none', padding: '8px 16px', fontWeight: 'bold', cursor: 'pointer' }}>
                        {loading ? 'Guardando...' : 'Guardar Oficina'}
                    </button>
                    <button type="button" onClick={() => navigate('/oficina')} style={{ background: '#e0e0e0', color: 'black', border: '1px solid #adadad', padding: '8px 16px', cursor: 'pointer' }}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );     
}

export default CreateOficina;