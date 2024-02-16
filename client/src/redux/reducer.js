import { GET_PRODUCTOS } from "./action-types";

const initialState = {
    allProductos: [],
    allProductosAux: []

}

const rootReducer = (state = initialState, {type, payload}) =>{

    switch(type){
        
        case GET_PRODUCTOS:
            return{
                ...state,
                allProductos: payload,
                allProductosAux: payload
            }

        default:
            return {
                ...state
            }
    }
}

export default rootReducer;