import { useSelector } from "react-redux";
import './InfoUser.css';

function InfoUser(){

    const user = useSelector((state) => state.actualUser);
    return(

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
            <button className="btn">ACTUALIZAR DATOS</button>
        </div>
    )
}

export default InfoUser;