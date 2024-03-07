import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getDetalleDeCompra } from "../../redux/actions";

const DetallesDeCompra = () => {
  const { idDeCompra } = useParams();
  const dispatch = useDispatch();

  const compra = useSelector((state) => state.compraActual);

  useEffect(() => {
    dispatch(getDetalleDeCompra(idDeCompra));
  }, []);

  return (
    <div>
      {Object.keys(compra).length > 0 ? (
        <div>
          <div>ID de tu compra: {compra.idDeCompra}</div>
          <div>
            <h2>Datos del usuario:</h2>
            <ul>
              {Object.entries(compra.userData).map((dato, index) => (
                <li key={index}> {`${dato[0]}: ${dato[1]}`} </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Datos de envio:</h2>
            <ul>
              {Object.entries(compra.datosDeEnvio).map((dato, index) => (
                <li key={index}> {`${dato[0]}: ${dato[1]}`} </li>
              ))}
            </ul>
          </div>

          <h2>Estado de tu compra: {compra.estadoDelPedido}</h2>

          <div>
            <h2>Productos:</h2>
            {compra.productos.map((produ, index) => {
              return (
                <div key={index}>
                  <img src={produ.img} alt={produ.modelo} />
                  <span>
                    {produ.nombre} {produ.modelo}
                  </span>
                  <span> Marca: {produ.marca}</span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>nada</div>
      )}
    </div>
  );
};

export default DetallesDeCompra;
