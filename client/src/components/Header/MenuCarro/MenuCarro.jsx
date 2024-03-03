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

  console.log(cart)
 
  return (
    <div className={styles.menuContainer}>
      <div
        className={`${styles.fondo} fixed inset-0 bg-black opacity-100`}
        onClick={() => mostrarCarro(false)}
      ></div>

      <div
        className={`${styles.carro} absolute inset-y-0 right-0 max-w-full flex`}
      >
        <div className="w-auto bg-white p-4">
          <div className="font-bold text-red-600 text-xl mb-4">CARRITO</div>

          {cart.map((producto) => (
            <div key={producto.uuid} className={`${styles.cartItem} flex items-center justify-between border-b py-2`}>
              <img
                src={producto.imagen[0]}
                alt={producto.nombre}
                className="w-24  object-cover rounded"
              />
              <div className="flex-1 ml-4">
                <div className="font-semibold">{producto.nombre}</div>
                <div>Precio: ${producto.precio}</div>
              </div>
              <button
                onClick={() => quitarProducto(producto.uuid)}
                className="text-red-500 font-bold ml-4"
              >
                Quitar
              </button>
            </div>
          ))}

          <div className="mt-4 font-bold">Total: ${calcularTotal()}</div>

          <button
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 mt-4"
            onClick={handleBuy}
          >
            Pagar
          </button>

          {preferenceId && (
            <Wallet initialization={{ preferenceId: preferenceId }} />
          )}

          <button
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 mt-2"
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
