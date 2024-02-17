import { GET_PRODUCTOS } from "./action-types";
import { GET_DETAIL } from "./action-types"; 


const initialState = {
  allProductos: [],
  allProductosAux: [],
  detail: {},
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
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
