import { GET_PRODUCTOS, GET_DETAIL, POST_PRODUCTO, LOGIN } from "./action-types";

import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

// TRAER TODOS LOS PRODUCTOS
export const getProductos = () => {
  return async function (dispatch) {
    const response = await axios(`http://localhost:3001/getproductos`);
    return dispatch({
      type: GET_PRODUCTOS,
      payload: response.data,
    });
  };
};

// TRAER EL DETAIL DE UN PRODUCTO
export const getDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getproductos/${id}`);
      return dispatch({
        type: GET_DETAIL,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching product detail:", error);
    }
  };
};

// CREAR UN PRODUCTO
export const postProducto = (form) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/postproductos`, form);
      return dispatch({
        type: POST_PRODUCTO,
        payload: response.data,
      });
    } catch (error) {
      console.log(error)
    }
  }
}

// INICIAR SESION
export const postUsuario = (form) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, form);
      return dispatch({
        type: LOGIN,
        payload: response.data
      });
    } catch (error) {
      console.log(error)
    }
  }
}