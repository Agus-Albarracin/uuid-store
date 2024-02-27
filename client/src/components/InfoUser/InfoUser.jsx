import { useSelector } from "react-redux";

function InfoUser(){

    const user = useSelector((state) => state.actualUser);
    return(
        <div>
            <h1> Nombree: {user.nombre} </h1>
            <h1> Apellido: {user.apellido} </h1>
            <h1> Email: {user.email} </h1>
            
        </div>
    )
}

export default InfoUser;