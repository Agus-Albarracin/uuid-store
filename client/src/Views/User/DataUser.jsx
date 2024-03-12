import { useSelector } from "react-redux";
import { useState } from 'react';
import InfoUser from "../../components/InfoUser/InfoUser";
import MisCompras from "../../components/MisCompras/MisCompras";
import MisDirecciones from "../../components/MisDireciones/MisDirecciones";
import "./DataUser.css"

function DataUser(){

    const user = useSelector((state) => state.actualUser);
    
    const [view, setView] = useState('estadisticas')

    const handleView = (option) => {
        setView(option);
    }

    return(
        <div>
            <div className="contenedor">
                <div className="contenedor3">
                    <div className="card1">
                        <h1>Hola</h1>
                        <h1>{user.nombre}</h1>
                    </div>

                
                    <div className="card" onClick={() => handleView('info')}>
                        <span >
                            Informacion Personal
                        </span>              
                    </div>
                    
                
              
                    <div className="card" onClick={() => handleView('compras')}>
                        <span >
                            Mis Compras
                        </span>
                    </div>                 
                 
                
                    <div className="card" onClick={() => handleView('direcciones')}>
                        <span >
                            Mis Direcciones
                        </span>
                    </div>
                </div>

                {view === 'info' && (
                    <article className="contenedor2">
                        <h1> -INFORMACION PERSONAL- </h1>
                        <InfoUser />
                    </article>
                )}

                {view === 'compras' && (
                    <article className="contenedor2">
                        <h2> -MIS COMPRAS- </h2>
                        <MisCompras />
                    </article>
                )}

                {view === 'direcciones' && (
                    <article className="contenedor2">
                        <h2> -MIS DIRECCIONES- </h2>
                        <MisDirecciones />
                    </article>
                )}

            </div>
        </div>
    )
}

export default DataUser;