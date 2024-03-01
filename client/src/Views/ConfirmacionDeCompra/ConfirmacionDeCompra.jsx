import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./ConfirmacionDeCompra.module.scss";

import UserData from "./UserData/UserData";
import DireccionDeEnvio from "./DireccionDeEnvio/DireccionDeEnvio";
import MetodoDeEnvio from "./MetodoDeEnvio/MetodoDeEnvio";
import Confirmacion from "./Confirmacion/Confirmacion";

const ConfirmacionDeCompra = () => {
  const carritoJSON = window.localStorage.getItem("cart");
  const carrito = JSON.parse(carritoJSON);

  const navigate = useNavigate();

  const [view, setView] = useState(1);
  const [userBuyData, setUserBuyData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    dni: "",
    telefono: "",
    provincia: "",
    localidad: "",
    direccion: "",
    codigoPostal: "",
    metodoDeEnvio: "",
  });

  const handleView = (option) => {
    setView(option);
  };

  useEffect(() => {
    if (carrito.length === 0) navigate("/");
    window.localStorage.setItem("actualForm", JSON.stringify(userBuyData));
  }, []);

  return (
    <section className={styles.container}>
      <div>
        <h2>CONFIRMACION DE LA COMPRA</h2>
        <div>
          <ul>
            <li
              className={view > 1 ? styles.disponible : styles.noDisponible}
              onClick={() => {
                handleView(1);
              }}
            >
              <strong>1.</strong> Tus datos {">"}
            </li>

            <li
              className={view > 2 ? styles.disponible : styles.noDisponible}
              onClick={() => {
                view > 2 && handleView(2);
              }}
            >
              <strong>2.</strong> Dirección de envío {">"}
            </li>

            <li
              className={view > 3 ? styles.disponible : styles.noDisponible}
              onClick={() => {
                view > 3 && handleView(3);
              }}
            >
              <strong>3.</strong> Método de envío {">"}
            </li>

            <li
              className={view > 4 ? styles.disponible : styles.noDisponible}
              onClick={() => {
                view > 4 && handleView(4);
              }}
            >
              <strong>4.</strong> Confirmación de compra
            </li>
          </ul>
        </div>
      </div>

      <article>
        <div>
          {view === 1 && (
            <UserData
              userBuyData={userBuyData}
              setUserBuyData={setUserBuyData}
              setView={setView}
            />
          )}
          {view === 2 && (
            <DireccionDeEnvio
              userBuyData={userBuyData}
              setUserBuyData={setUserBuyData}
              setView={setView}
            />
          )}
          {view === 3 && (
            <MetodoDeEnvio
              userBuyData={userBuyData}
              setUserBuyData={setUserBuyData}
              setView={setView}
            />
          )}
          {view === 4 && <Confirmacion userBuyData={userBuyData} />}
        </div>
      </article>

      <aside className={styles.carrito}>
        <h2>Tu carrito</h2>
        {carrito.map((produ, index) => {
          return (
            <div className={styles.producto} key={index}>
              <img src={produ.imagen} alt={produ.nombre} />
              <div>
                <div>{produ.nombre}</div>
                <div>Precio: {produ.precio}</div>
                <span>Talle: {produ.talle}</span>
              </div>
            </div>
          );
        })}
      </aside>
    </section>
  );
};

export default ConfirmacionDeCompra;
