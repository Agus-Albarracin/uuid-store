import {
  GET_PRODUCTOS,
  GET_DETAIL,
  GET_NAME,
  POST_PRODUCTO,
  LOGIN,
  SIGNUP,
  FILTER_PRODUCTO,
  FILTER_PRODUCTO2,
  GET_ORDER,
  LOGOUT,
  MESSAGE_TO_USER,
  CLEAR_MESSAGE,
  AUTO_LOGIN,
} from "./action-types";

import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

// TRAER TODOS LOS PRODUCTOS
export const getProductos = () => {
  try {
    return async function (dispatch) {
      const response = await axios(`http://localhost:3001/getproductos`);
      return dispatch({
        type: GET_PRODUCTOS,
        payload: response.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const getName = (nombre) => {
  try {
    return async function (dispatch) {
      const response = await axios(
        `http://localhost:3001/getproductosByName/?nombre=${nombre}`
      );
      return dispatch({
        type: GET_NAME,
        payload: response.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
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
      console.log(error);
    }
  };
};

export const filterProducto = (marca) => {
  return {
    type: FILTER_PRODUCTO,
    payload: marca,
  };
};

export const filterProducto2 = (genero) => {
  return {
    type: FILTER_PRODUCTO2,
    payload: genero,
  };
};

export const getOrder = (order) => {
  return {
    type: GET_ORDER,
    payload: order,
  };
};

// INICIAR SESION
export const logIn = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/login?email=${email}&password=${password}`
      );
      return dispatch({
        type: LOGIN,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: MESSAGE_TO_USER,
        payload: error.response.data,
      });
    }
  };
};

export const signUp = (form) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, form);
      return dispatch({
        type: SIGNUP,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: MESSAGE_TO_USER,
        payload: error.response.data,
      });
    }
  };
};

export const logOut = () => {
  return {
    type: LOGOUT,
    payload: {},
  };
};

export const clearMessage = () => {
  return {
    type: CLEAR_MESSAGE,
    payload: "",
  };
};

export const autoLogin = (user) => {
  return {
    type: AUTO_LOGIN,
    payload: user,
  };
};
