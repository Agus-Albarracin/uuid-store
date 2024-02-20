import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductos, getName } from "../../redux/actions";
import SideBar from "../../components/SideBar/SideBar"
import Cards from "../../components/Cards/Cards";

import "./Productos.css";

function Productos() {
  const dispatch = useDispatch();
  const allProductos = useSelector((state) => state.allProductos);
  const [searchString, setSearchString] = useState("");

  function handleChange(e){
    e.preventDefault();
    setSearchString(e.target.value);
}

function handleSubmit(e){
    e.preventDefault();
    dispatch(getName(searchString))
}

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
          <SideBar handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
        <div className="cards-container">
          <Cards data={allProductos} />
        </div>
      </div>
    </>
  );
}

export default Productos;
