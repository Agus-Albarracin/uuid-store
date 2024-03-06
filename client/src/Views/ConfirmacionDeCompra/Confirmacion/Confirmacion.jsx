import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001"
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";


const Confirmacion = ({ userBuyData }) => {
  const cart = useSelector((state) => state.cart);

  //Mercadopago
  const [preferenceId, setPreferenceId] = useState(null);
  initMercadoPago("TEST-634691e0-a670-4492-adcc-21f03ac697bc", {
    locale: "es-AR",
  });

  const createPreference = async () => {
    try {
      const response = await axios.post(
        "/create_preference",
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
    <div>
      <div>
        <h2> Tus Datos </h2>
        <span> {userBuyData.nombre} </span>
        <span> {userBuyData.apellido} </span>
        <span> {userBuyData.email} </span>
        <span> {userBuyData.dni} </span>
        <span> {userBuyData.telefono} </span>
      </div>

      <div>
        <h2> Datos de envío </h2>
        <span> {userBuyData.provincia} </span>
        <span> {userBuyData.localidad} </span>
        <span> {userBuyData.direccion} </span>
        <span> {userBuyData.codigoPostal} </span>
        <span> {userBuyData.metodoDeEnvio} </span>
      </div>

      <button
        className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 mt-4"
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
