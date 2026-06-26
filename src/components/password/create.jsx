import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./show.css";

function CreatePassword() {
    const API_URL = "/api/password";

    const navigate = useNavigate();
    const { id } = useParams();
    const editando = Boolean(id);

    const [form, setForm] = useState({
        id: "",
        completo: "",
        des: "",
        psw: "",
        tipo: "",
        grupo: "",
        feult: "",
        usuar: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (editando) {
            cargarRegistro();
        }
    }, [id]);

    async function cargarRegistro() {
        try {
            setLoading(true);

            const response = await fetch(`${API_URL}/${id}`);

            if (!response.ok) {
                throw new Error("No se pudo cargar el registro");
            }

            const data = await response.json();

            setForm({
                id: data.id || "",
                completo: data.completo || "",
                des: data.des || "",
                psw: data.psw || "",
                tipo: data.tipo || "",
                grupo: data.grupo || "",
                feult: data.feult || "",
                usuar: data.usuar || "",
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function guardarPassword(e) {
        e.preventDefault();

        const payload = {
            id: parseInt(form.id),
            completo: form.completo,
            des: form.des,
            psw: form.psw,
            tipo: form.tipo,
            grupo: form.grupo,
            feult: form.feult,
            usuar: form.usuar,
        };

        try {
            setLoading(true);

            const response = await fetch(editando ? `${API_URL}/${id}` : API_URL, {
                method: editando ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const txt = await response.text();
                throw new Error(txt || "No se pudo guardar el registro");
            }

            navigate("/contrasenas");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="password-form-container">
            <h1>{editando ? "Modificar Contraseña" : "Nueva Contraseña"}</h1>

            {error && <div className="password-error">Error: {error}</div>}

            <form onSubmit={guardarPassword} className="password-form">
                <label>ID</label>
                <input
                    type="number"
                    name="id"
                    value={form.id}
                    onChange={handleChange}
                    disabled={editando}
                    required
                />

                <label>Completo</label>
                <input
                    type="text"
                    name="completo"
                    value={form.completo}
                    onChange={handleChange}
                    required
                />

                <label>Descripción</label>
                <input
                    type="text"
                    name="des"
                    value={form.des}
                    onChange={handleChange}
                    required
                />

                <label>Password</label>
                <input
                    type="text"
                    name="psw"
                    value={form.psw}
                    onChange={handleChange}
                    required
                />

                <label>Tipo</label>
                <input
                    type="text"
                    name="tipo"
                    value={form.tipo}
                    onChange={handleChange}
                    required
                />

                <label>Grupo</label>
                <input
                    type="text"
                    name="grupo"
                    value={form.grupo}
                    onChange={handleChange}
                    required
                />

                <label>Fecha Última</label>
                <input
                    type="date"
                    name="feult"
                    value={form.feult}
                    onChange={handleChange}
                    required
                />

                <label>Usuario</label>
                <input
                    type="text"
                    name="usuar"
                    value={form.usuar}
                    onChange={handleChange}
                    required
                />

                <div className="password-form-buttons">
                    <button type="submit" disabled={loading}>
                        {loading ? "Guardando..." : "Guardar"}
                    </button>

                    <button type="button" onClick={() => navigate("/contrasenas")}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreatePassword;