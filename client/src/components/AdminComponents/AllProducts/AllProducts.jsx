import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductos, deleteProducto, updateProducto } from '../../../redux/actions';
import UpdateProduct from "./UpdateProduct/UpdateProduct";

const AllProducts = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Llamar a la acción getProductos cuando el componente monta
        dispatch(getProductos());
    }, [dispatch]);

    const productos = useSelector((state) => state.allProductos);

    


    const [editMode, setEditMode] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const handleDelete = (id) => {
        dispatch(deleteProducto(id));
    };

    const handleUpdate = (id) => {
        setEditMode(true);
        setSelectedProductId(id);

    };

    const handleFormSubmit = (formData) => {
        
        dispatch(updateProducto(formData));
        setEditMode(false);
        setSelectedProductId(null);
    };

    if (!Array.isArray(productos)) {
        dispatch(getProductos());
        return <p>Productos no es un array</p>;
        
    }

    // Renderizar productos si es un array
    return (
        <div className="contenedor-table">

            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Modelo</th>
                        <th>Descuento</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Genero</th>
                        <th>Marca</th>
                        <th>Imagen</th>
                        <th>Estado</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {productos?.map((producto) => (
                        <tr key={producto?.id}>
                            <td>{producto?.id}</td>
                            <td>{producto?.codigo}</td>
                            <td>{producto?.nombre}</td>
                            <td>{producto?.modelo}</td>
                            <td>{producto?.enDescuento}</td>
                            <td>{producto?.precio}</td>
                            <td>{Object.values(producto?.stock).some((value) => value !== 0) ? 'true' : 'false'}</td>
                            <td>{producto?.genero}</td>
                            <td>{producto?.marca}</td>
                            <td>
                                {producto.imagen ? (
                                    <img src={producto?.imagen[0]} alt={producto?.nombre} style={{ maxWidth: '50px', maxHeight: '80px' }} />
                                ) : null}
                            </td>
                            <td>{producto.estado}</td>
                            <td><button onClick={() => handleUpdate(producto?.id)}>Editar</button></td>
                            <td><button onClick={() => handleDelete(producto?.id)}>Eliminar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editMode && (
                <UpdateProduct
                    productId={selectedProductId}
                    onCancel={() => {
                        setEditMode(false);
                        setSelectedProductId(null);
                    }}
                    onSubmit={handleFormSubmit}
                />
            )}

        </div>
    );
};

export default AllProducts;
