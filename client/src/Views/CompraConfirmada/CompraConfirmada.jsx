import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CompraConfirmada = () => {
  const [infoDeCompra, setInfoDeCompra] = useState({});
  const compra = useSelector((state) => state.compraActual);
  const dispatch = useDispatch();

  useEffect(() => {
    const formUserJSON = window.localStorage.getItem("actualForm");
    const cartJSON = window.localStorage.getItem("cart");

    console.log(JSON.parse(formUserJSON));
    console.log(JSON.parse(cartJSON));
  }, []);

  return (
    <section>
      <h2>Muchas gracias por tu compra!</h2>
    </section>
  );
};

export default CompraConfirmada;
