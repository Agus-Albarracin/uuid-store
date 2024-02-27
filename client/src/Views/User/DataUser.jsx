import { useSelector } from "react-redux";
import { useState } from 'react';
import InfoUser from "../../components/InfoUser/InfoUser";
import Compras from "../../components/Compras/Compras";
import "./DataUser.css"

function DataUser(){

    const user = useSelector((state) => state.actualUser);
    const [ view, setView ] = useState('')

    const handleView = (option) => {
        setView(option);
    }

    return(
        <div>
            <div className="contenedor">
                <div className="card1">
                    
                    <h1>{user.nombre}</h1>
                    <h3>{user.email}</h3>                
                </div>

                
                <div className="card">
                    <span onClick={() => handleView('info')}>
                        Info Personal
                    </span>
                </div>
                    
                
              
                <div className="card">
                    <span onClick={() => handleView('compras')}>
                        Compras
                    </span>
                </div>
                 
                
                <div className="card">Mis Direcciones</div>


                {
                    view === 'info'
                        &&
                    <article>
                        <h2> Info Personal </h2>
                        <InfoUser />
                    </article>
                }

                {
                    view === 'compras'
                        &&
                    <article>
                        <h2> Mis Compras </h2>
                        <Compras />
                    </article>
                }

            </div>
        </div>
    )
}

export default DataUser;