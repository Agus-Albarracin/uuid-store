import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductosAll,
  deleteProducto,
  updateProducto,
} from "../../../redux/actions";
import UpdateProduct from "./UpdateProduct/UpdateProduct";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const AllProducts = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState(""); // Nuevo estado para el término de búsqueda
  const productsPerPage = 7;

  useEffect(() => {
    dispatch(getProductosAll());
  }, [dispatch, currentPage]);

  const productos = useSelector((state) => state.allProductos);
  const [editMode, setEditMode] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleDelete = (id) => {
    dispatch(deleteProducto(id));
  };

  const handleUpdate = (id) => {
    setEditMode(true);
    setSelectedProductId(id);
  };

  const handleFormSubmit = (formData) => {
    dispatch(updateProducto(formData));
    setEditMode(false);
    setSelectedProductId(null);
  };

  if (!Array.isArray(productos)) {
    dispatch(getProductosAll());
    return <p>Productos no es un array</p>;
  }

  const filteredProducts = filter === "all"
    ? productos
    : productos.filter((producto) => producto.estado === (filter === "on"));

  const filteredAndSearchedProducts = filteredProducts.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredAndSearchedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredAndSearchedProducts.length / productsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="contenedor-table max-w-full mx-auto mt-8 p-4 bg-white rounded-md">
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 mx-2 bg-gray-200 rounded ${
            filter === "all" ? "bg-gray-400" : ""
          }`}
          onClick={() => setFilter("all")}
        >
          Todos
        </button>
        <button
          className={`px-4 py-2 mx-2 bg-green-500 text-white rounded ${
            filter === "on" ? "bg-green-600" : ""
          }`}
          onClick={() => setFilter("on")}
        >
          On
        </button>
        <button
          className={`px-4 py-2 mx-2 bg-red-500 text-white rounded ${
            filter === "off" ? "bg-red-600" : ""
          }`}
          onClick={() => setFilter("off")}
        >
          Off
        </button>
      </div>



      <div className="overflow-x-auto">
        <table className="w-full border border-collapse">
          {/* Cabecera de la tabla */}
          <thead>
            <tr className="bg-orange-500">
              {/* Encabezados de columnas */}
              <th className="p-2 border">Código</th>
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Modelo</th>
              <th className="p-2 border">Precio</th>
              <th className="p-2 border">Descuento</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Marca</th>
              <th className="p-2 border">Imagen</th>
              <th className="p-2 border">Estado</th>
              <th className="p-2 border">Editar</th>
              <th className="p-2 border">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {/* Renderizar filas de productos */}
            {currentProducts.map((producto) => (
              <tr key={producto.id} className="hover:bg-gray-100">
                {/* Datos de producto */}
                <td className="p-2 border">{producto.codigo}</td>
                <td className="p-2 border">{producto.nombre}</td>
                <td className="p-2 border">{producto.modelo}</td>
                <td className="p-2 border">{producto.precio}</td>
                <td className="p-2 border">{producto.descuento}</td>
                <td className="p-2 border">
                  {Object.values(producto.stock).some((value) => value !== 0) ? (
                    <span className="bg-green-500 text-white px-2 py-1 rounded">Si</span>
                  ) : (
                    <span className="bg-red-500 text-white px-2 py-1 rounded">No</span>
                  )}
                </td>
                <td className="p-2 border">{producto.marca}</td>
                <td className="p-2 border">
                  {producto.imagen ? (
                    <img src={producto.imagen[0]} alt={producto.nombre} className="w-16  object-cover" />
                  ) : null}
                </td>
                <td className="p-2 border">
                  {producto.estado ? (
                    <span className="bg-green-500 text-white px-2 py-1 rounded">On</span>
                  ) : (
                    <span className="bg-red-500 text-white px-2 py-1 rounded">Off</span>
                  )}
                </td>
                {/* Botones de editar y eliminar */}
                <td className="p-2 border text-center">
                  <button
                    onClick={() => handleUpdate(producto.id)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none flex items-center"
                  >
                    <FaEdit className="mr-2" />
                    <span>Editar</span>
                  </button>
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(producto.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none flex items-center"
                  >
                    <FaTrashAlt className="mr-2" />
                    <span>Eliminar</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="pagination flex justify-center mt-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-2 mx-1 text-gray-800 rounded focus:outline-none focus:bg-gray-400 ${
              currentPage === index + 1 ? "bg-gray-300" : "bg-gray-200"
            }`}
          >
            <span className="text-gray-300">{index + 1}</span>
          </button>
        ))}
      </div>

      {/* Componente de actualización de producto */}
      {editMode && (
        <UpdateProduct
          productId={selectedProductId}
          onCancel={() => {
            setEditMode(false);
            setSelectedProductId(null);
          }}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default AllProducts;
