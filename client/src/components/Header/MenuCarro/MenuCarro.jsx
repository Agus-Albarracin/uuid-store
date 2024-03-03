// ESTILOS
import styles from "./MenuCarro.module.scss";

// AXIOS
import axios from "axios";

// HOOKS
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// ACTIONS
import { removeToCart } from "../../../redux/actions";

// COMPONENTS
import RedirectButton from "./RedirectButton/RedirectButton";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { v4 as uuidv4 } from "uuid";

const MenuCarro = ({ mostrarCarro, mostrarUser, emailLocalStorage  }) => {
  // Obtener el estado del carrito desde Redux
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  useEffect(() => {
    // Obtener el objeto del usuario almacenado en localStorage
    const storedUser = JSON.parse(window.localStorage.getItem('user'));
  
    // Verificar si se encontró el usuario y si tiene la propiedad email
    if (storedUser && storedUser.email) {
      // Obtener y establecer el email del usuario
      setEmail(storedUser.email);
    }
  }, []);

  const quitarProducto = (item) => {
    dispatch(removeToCart(item)); 
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
      
      
      try {
        //CHEKEO DE SI CAPTURA EL VALOR DESDE EL LOCALSTORAGE
        console.log("Datos a enviar:", {
          email,
        });

        await axios.post("http://localhost:3001/createOrden", {
          // Datos del cliente
          emailStorage: email,
          email: email, 
          nombre: 'John', 
          apellido: 'Doe', 
          dni: '12345678',
          numeroTramite: 'ABCD1234',
          telefono: '123456789', 
          genero: 'Masculino', 
          notificaciones: true, 
          provincia: 'Buenos Aires', 
          direccion: 'Calle Falsa 123',
          localidad: 'Springfield', 
          codigoPostal: '1234', 
          
          // Información del producto
          productos: cart, // Carrito de compras
          
          // Información del pedido
          total: calcularTotal(), // Total de la compra
          estadoDelPedido: 'Pendiente', // Estado del pedido
        });
      } catch (error) {
        console.error("Error al enviar la solicitud al controlador:", error);
      }
    }
  };

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart.length])

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

          {cart.map((produ, index) => (
            <div key={index} className={styles.cartItem}>
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

          <RedirectButton mostrarCarro={mostrarCarro} mostrarUser={mostrarUser} />

        </div>
      </div>
    </div>

  );
};

export default MenuCarro;