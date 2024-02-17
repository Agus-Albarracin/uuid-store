import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductos } from "../../redux/actions";

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
    <div className="-container">
      <Cards data={allProductos} />
    </div>
  );
}

export default Productos;
