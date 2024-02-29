import {
  GET_PRODUCTOS,
  GET_NAME,
  GET_DETAIL,
  POST_PRODUCTO,
  LOGIN,
  GET_ORDER,
  FILTER_MARCA,
  FILTER_PRODUCTO2,
  FILTER_MODELO,
  SIGNUP,
  LOGOUT,
  MESSAGE_TO_USER,
  CLEAR_MESSAGE,
  AUTO_LOGIN,
  ADD_TO_CART,
  REMOVE_TO_CART,
  LOG_IN_GOOGLE,
  SIGN_UP_GOOGLE,
  AUTO_SET_CARRO
} from "./action-types";

const initialState = {
  allProductosHome: [],
  allProductos: [],
  allProductosAux: [],
  detail: {},
  productCreated: {},
  actualUser: {},
  messageToUser: "",
  cart: [],
};

// case CLEAR_DETAIL:
//   return {
//     ...state,
//     detail: {},
//   };

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTOS:
      return {
        ...state,
        allProductosHome: payload,
        allProductos: payload,
        allProductosAux: payload,
      };

    case GET_NAME:
      return {
        ...state,
        allProductos: payload,
      };

    case GET_DETAIL:
      return {
        ...state,
        detail: payload,
      };

    case POST_PRODUCTO:
      return {
        ...state,
        productCreated: payload,
      };

    case FILTER_MARCA:
      const copyCont = [...state.allProductosAux];
      if (payload === "All") {
        return {
          ...state,
          allProductos: copyCont,
        };
      }

      let filteredMarca = copyCont.filter(function (filtroCont) {
        return filtroCont.marca === payload;
      });

      return {
        ...state,
        allProductos: filteredMarca,
      };

    case FILTER_PRODUCTO2:
      const copyCont2 = [...state.allProductosAux];
      if (payload === "All") {
        return {
          ...state,
          allProductos: copyCont2,
        };
      }

      let filteredGenero = copyCont2.filter(function (filtroCont) {
        return filtroCont.genero === payload;
      });

      return {
        ...state,
        allProductos: filteredGenero,
      };

    case FILTER_MODELO:
      const copyCont3 = [...state.allProductosAux];
      if (payload === "All") {
        return {
          ...state,
          allProductos: copyCont3,
        };
      }

      let filteredModelo = copyCont3.filter(function (filtroCont) {
        return filtroCont.modelo === payload;
      });

      return {
        ...state,
        allProductos: filteredModelo,
      };

    case GET_ORDER:
      let ordenAlf = [...state.allProductos];

      return {
        ...state,
        allProductos: ordenAlf.sort((a, b) => {
          return payload === "As" ? a.precio - b.precio : b.precio - a.precio;
        }),
      };

    case LOGIN:
      return {
        ...state,
        actualUser: payload,
        messageToUser: "Sesión iniciada correctamente!",
      };

    case SIGNUP:
      return {
        ...state,
        actualUser: payload,
        messageToUser: "Usuario creado correctamente!",
      };

    case LOGOUT:
      return {
        ...state,
        actualUser: payload,
      };

    case MESSAGE_TO_USER:
      return {
        ...state,
        messageToUser: payload,
      };

    case CLEAR_MESSAGE:
      return {
        ...state,
        messageToUser: payload,
      };

    case AUTO_LOGIN:
      return {
        ...state,
        actualUser: payload,
      };

    case LOG_IN_GOOGLE:
      return {
        ...state,
        actualUser: payload,
        messageToUser: "Sesión iniciada correctamente!",
      };

    case SIGN_UP_GOOGLE:
      return {
        ...state,
        actualUser: payload,
        messageToUser: "Usuario creado correctamente!",
      };

    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, payload],
        messageToUser: "Producto agregado al carrito!"
      };

    case REMOVE_TO_CART:
    const cartFilter = state.cart.filter(item => item.uuid !== payload)
      return {
        ...state,
        cart: cartFilter,
      };

    case AUTO_SET_CARRO:
      return {
        ...state,
        cart: payload
      }

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
