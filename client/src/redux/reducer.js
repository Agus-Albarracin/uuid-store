import {
  GET_PRODUCTOS,
  GET_NAME,
  GET_DETAIL,
  POST_PRODUCTO,
  LOGIN,
  GET_ORDER,
  FILTER_PRODUCTO,
  FILTER_PRODUCTO2,
  SIGNUP,
  LOGOUT,
} from "./action-types";

const initialState = {
  allProductos: [],
  allProductosAux: [],
  detail: {},
  productCreated: {},
  actualUser: {},
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

    case FILTER_PRODUCTO:
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

    case GET_ORDER:
      let ordenAlf = [...state.allProductos];

      return {
        ...state,
        allProductos: ordenAlf.sort((a, b) => {
          return payload === "As" ? a.precio - b.precio : b.precio - a.precio;
        }),
      };

    // case LOGIN:
    //   return {
    //     ...state,
    //     actualUser: payload
    //   }

    case SIGNUP:
      return {
        ...state,
        actualUser: payload,
      };

    case LOGOUT:
      return {
        ...state,
        actualUser: payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
