import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createTicket } from "../../redux/actions";

const CompraConfirmada = () => {
  const [infoDeCompra, setInfoDeCompra] = useState({});
  const compra = useSelector((state) => state.compraActual);
  const dispatch = useDispatch();

  useEffect(() => {
    const formUserJSON = window.localStorage.getItem("actualForm");
    const formUser = JSON.parse(formUserJSON);

    const cartJSON = window.localStorage.getItem("cart");
    const cart = JSON.parse(cartJSON);

    const userJSON = window.localStorage.getItem("loggedUser");
    const user = JSON.parse(userJSON);

    setInfoDeCompra({
      emailStorage: user.email,
      ...formUser,
      productos: cart,
    });

    dispatch(createTicket(infoDeCompra));
  }, []);

  useEffect(() => {
    console.log(compra);
  }, [compra]);

  return (
    <section>
      <h2>Muchas gracias por tu compra!</h2>

      {Object.keys(compra).length !== 0 ? (
        <div>
          <h2>id de tu compra: {compra.idDeCompra}</h2>

        </div>
      ) : (
        <div>loading</div>
      )}
    </section>
  );
};

export default CompraConfirmada;
