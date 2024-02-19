// import { Link } from "react-router-dom";
import "./Card.css";
import PropTypes from "prop-types";
import BotonDetalle from '../Button/Button';


function Card({ producto }) {

  const { id, nombre, modelo, precio } = producto;
  return (
    <div className="card-container" key={id}>
      <h2>{nombre}</h2>
      <h2>{modelo}</h2>
      <h2>{precio}</h2>
      <BotonDetalle to={`/detail/${id}`}>Detalles</BotonDetalle>
    </div>
  );
}

Card.propTypes = {
  producto: PropTypes.object.isRequired, // Asegura que 'producto' sea un objeto y esté presente
};

export default Card;
