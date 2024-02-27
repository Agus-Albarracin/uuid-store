import { useSelector, useDispatch } from "react-redux";
import styles from "./MenuCarro.module.scss";
import { removeToCart } from "../../../redux/actions";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const MenuCarro = ({ mostrarCarro }) => {
  // Obtener el estado del carrito desde Redux
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const quitarProducto = (item) => {
    dispatch(removeToCart(item)); // Despachar la acción para eliminar el producto del carrito
  };

  const calcularTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.precio;
    });
    return total;
  };

  //Mercadopago

  const [preferenceId, setPreferenceId] = useState(null);
  initMercadoPago("TEST-634691e0-a670-4492-adcc-21f03ac697bc", {
    locale: "es-AR",
  });

  const createPreference = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/create_preference",
        { cart }
      );
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  return (
    <div className={styles.menuContainer}>
      <div
        className={`${styles.fondo} fixed inset-0 bg-black opacity-100`}
        onClick={() => mostrarCarro(false)}
      ></div>

      <div
        className={`${styles.carro} absolute inset-y-0 right-0 max-w-full flex`}
      >
        <div className="w-64 bg-white p-4">
          <div className="font-bold text-red-600 text-xl mb-4">CARRITO</div>

          {cart.map((produ) => (
            <div key={uuidv4()} className={styles.cartItem}>
              <img
                src={produ.imagen}
                alt={produ.nombre}
                className={styles.cartItemImage}
              />
              <div className={styles.cartItemDetails}>
                <div>{produ.nombre}</div>
                <div>Precio: {produ.precio}</div>
              </div>
              <button
                onClick={() => quitarProducto(produ)}
                className="text-red-500 font-bold mt-2"
              >
                Quitar
              </button>
            </div>
          ))}
          <div className="mt-4 font-bold">Total: ${calcularTotal()}</div>
          <button
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700"
            onClick={handleBuy}
          >
            Pagar
          </button>
          {preferenceId && (
            <Wallet initialization={{ preferenceId: preferenceId }} />
          )}
          <button
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700"
            onClick={() => mostrarCarro(false)}
          >
            Cerrar Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCarro;
