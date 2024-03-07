import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UpdateProduct = ({ productId, onCancel, onSubmit }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const producto = useSelector((state) => state.allProductos.find(p => p.id === productId));
    const talles = [36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46];

    const removeImage = (index) => {
        setFormData({
            ...producto,
            imagen: producto.imagen.filter((_, i) => i !== index),
        });
    };

    useEffect(() => {
        if (producto) {
            setFormData({
                nombre: producto.nombre,
                marca: producto.marca,
                modelo: producto.modelo,
                precio: producto.precio,
                genero: producto.genero,
            });
        }
    }, [producto]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="absolute inset-0 bg-black bg-opacity-50">
                <div className="bg-white max-w-full h-full p-4 rounded-md mx-auto grid grid-cols-5 gap-4">
                    <form onSubmit={handleSubmit} className="col-span-3 space-y-4">
                        {/* Campos de formulario */}
                        <div className="mb-4">
                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                                Nombre:
                            </label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre || ""}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded-md w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="marca" className="block text-sm font-medium text-gray-700">
                                Marca:
                            </label>
                            <input
                                type="text"
                                id="marca"
                                name="marca"
                                value={formData.marca || ""}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded-md w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="modelo" className="block text-sm font-medium text-gray-700">
                                Modelo:
                            </label>
                            <input
                                type="text"
                                id="modelo"
                                name="modelo"
                                value={formData.modelo || ""}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded-md w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
                                Precio:
                            </label>
                            <input
                                type="text"
                                id="precio"
                                name="precio"
                                value={formData.precio || ""}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded-md w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="genero" className="block text-sm font-medium text-gray-700">
                                Genero:
                            </label>
                            <select
                                name="genero"
                                id="genero"
                                onChange={handleChange}
                                defaultValue={producto.genero}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Unisex">Unisex</option>
                            </select>

                        </div>

                        <div className="mb-4">
                            <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
                                Precio:
                            </label>
                            <input
                                type="text"
                                id="precio"
                                name="precio"
                                value={formData.precio || ""}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded-md w-full"
                            />
                        </div>
                        {/* Resto de tus campos... */}

                        {/* Botones de enviar y cancelar */}
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
                            >
                                Guardar cambios
                            </button>
                            <button
                                type="button"
                                onClick={onCancel}
                                className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                    <div className="col-span-2">
                        {/* Imágenes */}
                        <label htmlFor="imagenes" className="block text-sm font-medium text-gray-700">
                            Imágenes:
                        </label>
                        {producto.imagen.map((image, index) => (
                            <div key={index} className="mt-2">
                                <img
                                    src={image}
                                    alt={`Imagen ${index}`}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;
