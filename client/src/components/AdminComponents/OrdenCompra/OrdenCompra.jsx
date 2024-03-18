import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdenes, putStateOrdens } from "../../../redux/actions";

function OrdenCompra() {
  const [selectedEstado, setSelectedEstado] = useState("pendiente");
  const [searchIdDeCompra, setSearchIdDeCompra] = useState("");
  const orders = useSelector((state) => state.allOrdenes);
  const dispatch = useDispatch();
  const filteredOrders = orders.filter((order) => order.estadoDelPedido === selectedEstado && order.idDeCompra.includes(searchIdDeCompra));

  useEffect(() => {
    dispatch(getOrdenes());
  }, [dispatch]);

  const handleEstadoChange = async (orderId, email, newEstado) => {
    try {
      await dispatch(putStateOrdens(orderId, email, newEstado));
      console.log("Orden ID:", orderId, "Nuevo Estado:", newEstado);
      window.location.reload();
    } catch (error) {
      console.error("Error al actualizar el estado de la orden:", error);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full">
          <thead>
            <tr className="bg-red-500 text-white">
              <th className="px-4 py-2">N° de Orden</th>
              <th className="px-4 py-2">Productos</th>
              <th className="px-4 py-2">Usuario</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Fecha y hora</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Acción</th>
            </tr>
            <tr>
              <th className="px-4 py-2">
                <input
                  type="text"
                  placeholder="Buscar por N° de Orden"
                  className="border rounded px-2 py-1"
                  value={searchIdDeCompra}
                  onChange={(e) => setSearchIdDeCompra(e.target.value)}
                />
              </th>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">
                <select
                  className="border rounded px-2 py-1"
                  value={selectedEstado}
                  onChange={(e) => setSelectedEstado(e.target.value)}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="despachado">Despachado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </th>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.idDeCompra}>
                <td className="font-semibold border px-4 py-2">{order.idDeCompra}</td>
                <td className="border px-4 py-2">
                  {order.productos.map((producto) => (
                    <div key={producto.id}>
                      <a className="text-red-500" href={`/detail/${producto.id}`}>
                        VER:<br />
                        {producto.nombre}
                      </a>{" "}
                      <br />
                      - Talle: {producto.talle} <br />
                      - Cantidad: {producto.cantidad} <br />
                      - Precio: ${producto.precio}<br />
                      - Precio por cantidad: $ {producto.precio * producto.cantidad}<br /><br /><br />
                    </div>  
                  ))}
                </td>
                <td className="font-semibold border px-4 py-2">
                  {order.userData.nombre} {order.userData.apellido} <br />
                  DNI: {order.userData.dni} <br />
                  Teléfono: {order.userData.telefono} <br />
                  Email: {order.userData.email}
                </td>
                <td className="border px-4 py-2">
                  <select
                    className="border rounded px-2 py-1"
                    value={order.estadoDelPedido}
                    onChange={(e) =>
                      handleEstadoChange(
                        order.idDeCompra,
                        order.userData.email,
                        e.target.value
                      )
                    }
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="despachado">Despachado</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <div>
                    <p className="font-semibold">Fecha: {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p className="font-semibold">Hora: {new Date(order.createdAt).toLocaleTimeString()}</p>
                  </div>
                </td>
                <td className="border px-4 py-2">
                  ${order.productos.reduce(
                    (total, producto) => total + producto.precio * producto.cantidad,
                    0
                  )}
                </td>
                <td className="border px-4 py-2">
                  <button className="bg-red-500 text-white px-3 py-1 rounded">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdenCompra;
