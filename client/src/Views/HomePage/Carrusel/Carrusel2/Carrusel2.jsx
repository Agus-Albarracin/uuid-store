import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carrusel2.css";
import { useSelector } from "react-redux/es/hooks/useSelector";

const CarruselHorizontal = () => {
  const imagenes = useSelector((state) => state.allProductos);

  const Arrow = ({ direction, onClick }) => (
    <div className={`arrow ${direction}`} onClick={onClick}>
      {direction === "left" ? "<" : ">"}
    </div>
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: <Arrow direction="left" />,
    nextArrow: <Arrow direction="right" />,
  };

  return (
    <div className="carrusel-container">
      <Slider {...settings}>
        {imagenes.map((imagen, index) => (
          <div key={index}>
            <img
              src="https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt={`Imagen ${index}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarruselHorizontal;
