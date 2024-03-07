import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductos, getName } from "../../redux/actions";
import SideBar from "../../components/SideBar/SideBar";
import Cards from "../../components/Cards/Cards";

import "./Productos.css";

const Productos = () => {
  const dispatch = useDispatch();
  const allProductos = useSelector((state) => state.allProductos);
  const [searchString, setSearchString] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const handleChange = (e) => {
    e.preventDefault();
    setSearchString(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getName(searchString));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    if (allProductos.length === 0) {
      dispatch(getProductos());
    }
  }, [dispatch, allProductos.length]);

  // Calculate products to display based on pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProductos.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <div className="w-full md:w-1/6 bg-gray-200 p-4">
        <SideBar handleChange={handleChange} handleSubmit={handleSubmit} />
      </div>
      <div className="w-full p-4 overflow-y-auto">
        <Cards data={currentProducts} />
        
        {/* Pagination buttons */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(allProductos.length / productsPerPage) }).map((_, index) => (
            <button
              key={index}
              className={`mx-2 px-3 py-1 border ${currentPage === index + 1 ? 'bg-gray-500 text-white' : 'bg-white'}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Productos;
