import {
  GET_PRODUCTOS,
  GET_DETAIL,
  CLEAR_DETAIL,
  GET_NAME,
  POST_PRODUCTO,
  LOGIN,
  SIGNUP,
  FILTER_MARCA,
  FILTER_PRODUCTO2,
  FILTER_MODELO,
  GET_ORDER,
  LOGOUT,
  MESSAGE_TO_USER,
  CLEAR_MESSAGE,
  AUTO_LOGIN,
  ADD_TO_CART,
  REMOVE_TO_CART,
  LOG_IN_GOOGLE,
  SIGN_UP_GOOGLE,
  AUTO_SET_CARRO,
  GET_USERS,
  CREATE_TICKET,
  GET_ORDENES,
  DELETE_USERS,
  ADMIN_USERS,
  ESTADO_ORDEN,
  CLEAR_CART,
  CLEAR_COMPRA,
  GET_DETALLE_DE_COMPRA,
  CLEAR_DETALLE_DE_COMPRA,
  DELETE_PRODUCTO,
  UPDATE_PRODUCTO,
  ENVIAR_MAIL_PASSWORD,
  CAMBIAR_PASSWORD,
} from "./action-types";

import axios from "axios";

const BACK_URL = import.meta.env.VITE_VERCEL_BACKURL;

axios.defaults.baseURL = BACK_URL;



// TRAER TODOS LOS PRODUCTOS
export const getProductos = () => {
  try {
    return async function (dispatch) {
      const response = await axios(`/getproductos`);
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
      const response = await axios(`/getproductosByName/?nombre=${nombre}`);
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
      const response = await axios.get(`/getproductos/${id}`);
      return dispatch({
        type: GET_DETAIL,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching product detail:", error);
    }
  };
};

export const clearDetail = () => {
  return {
    type: CLEAR_DETAIL,
    payload: {},
  };
};

// CREAR UN PRODUCTO
export const postProducto = (form) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/postproductos`, form);
      return dispatch({
        type: POST_PRODUCTO,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const filterMarca = (marca) => {
  return {
    type: FILTER_MARCA,
    payload: marca,
  };
};

export const filterProducto2 = (genero) => {
  return {
    type: FILTER_PRODUCTO2,
    payload: genero,
  };
};

export const filterModelo = (modelo) => {
  return {
    type: FILTER_MODELO,
    payload: modelo,
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
        `/login?email=${email}&password=${password}`
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

// REGISTRARSE CON GOOGLE

export const signUpWhitGoogle = (googleData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/signupgoogle`, googleData);
      return dispatch({
        type: SIGN_UP_GOOGLE,
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

// INICIAR SESION CON GOOGLE
export const logInWhitGoogle = ({ email }) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/loginGoogle?email=${email}`);
      return dispatch({
        type: LOG_IN_GOOGLE,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: MESSAGE_TO_USER,
        payload: error.response.data,
      });
    }
  };
};

// REGISTRO
export const signUp = (form) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/signup`, form);
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

//BOTON DE DETAIL

export const addToCart = (product) => {
  console.log(product);
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export const removeToCart = (productIndex) => {
  return {
    type: REMOVE_TO_CART,
    payload: productIndex,
  };
};

export const autoSetCarro = (carro) => {
  return {
    type: AUTO_SET_CARRO,
    payload: carro,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
    payload: [],
  };
};

export const allUsers = () => {
  try {
    return async function (dispatch) {
      const response = await axios(`/getuser`);
      return dispatch({
        type: GET_USERS,
        payload: response.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

// DELETE USER
export const deleteUser = (email) => {
  return async function (dispatch) {
    try {
      const response = await axios.delete("/deleteuser", { data: { email } });
      return dispatch({
        type: DELETE_USERS,
        payload: email,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const accessAdminUser = (email) => {
  return async function () {
    try {
      const response = await axios.put("/adminaccess", { email });
    } catch (error) {
      console.error("Error al acceder al usuario administrador:", error);
    }
  };
};

// CREAR TICKET DE COMPRA

export const createTicket = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/createOrden`, data);
      return dispatch({
        type: CREATE_TICKET,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearCompra = () => {
  return {
    type: CLEAR_COMPRA,
    payload: {},
  };
};

export const getOrdenes = () => {
  try {
    return async function (dispatch) {
      const response = await axios.get(`/getOrden`);
      return dispatch({
        type: GET_ORDENES,
        payload: response.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const putStateOrdens = (idDeCompra, email, ordenState) => {
  try {
    return async function (dispatch) {
      const response = await axios.put("/stateOrden", {
        idDeCompra,
        email,
        estadoDelPedido: ordenState,
      });
      return dispatch({
        type: ESTADO_ORDEN,
        payload: response.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const deleteProducto = (id) => {
  return {
    type: DELETE_PRODUCTO,
    payload: id,
  };
};



export const updateProducto = (formData) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/updateproductos/${formData.id}`, formData);
      
      dispatch({
        type: UPDATE_PRODUCTO,
        payload: response.data // Puedes ajustar esto según la respuesta de tu API
      });
    } catch (error) {
      // Manejo de errores aquí
      console.error('Error al actualizar el producto:', error);
    }

  };
};

export const getDetalleDeCompra = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/getOrdenbyid?idDeCompra=${id}`);
      return dispatch({
        type: GET_DETALLE_DE_COMPRA,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearDetalleDeCompra = () => {
  return {
    type: CLEAR_DETALLE_DE_COMPRA,
    payload: {},
  };
};

//CAMBIO DE PASSWORD

export const enviarMailPassword = (email) => {
  try {
    return async function (dispatch) {
      const response = await axios.post("/recovery", { email });
      return dispatch({
        type: ENVIAR_MAIL_PASSWORD,
        payload: response.data,
      });
    };
  } catch (error) {
    console.log(error.message);
  }
};

export const cambiarPassword = (token, newPassword) => {
  try {
    return async function (dispatch) {
      const response = await axios.post(
        `/change-password`,
        { token, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return dispatch({
        type: CAMBIAR_PASSWORD,
        payload: response.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};
