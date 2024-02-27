import { useSelector } from "react-redux";

function MisDirecciones(){
    const user = useSelector((state) => state.actualUser);
    return(
        <div>
            
            <h1> Direccion 2 </h1>
            <h1> Direccion 3 </h1>
        </div>
    )
}

export default MisDirecciones;