//import { Link } from "react-router-dom";
import "./Card.css";

function Card({producto}) {

    const { nombre, modelo, precio } = producto
    return (  
        <div className="card-container" key={nombre}>
            
                
                <h2>{nombre}</h2>
                <h2>{modelo}</h2>
                <h2>{precio}</h2>
                  
            
         
        </div>
        
    );
}

export default Card;
