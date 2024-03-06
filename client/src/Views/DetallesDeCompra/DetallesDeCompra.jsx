import { useEffect } from "react";
import { useParams } from "react-router-dom";

const DetallesDeCompra = () => {
  const { idDeCompra } = useParams();

  useEffect(() => {
    console.log(idDeCompra);
  }, []);

  return <h2>compra: {idDeCompra}</h2>;
};

export default DetallesDeCompra;
