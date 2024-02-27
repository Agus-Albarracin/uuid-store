import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Card({ producto }) {
  const images = [
    'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1461048/pexels-photo-1461048.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/11135667/pexels-photo-11135667.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/11135667/pexels-photo-11135667.jpeg?auto=compress&cs=tinysrgb&w=600',
  ];

  const { id, nombre, modelo, precio } = producto;

  return (
    <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl overflow-hidden rounded-lg bg-gray-200 shadow-md duration-300 hover:scale-105 hover:shadow-lg mb-4">
      <Link to={`/detail/${id}`} className="block">
        <img className="h-full w-full object-cover object-center" src={images[1]} alt="Imagen 2" />
        <div className="p-6">
          <h2 className="mb-2 text-xl font-bold text-[#0C78BF]">{nombre}</h2>
          <p className="mb-2 text-lg font-semibold text-[#4CB34D]">{modelo}</p>
          <div className="flex items-center">
            <p className="mr-2 text-4xl font-semibold text-[#0C78BF]">${precio - precio * 0.2}</p>
            <p className="text-base font-medium text-gray-500 line-through">${precio}</p>
            <p className="bg-[#FBCE40] p-2   ml-auto text-2xl font-bold text-black rounded-lg">20% off</p>
          </div>
        </div>
        <button className="w-full p-3 bg-red-500 text-white font-bold hover:bg-red-700">
          COMPRAR
        </button>
      </Link>
    </div>
  );
}

Card.propTypes = {
  producto: PropTypes.object.isRequired,
};

export default Card;