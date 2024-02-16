import { GET_PRODUCTOS } from "./action-types";

import axios from 'axios';

export const getProductos = () => {
    return async function(dispatch){
        const response = await axios(`http://localhost:3001/getproductos/`);
        return dispatch({
            type: GET_PRODUCTOS,
            payload: response.data
        })
    }
}