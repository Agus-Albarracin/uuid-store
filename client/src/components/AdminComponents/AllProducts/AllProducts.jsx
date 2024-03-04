import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductos, } from '../../../redux/actions';

const AllProducts = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Llamar a la acción getProductos cuando el componente monta
        dispatch(getProductos());
    }, [dispatch]);

    const productos = useSelector((state) => state.allProductos);
    console.log(productos);

    return (
        <div className="contenedor-table">
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Modelo</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Genero</th>
                        <th>Marca</th>
                        <th>Imagen</th>
                        <th>Descuento</th>
                        <th>Estado</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.id}</td>
                            <td>{producto.codigo}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.modelo}</td>
                            <td>{producto.precio}</td>
                            <td>{Object.values(producto.stock).some((value) => value !== 0) ? 'true' : 'false'}</td>
                            <td>{producto.genero}</td>
                            <td>{producto.marca}</td>
                            <td>
                                {producto.imagen ? (
                                    <img src={producto.imagen} alt={producto.nombre} style={{ }} />
                                ) : null}
                            </td>
                            <td>{producto.descuento}</td>
                            <td>{producto.estado}</td>
                            <td><button>Editar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllProducts;
