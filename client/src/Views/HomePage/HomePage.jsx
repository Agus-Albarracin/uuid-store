import React from "react";
import Carrusel from "./Carrusel/Carrusel";
import Cards from "../../components/Cards/Cards";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductos } from "../../redux/actions";

// Define el componente HomePage
const HomePage = () => {
  const dispatch = useDispatch();
  const allProductos = useSelector((state) => state.allProductosHome);

  useEffect(() => {
    if (allProductos.length === 0) {
      dispatch(getProductos());
    }
  }, [dispatch, allProductos.length]);

  const recommendedProducts = Array.isArray(allProductos)
  ? allProductos
      .slice() // Realiza una copia superficial del array
      .sort(() => Math.random() - 0.5) // Ordena la copia superficial
      .slice(0, 8) // Toma los primeros 10 elementos del array ordenado
  : [];
  // console.log(allProductos);
  // console.log(recommendedProducts)

  return (
    <div >
      <Carrusel />
      <div >
        <Cards data={recommendedProducts} />
      </div>
      <br />
      <br />
      <div className="h-40 bg-gradient-to-t from-gray-200 to-transparent" style={{ position: "fixed", bottom: 0, width: "100%", zIndex:0 }}></div>

    </div>
  );
};

export default HomePage;
