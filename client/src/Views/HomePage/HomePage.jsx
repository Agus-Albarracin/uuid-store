import React from "react";
import Carrusel from "./Carrusel/Carrusel";
import Cards from "../../components/Cards/Cards";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductos } from "../../redux/actions";

// Define el componente HomePage
const HomePage = () => {
  const dispatch = useDispatch();
  const allProductos = useSelector((state) => state.allProductos);

  useEffect(() => {
    if (allProductos.length === 0) {
      dispatch(getProductos());
    }
  }, [dispatch, allProductos.length]);

  const recommendedProducts = allProductos
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  // console.log(allProductos);
  // console.log(recommendedProducts)

  return (
    <div className=" mx-auto my-8">
      <Carrusel />
      <div className="container mx-auto p-4">
        <Cards data={recommendedProducts} />
      </div>
    </div>
  );
};

export default HomePage;
