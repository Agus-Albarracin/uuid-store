import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductos } from "../../redux/actions";
import SideBar from "../../components/SideBar/SideBar"
import Cards from "../../components/Cards/Cards";

import "./Productos.css";

function Productos() {
  const dispatch = useDispatch();
  const allProductos = useSelector((state) => state.allProductos);

  useEffect(() => {
    if (allProductos.length === 0) {
      dispatch(getProductos());

    }
  }, [dispatch, allProductos.length]);

  return (
    <>
      <h2>TODOS LOS PRODUCTOS</h2>
      <div className="container">
       
        <div className="side-container">
          <SideBar />
        </div>
        <div className="cards-container">
          <Cards data={allProductos} />
        </div>
      </div>
    </>
  );
}

export default Productos;
