import { useState } from 'react';
import { useSelector } from "react-redux";
import ActualizarData from "../ActualizarData/ActualizarData"
import './infoUser2.css';

function InfoUser(){

    const user = useSelector((state) => state.actualUser);
    const [view, setView] = useState(false);

    const handleView = (option) => {
        setView(option);
    };

    const handleUpdateComplete = () => {
        setView(false); 
    };

    return(
        <div>
            <div className="info-container">
                <div className="card1">
                    <h1> Nombre: {user.nombre}</h1> 
                </div>
                <div className="card1">
                    <h1> Apellido: {user.apellido}</h1>
                </div>
                <div className="card1">
                    <h1> Email: {user.email}</h1>
                </div>
                <div className="card1">
                    <h1> Telefono: {user.telefono}</h1>
                </div>
                <div className="card1">
                    <h1> DNI: {user.dni}</h1>
                </div>
                <div className="card1">
                    <h1> Dirección: {user.direccion}</h1>
                </div>
                <div className="card1">
                    <h1> Provicia: {user.provincia}</h1>
                </div>
                <div className="card1">
                    <h1> Localidad: {user.localidad}</h1>
                </div>
                <button className="btn" onClick={() => handleView(true)}>ACTUALIZAR DATOS</button>
                
            </div>

            {view === true && (
                <article className="contenedor2">
                    <h2> MIS DATOS </h2>
                    <ActualizarData onUpdateComplete={handleUpdateComplete} />
                </article>
            )}
        </div>
    );
}

export default InfoUser;
