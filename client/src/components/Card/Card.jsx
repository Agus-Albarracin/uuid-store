// import { Link } from "react-router-dom";
import "./Card.css";
import PropTypes from "prop-types";
// import BotonDetalle from '../Button/Button';
import { Link } from "react-router-dom";

function Card({ producto }) {
  const images = [
    'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600', // URL de la primera imagen
    'https://images.pexels.com/photos/1461048/pexels-photo-1461048.jpeg?auto=compress&cs=tinysrgb&w=600', // URL de la segunda imagen
    'https://images.pexels.com/photos/11135667/pexels-photo-11135667.jpeg?auto=compress&cs=tinysrgb&w=600', // URL de la tercera imagen
    'https://images.pexels.com/photos/11135667/pexels-photo-11135667.jpeg?auto=compress&cs=tinysrgb&w=600', // URL de la cuarta imagen
  ];
  const { id, nombre, modelo, precio } = producto;
  return (
    <div className=" mt-11 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl transform overflow-hidden rounded-lg bg-gray-200 shadow-md duration-300 hover:scale-105 hover:shadow-lg mb-4" key={id}>
      <Link to={`/detail/${id}`} className="block">
        <img className="h-56 w-full object-cover object-center" src={images[1]} alt="Imagen 2" />
        <div className="p-6"> {/* Ajusté la clase de padding */}
          <h2 className="mb-2 text-lg font-medium text-gray-900">{nombre}</h2>
          <p className="mb-2 text-base text-gray-700">{modelo}</p>
          <div className="flex items-center">
            <p className="mr-2 text-lg font-semibold text-gray-900">{precio - precio * 0.2}</p>
            <p className="text-base font-medium text-gray-500 line-through">{precio}</p>
            <p className="ml-auto text-base font-medium text-green-500">20% off</p>
          </div>
        </div>
      </Link>
    </div>

  );
}

Card.propTypes = {
  producto: PropTypes.object.isRequired, // Asegura que 'producto' sea un objeto y esté presente
};

export default Card;
