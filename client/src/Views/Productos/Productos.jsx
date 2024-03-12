import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getProductos, getName, filterMarca, filterModelo, filterProducto2 } from "../../redux/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import SideBar from "../../components/SideBar/SideBar";
import Cards from "../../components/Cards/Cards";

// import "./Productos.css";

const Productos = () => {
  const dispatch = useDispatch();
  const allProductos = useSelector((state) => state.allProductos);
  const [searchString, setSearchString] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchString(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getName(searchString));
  };

  useEffect(() => {
    if (allProductos.length === 0) {
      dispatch(getProductos());
    }
  }, [dispatch, allProductos.length]);

  //Scroll

  axios.defaults.baseURL = "https://uuid-store-production.up.railway.app";

  const [array, setArray] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios("/getproductos").then(({ data }) => {
      if (data) {
        setArray(data);
        setItems(data.slice(0, 10));
      }
    });
  }, []);

  const fetchMoreData = () => {
    setTimeout(() => {
      const nextItems = array.slice(items.length, items.length + 10);
      setItems((prevItems) => [...prevItems, ...nextItems]);
    }, 2500);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-y">
      <div className="w-full md:w-1/6 bg-gray-200 p-4">
        <SideBar handleChange={handleChange} handleSubmit={handleSubmit} />
      </div>

      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={items.length < array.length}
        loader={<h4> Loading...</h4>}
      >
        <Cards data={items} />
      </InfiniteScroll>
    </div>
  );
};

export default Productos;
