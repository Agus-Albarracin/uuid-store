import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  createTicket,
  clearCart,
  clearDetalleDeCompra,
} from "../../redux/actions";

const CompraConfirmada = () => {
  const [infoDeCompra, setInfoDeCompra] = useState({});
  const compra = useSelector((state) => state.compraActual);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(infoDeCompra).length == 0) {
      const formUserJSON = window.localStorage.getItem("actualForm");
      const formUser = JSON.parse(formUserJSON);

      const cartJSON = window.localStorage.getItem("cart");
      const cart = JSON.parse(cartJSON);

      const userJSON = window.localStorage.getItem("loggedUser");
      const user = JSON.parse(userJSON);

      if (!formUserJSON || !cartJSON || !userJSON) navigate("/");

      setInfoDeCompra({
        emailStorage: user.email,
        ...formUser,
        productos: cart,
      });
    }
  }, []);

  useEffect(() => {
    if (infoDeCompra) {
      dispatch(createTicket(infoDeCompra));
    }

    return () => {
      if (Object.keys(infoDeCompra).length > 0) {
        dispatch(clearCart());
        dispatch(clearDetalleDeCompra());
        window.localStorage.setItem("cart", JSON.stringify([]));
        window.localStorage.removeItem("actualForm");
      }
    };
  }, [infoDeCompra]);

  return (
    <section>
      {Object.keys(compra).length !== 0 ? (
        <div>
          <h2>Muchas gracias por tu compra!</h2>
          <h2>id de tu compra: {compra.idDeCompra}</h2>

          <h2>Compraste:</h2>
          <ul>
            {compra.productos.map((produ, index) => (
              <li key={index}>{`${produ.nombre} ${produ.modelo}`}</li>
            ))}
          </ul>

          <h2>Total: {compra.total}</h2>

          <h2>
            Podés revisar el estado de tu compra en el siguiente{" "}
            <Link to={`/success/${compra.idDeCompra}`}> Link </Link>{" "}
          </h2>
        </div>
      ) : (
        <div>loading</div>
      )}
    </section>
  );
};

export default CompraConfirmada;
