import { Link } from "react-router-dom";
import "./Card.css";

function Card({producto}) {

    const { id,nombre, modelo, precio } = producto
    return (
      <div className="card-container" key={id}>
        <h2>{nombre}</h2>
        <h2>{modelo}</h2>
        <h2>{precio}</h2>
        <Link to={`/detail/${id}`}>          
          <button >Detalles</button>
        </Link>
      </div>
    );
}

export default Card;
