import React, { useState, useEffect } from "react";

function CreateUnidadAdmin({ alTerminar, modo = "crear", datosIniciales = null }) {
    const [unidad, setUnidad] = useState("");
    const [descrip, setDescrip] = useState("");
    const [ciudad, setCiudad] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Cargar los campos cuando el componente se monta en modo edición
    useEffect(() => {
        if (modo === "editar" && datosIniciales) {
            setUnidad(datosIniciales.unidad || "");
            setDescrip(datosIniciales.descrip || "");
            setCiudad(datosIniciales.ciudad || "");
        }
    }, [modo, datosIniciales]);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Armamos el JSON con la estructura exacta que pide el Swagger (image_46b080.png)
        const payload = {
            entidad: "0025",
            unidad: unidad, // Se envía igual en el cuerpo del JSON
            descrip: descrip,
            ciudad: ciudad.toUpperCase(), // Forzado en mayúsculas para cumplir el formato
            estadouni: 1
        };

        try {
            let url = "https://vsaif-backend.onrender.com/api/unidadadmin";
            let metodo = "POST";

            // Si es edición, apuntamos al ID específico en la URL (ej: /api/unidadadmin/025)
            if (modo === "editar") {
                url = `https://vsaif-backend.onrender.com/api/unidadadmin/${unidad}`;
                metodo = "PUT";
            }

            const response = await fetch(url, {
                method: metodo,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const txt = await response.text();
                throw new Error(txt || `Error ${response.status}: No se pudo procesar la solicitud.`);
            }

            setShowSuccessModal(true);
        } catch (err) {
            setError(err.message || "Error al conectar con el servidor VSIAF.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ 
            fontFamily: "Arial, sans-serif", width: "100%", background: "#f3f3f3", 
            padding: "12px", boxSizing: "border-box", minHeight: "100vh"
        }}>
            <div style={{
                background: "linear-gradient(to bottom, #2c6aa0, #0f3d63)", color: "white",
                textAlign: "center", fontSize: "18px", fontWeight: "bold", padding: "14px",
                border: "1px solid #0f3d63", marginBottom: "12px", letterSpacing: ".5px"
            }}>
                UNIDAD ADMINISTRATIVA
            </div>

            {error && (
                <div style={{ color: "red", marginBottom: "15px", fontWeight: "bold", padding: "0 10px" }}>
                    {error}
                </div>
            )}

            <div style={{
                background: "#fff", border: "1px solid #ababab", padding: "25px 35px",
                maxWidth: "750px", margin: "0 auto"
            }}>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <label style={{ width: "180px", fontSize: "14px", color: "#003366" }}>
                            Unidad Administrativa:
                        </label>
                        <input
                            type="text"
                            value={unidad}
                            onChange={(e) => setUnidad(e.target.value)}
                            required
                            disabled={modo === "editar"} // Bloqueado en edición para que no cambie la llave primaria
                            style={{ 
                                width: "120px", padding: "4px 6px", border: "1px solid #7a96df", 
                                background: modo === "editar" ? "#eaeaea" : "#fff",
                                color: "#000", fontSize: "14px"
                            }}
                        />
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <label style={{ width: "180px", fontSize: "14px", color: "#003366" }}>
                            Ciudad:
                        </label>
                        <input
                            type="text"
                            value={ciudad}
                            onChange={(e) => setCiudad(e.target.value)}
                            required
                            style={{ 
                                width: "420px", padding: "4px 6px", border: "1px solid #7a96df", 
                                background: "#fff", color: "#000", fontSize: "14px"
                            }}
                        />
                    </div>

                    <div style={{ display: "flex", alignItems: "flex-start" }}>
                        <label style={{ width: "180px", fontSize: "14px", color: "#003366", marginTop: "4px" }}>
                            Descripción:
                        </label>
                        <textarea
                            rows="4"
                            value={descrip}
                            onChange={(e) => setDescrip(e.target.value)}
                            required
                            style={{ 
                                width: "420px", padding: "4px 6px", border: "1px solid #7a96df", 
                                background: "#fff", color: "#000", resize: "none", fontSize: "14px", fontFamily: "Arial"
                            }}
                        />
                    </div>

                    <div style={{ display: "flex", gap: "12px", marginLeft: "180px", marginTop: "10px" }}>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{ 
                                background: "linear-gradient(to bottom, #ffffff, #bdd7ff)", border: "1px solid #3d6b96", 
                                padding: "6px 22px", cursor: "pointer", fontWeight: "bold", color: "#082f58",
                                borderRadius: "3px", fontSize: "13px"
                            }}
                        >
                            {loading ? "Procesando..." : (modo === "editar" ? "Modificar" : "Grabar")}
                        </button>

                        <button
                            type="button"
                            onClick={alTerminar}
                            style={{ 
                                background: "linear-gradient(to bottom, #ffffff, #bdd7ff)", border: "1px solid #3d6b96", 
                                padding: "6px 22px", cursor: "pointer", fontWeight: "bold", color: "#082f58",
                                borderRadius: "3px", fontSize: "13px"
                            }}
                        >
                            Salir
                        </button>
                    </div>
                </form>
            </div>

            {/* Modal de éxito al estilo VSIAF */}
            {showSuccessModal && (
                <div style={{
                    position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
                    backgroundColor: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999
                }}>
                    <div style={{ width: "380px", background: "#f3f3f3", border: "2px solid #000" }}>
                        <div style={{
                            background: "#1a1a1a", color: "white", padding: "6px 10px", display: "flex", 
                            justifyContent: "space-between", alignItems: "center", fontWeight: "bold", fontSize: "14px"
                        }}>
                            <span>VSIAF</span>
                        </div>
                        <div style={{ padding: "22px 20px", display: "flex", alignItems: "center", gap: "15px", background: "#fff" }}>
                            <div style={{
                                width: "32px", height: "32px", borderRadius: "50%", background: "#2f7ed8", color: "white",
                                display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold", fontSize: "20px"
                            }}>i</div>
                            <div style={{ fontSize: "14px", color: "#000" }}>
                                {modo === "editar" ? "Los datos fueron modificados correctamente" : "Los datos fueron ingresados correctamente"}
                            </div>
                        </div>
                        <div style={{ padding: "10px", display: "flex", justifyContent: "center", background: "#f3f3f3", borderTop: "1px solid #dcdcdc" }}>
                            <button
                                onClick={alTerminar}
                                style={{
                                    padding: "5px 30px", background: "linear-gradient(to bottom, #ffffff, #bdd7ff)",
                                    border: "1px solid #3d6b96", color: "#082f58", fontWeight: "bold", cursor: "pointer", borderRadius: "2px", fontSize: "13px"
                                }}
                            >
                                Aceptar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateUnidadAdmin;