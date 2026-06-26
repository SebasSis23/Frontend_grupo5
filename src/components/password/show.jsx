import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./show.css";

function ShowPassword() {
    const API_URL = "/api/password";

    const [passwords, setPasswords] = useState([]);
    const [selectedPassword, setSelectedPassword] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        cargarPasswords();
    }, []);

    async function cargarPasswords() {
        try {
            setLoading(true);
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setPasswords(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function eliminarPassword() {
        if (!selectedPassword) return;

        const confirmar = window.confirm(
            `¿Seguro que desea eliminar el registro ${selectedPassword.completo}?`
        );

        if (!confirmar) return;

        try {
            const response = await fetch(`${API_URL}/${selectedPassword.id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const txt = await response.text();
                throw new Error(txt || "No se pudo eliminar el registro");
            }

            setPasswords(prev => prev.filter(p => p.id !== selectedPassword.id));
            setSelectedPassword(null);
        } catch (err) {
            alert("Error al eliminar: " + err.message);
        }
    }

    if (loading) {
        return <div style={{ padding: "20px", fontFamily: "Arial" }}>Cargando contraseñas...</div>;
    }

    if (error) {
        return <div style={{ padding: "20px", color: "red", fontFamily: "Arial" }}>Error: {error}</div>;
    }

    return (
        <div className="password-container">
            <div className="password-table-title">CONTROL DE CONTRASEÑAS</div>

            <table className="password-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Completo</th>
                        <th>Descripción</th>
                        <th>Password</th>
                        <th>Tipo</th>
                        <th>Grupo</th>
                        <th>Fecha Última</th>
                        <th>Usuario</th>
                    </tr>
                </thead>

                <tbody>
                    {passwords.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="empty-row">
                                No existen registros.
                            </td>
                        </tr>
                    ) : (
                        passwords.map((password) => (
                            <tr
                                key={password.id}
                                onClick={() => setSelectedPassword(password)}
                                className={selectedPassword?.id === password.id ? "selected" : ""}
                            >
                                <td>{password.id}</td>
                                <td>{password.completo}</td>
                                <td>{password.des}</td>
                                <td>{password.psw}</td>
                                <td>{password.tipo}</td>
                                <td>{password.grupo}</td>
                                <td>{password.feult}</td>
                                <td>{password.usuar}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="password-control-panel">
                <Link to="/contrasenas/create" className="password-btn">
                    Nuevo
                </Link>

                {selectedPassword ? (
                    <Link to={`/contrasenas/edit/${selectedPassword.id}`} className="password-btn">
                        Modificar
                    </Link>
                ) : (
                    <button className="password-btn" disabled>
                        Modificar
                    </button>
                )}

                <button className="password-btn" onClick={eliminarPassword} disabled={!selectedPassword}>
                    Eliminar
                </button>

                <Link to="/" className="password-btn password-btn-salir">
                    Salir
                </Link>
            </div>
        </div>
    );
}

export default ShowPassword;