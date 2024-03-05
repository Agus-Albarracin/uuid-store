import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getOrdenes } from "../../../redux/actions";

import "./OrdenCompra.css"

function OrdenCompra(){

    const orders = useSelector((state) => state.allOrdenes);
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getOrdenes())
    },[])
    return(
        <div>
           
            <div className="contenedor-table">
                <table>
                    <thead>
                    <tr>
                        <th> N° de Orden</th>
                        <th> Producto </th>
                        <th> Usuario </th>
                        <th> Estado </th>
                    </tr>
                    </thead>
                    
                    <tbody>
                        { orders.map ( (order) => {
                            <tr key={order.idDeCompra}>
                                <td>{order.ProdusctoId}</td>
                                <td>{order.UsuarioId}</td>
                                <td>{order.estadoDelPedido}</td>
                                <td><button> Eliminar </button></td>
                                
                            </tr>
                            }

                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrdenCompra;