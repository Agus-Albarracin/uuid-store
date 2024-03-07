import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";



const UpdateProduct = ({ productId, onCancel, onSubmit }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const producto = useSelector((state) => state.allProductos.find(p => p.id === productId));
    const talles = [36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46];

    const removeImage = (selectedImage) => {

        const auxImagen = producto.imagen.filter((image) => image !== selectedImage)
        console.log(auxImagen)
        setFormData({
            ...producto,
            imagen: auxImagen,
        });
    };

    const handleStock = (talle, count) => {
        if (count === '-' && producto.stock[talle] > 0) {
            setFormData({
                ...producto,
                stock: {
                    ...producto.stock,
                    [talle]: producto.stock[talle]--,
                }
            });
        }
    
        if (count === '+') {
            setFormData({
                ...producto,
                stock: {
                    ...producto.stock,[talle]: producto.stock[talle]++,
                }
            });
        }
    };

    useEffect(() => {
        if (producto) {
            setFormData({
                nombre: producto.nombre,
                marca: producto.marca,
                modelo: producto.modelo,
                precio: producto.precio,
                stock: producto.stock,
                genero: producto.genero,
                imagen: producto.imagen,
                enDescuento: producto.enDescuento,
                comentarios: producto.comentario,

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

    const handleDrop = (event) => {
        event.preventDefault();

        // generamos un array a partir de las imagenes que se van agregando
        const newFiles = event.dataTransfer.files;
        const newImagesArray = Array.from(newFiles);

        // Actualizar el valor de imagenes en el estado local
        setImages(prevImages => [...prevImages, ...newImagesArray]);
        // Actualizar el valor de imagenes en formik
        formik.setFieldValue('imagen', [...formik.values.imagen, ...newImagesArray]);
    };

    return (
        
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
                                className="mt-1 p-2 border rounded-md w-full sm:w-96"
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
                                className="mt-1 p-2 border rounded-md w-full sm:w-96"
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
                                className="mt-1 p-2 border rounded-md w-full sm:w-96"
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
                                className="mt-1 p-2 border rounded-md w-full sm:w-96"
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
                                className="mt-1 p-2 border rounded-md w-full sm:w-96"
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
                                className="mt-1 p-2 border rounded-md w-full sm:w-96"
                            />
                        </div>


                        {/* Resto de tus campos... */}
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

                        {/* Botones de enviar y cancelar */}

                    </form>
                    <div className="col-span-0.5">
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
                                    onClick={() => removeImage(image)}
                                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>

                    

                    <div className="col-span-1.5">
                        <label htmlFor="talles" className="block text-sm font-medium text-gray-700">
                            Talles y stock:
                        </label>
                        {talles.map((talle, index) => (
                            <div key={index} className="flex items-center ">
                                <span className="cursor-pointer text-blue-500" onClick={() => handleStock(talle, '-')}>-</span>
                                <span>{talle}</span>
                                <span className="cursor-pointer text-blue-500" onClick={() => handleStock(talle, '+')}>+</span>
                                <span className="ml-2">Cantidad en stock: {producto.stock[talle]}</span>
                            </div>
                        ))}
                    </div>

                    


                </div>
            
    );
};

export default UpdateProduct;
