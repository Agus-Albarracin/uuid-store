import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import styles from "./Confirmacion.module.scss";

const Confirmacion = ({ userBuyData }) => {
  const cart = useSelector((state) => state.cart);

  //Mercadopago
  const [preferenceId, setPreferenceId] = useState(null);
  initMercadoPago("TEST-634691e0-a670-4492-adcc-21f03ac697bc", {
    locale: "es-AR",
  });

  const createPreference = async () => {
    try {
      const response = await axios.post("/create_preference", { cart });
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

        await axios.post("/createOrden", {
          // Datos del cliente
          emailStorage: email,
          email: email,
          nombre: "John",
          apellido: "Doe",
          dni: "12345678",
          numeroTramite: "ABCD1234",
          telefono: "123456789",
          genero: "Masculino",
          notificaciones: true,
          provincia: "Buenos Aires",
          direccion: "Calle Falsa 123",
          localidad: "Springfield",
          codigoPostal: "1234",

          // Información del producto
          productos: cart, // Carrito de compras

          // Información del pedido
          total: calcularTotal(), // Total de la compra
          estadoDelPedido: "Pendiente", // Estado del pedido
        });
      } catch (error) {
        console.error("Error al enviar la solicitud al controlador:", error);
      }
    }
  };

  const calcularTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.precio;
    });
    return total;
  };

  return (
    <div className={styles.container}>
      <h2>CONFIRMA TUS DATOS</h2>
      <div className={styles.dataDelUsuario}>
        <h2> Tus Datos </h2>
        <span>
          Nombre: {userBuyData.nombre} {userBuyData.apellido}
        </span>
        <span> Email: {userBuyData.email} </span>
        <span> DNI: {userBuyData.dni} </span>
        <span> Telefono: {userBuyData.telefono} </span>
      </div>

      <div className={styles.datosDeEnvio}>
        <h2> Datos de envío </h2>
        <span> Dirección: {userBuyData.direccion} </span>
        <span> Localidad: {userBuyData.localidad} </span>
        <span> Código Postal: {userBuyData.codigoPostal} </span>
        <span> Provincia: {userBuyData.provincia} </span>
        <span> Método de envío: {userBuyData.metodoDeEnvio} </span>
      </div>

      <button
        className={`bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 mt-4`}
        onClick={handleBuy}
      >
        Pagar
      </button>

      {preferenceId && (
        <Wallet initialization={{ preferenceId: preferenceId }} />
      )}
      <Link to="/success">simular confirmar</Link>
    </div>
  );
};

export default Confirmacion;
