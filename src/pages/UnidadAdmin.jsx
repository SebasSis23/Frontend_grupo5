import React from "react";

function UnidadAdmin() {

    return (
        <div
            style={{
                width: "100%",
                padding: "20px"
            }}
        >

        
            <div
                style={{
                    background: "linear-gradient(to bottom, #1f5c93, #0b3254)",
                    color: "white",
                    textAlign: "center",
                    padding: "15px",
                    fontSize: "24px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    borderRadius: "3px"
                }}
            >
                ADMINISTRACIÓN UNIDAD ADMINISTRATIVA
            </div>

           
            <div
                style={{
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    padding: "10px"
                }}
            >
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse"
                    }}
                >
                    <thead>
                        <tr
                            style={{
                                backgroundColor: "#0b3254",
                                color: "white"
                            }}
                        >
                            <th
                                style={{
                                    border: "1px solid #ccc",
                                    padding: "8px"
                                }}
                            >
                                UNIDAD
                            </th>

                            <th
                                style={{
                                    border: "1px solid #ccc",
                                    padding: "8px"
                                }}
                            >
                                DESCRIPCIÓN
                            </th>

                            <th
                                style={{
                                    border: "1px solid #ccc",
                                    padding: "8px"
                                }}
                            >
                                CIUDAD
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {/*el backend */}
                    </tbody>
                </table>
            </div>

            
            <div
                style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                    gap: "15px",
                    flexWrap: "wrap"
                }}
            >
                <button>Nuevo</button>
                <button>Editar</button>
                <button>Eliminar</button>
                <button>Seleccionar</button>
                <button>Salir</button>
            </div>

        </div>
    );
}

export default UnidadAdmin;