import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./show.css";

function ShowUnidadAdmin() {

    const [unidades, setUnidades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUnidad, setSelectedUnidad] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchUnidades = async () => {

            try {

                setLoading(true);

                const response = await fetch(
                    "https://vsaif-backend.onrender.com/api/unidadadmin"
                );

                if (!response.ok) {
                    throw new Error(`HTTP Error ${response.status}`);
                }

                const data = await response.json();

                if (Array.isArray(data)) {
                    setUnidades(data);
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
        return (
            <div style={{padding:"20px"}}>
                Cargando Unidades Administrativas...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{padding:"20px",color:"red"}}>
                Error: {error}
            </div>
        );
    }

    function handleRowClick(unidad) {
        setSelectedUnidad(unidad);
    }

    async function handleDelete() {

        if (!selectedUnidad)
            return;

        const ok = window.confirm(
            `¿Eliminar la Unidad ${selectedUnidad.unidad}?`
        );

        if (!ok)
            return;

        setDeleting(true);

        try {

            /*
            IMPORTANTE

            Cuando sepamos cuál es el ID real del backend,
            aquí se reemplaza.

            const response = await fetch(
                `https://vsaif-backend.onrender.com/api/unidadadmin/${selectedUnidad.id}`,
                {
                    method:"DELETE"
                }
            );
            */

            alert("Falta conocer el ID del backend para eliminar.");

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

                    {
                        unidades.length===0 ?

                        (

                            <tr>

                                <td
                                    colSpan="3"
                                    style={{
                                        textAlign:"center",
                                        padding:"20px"
                                    }}
                                >

                                    No existen registros.

                                </td>

                            </tr>

                        )

                        :

                        (

                            unidades.map((unidad,index)=>

                                <tr

                                    key={index}

                                    onClick={()=>handleRowClick(unidad)}

                                    className={
                                        selectedUnidad===unidad
                                        ?
                                        "selected"
                                        :
                                        ""
                                    }

                                >

                                    <td>{unidad.unidad}</td>

                                    <td>{unidad.descrip}</td>

                                    <td>{unidad.ciudad}</td>

                                </tr>

                            )

                        )

                    }

                </tbody>

            </table>

            <div className="control-panel">

                <Link
                    to="/unidadadmin/create"
                    className="nav-btns-link"
                >
                    Nuevo
                </Link>

                <button
                    className="nav-btns"
                    disabled={!selectedUnidad}
                >
                    Editar
                </button>

                <button

                    className="nav-btns"

                    onClick={handleDelete}

                    disabled={!selectedUnidad || deleting}

                >

                    {

                        deleting

                        ?

                        "Eliminando..."

                        :

                        "Eliminar"

                    }

                </button>

                <button

                    className="nav-btns"

                    disabled={!selectedUnidad}

                >

                    Seleccionar

                </button>

                <Link

                    to="/"

                    className="nav-btns-link btn-salir"

                >

                    Salir

                </Link>

            </div>

        </div>

    );

}

export default ShowUnidadAdmin;