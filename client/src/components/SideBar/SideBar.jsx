import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getOrder, getProductos, filterProducto, filterProducto2 } from "../../redux/actions"
import './SideBar.css'
//import { useState } from 'react';

function SideBar({ handleChange, handleSubmit }){
    const dispatch = useDispatch();
    const allProductos = useSelector((state) => state.allProductosAux);

    function selectProducto(e){
        dispatch(filterProducto(e.target.value , e.target.name));
    }

    function selectProducto2(e){
        dispatch(filterProducto2(e.target.value , e.target.name));
    }

    function selectOrd(e){
        dispatch(getOrder(e.target.value));
    }

    useEffect(() => {
        if (allProductos.length === 0) {
        dispatch(getProductos());

        }
    }, [dispatch, allProductos.length]);


    return(
        <div className="container-side">

            <div className='search-box'>
                <form onChange={handleChange}>
                    <input placeholder='Buscar' />                
                </form>
                <button type='submit' onClick={handleSubmit}>Buscar</button>
           </div>

            <span> Marca </span>
            <select onChange={selectProducto}>
                <option value=""hidden></option>
                <option value="All">All</option>
                {allProductos.map((prod) => (
                    <option key={prod.id} value={prod.marca}>
                        {prod.marca}
                    </option>
                ))}

            </select>

            <span> Genero </span>
            <select onChange={selectProducto2}>
                <option value=""hidden></option>
                <option value="All">All</option>
                {allProductos.map((prod) => (
                    <option key={prod.id} value={prod.genero}>
                        {prod.genero}
                    </option>
                ))}

            </select>


            <span> Precio </span>
            <select onChange={selectOrd}>
                <option value="" hidden></option>
                <option value="As">Mayor Precio</option>
                <option value="Ds">Menor Precio</option>
            </select>

        </div>
    )
}

export default SideBar;