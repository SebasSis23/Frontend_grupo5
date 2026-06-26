import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUnidadAdmin() {

    const [entidad, setEntidad] = useState("");
    const [unidad, setUnidad] = useState("");
    const [descrip, setDescrip] = useState("");
    const [ciudad, setCiudad] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    async function handleSubmit(e) {

        e.preventDefault();

        const payload = {
            entidad,
            unidad,
            descrip,
            ciudad,
            estadouni: 1
        };

        setLoading(true);

        try {

            const response = await fetch(
                "https://vsaif-backend.onrender.com/api/unidadadmin",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }
            );

            if (!response.ok) {

                const txt = await response.text();
                throw new Error(txt || response.statusText);

            }

            setEntidad("");
            setUnidad("");
            setDescrip("");
            setCiudad("");

            alert("Los datos fueron ingresados correctamente.");

            navigate("/unidadadmin");

        } catch (err) {

            setError(err.message || "Error al registrar Unidad Administrativa");

        } finally {

            setLoading(false);

        }

    }

    return (

        <div style={{
            padding: "20px",
            fontFamily: "Arial"
        }}>

            <h1
                style={{
                    color: "#004687",
                    borderBottom: "2px solid #004687",
                    paddingBottom: "8px"
                }}
            >
                UNIDAD ADMINISTRATIVA
            </h1>

            {error &&

                <div
                    style={{
                        color: "red",
                        marginBottom: "15px",
                        fontWeight: "bold"
                    }}
                >
                    {error}
                </div>

            }

            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    maxWidth: "700px"
                }}
            >

                <div>

                    <label><b>Entidad</b></label>

                    <input
                        type="text"
                        value={entidad}
                        maxLength={4}
                        onChange={(e)=>setEntidad(e.target.value)}
                        required
                        style={{
                            width:"100%",
                            padding:"8px"
                        }}
                    />

                </div>

                <div>

                    <label><b>Unidad Administrativa</b></label>

                    <input
                        type="text"
                        value={unidad}
                        maxLength={5}
                        onChange={(e)=>setUnidad(e.target.value)}
                        required
                        style={{
                            width:"100%",
                            padding:"8px"
                        }}
                    />

                </div>

                <div>

                    <label><b>Ciudad</b></label>

                    <input
                        type="text"
                        value={ciudad}
                        onChange={(e)=>setCiudad(e.target.value)}
                        required
                        style={{
                            width:"100%",
                            padding:"8px"
                        }}
                    />

                </div>

                <div>

                    <label><b>Descripción</b></label>

                    <textarea

                        rows="4"

                        value={descrip}

                        onChange={(e)=>setDescrip(e.target.value)}

                        required

                        style={{
                            width:"100%",
                            padding:"8px",
                            resize:"vertical"
                        }}

                    />

                </div>

                <div
                    style={{
                        display:"flex",
                        gap:"10px",
                        marginTop:"15px"
                    }}
                >

                    <button

                        type="submit"

                        disabled={loading}

                        style={{
                            background:"#004687",
                            color:"white",
                            border:"none",
                            padding:"10px 18px",
                            cursor:"pointer",
                            fontWeight:"bold"
                        }}

                    >

                        {loading ? "Grabando..." : "Grabar"}

                    </button>

                    <button

                        type="button"

                        onClick={()=>navigate("/unidadadmin")}

                        style={{
                            padding:"10px 18px",
                            cursor:"pointer"
                        }}

                    >

                        Salir

                    </button>

                </div>

            </form>

        </div>

    );

}

export default CreateUnidadAdmin;