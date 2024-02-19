import { GET_PRODUCTOS, GET_DETAIL, POST_PRODUCTO, LOGIN } from "./action-types";

const initialState = {
  allProductos: [],
  allProductosAux: [],
  detail: {},
  productCreated: {},
  actualUser: {},
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCTOS:
      return {
        ...state,
        allProductos: payload,
        allProductosAux: payload,
      };

    case GET_DETAIL:
      return {
        ...state,
        detail: payload,
      };

    // case CLEAR_DETAIL:
    //   return {
    //     ...state,
    //     detail: {},
    //   };
    
    case POST_PRODUCTO:
      return {
        ...state,
        productCreated: payload,
      }
    
    case LOGIN:
      return {
        ...state,
        actualUser: payload
      }

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
