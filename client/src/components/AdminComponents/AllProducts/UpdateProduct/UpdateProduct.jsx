import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { updateProducto } from '../../../../redux/actions';



const UpdateProduct = ({ productId, onCancel, onSubmit }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const producto = useSelector((state) => state.allProductos.find(p => p.id === productId));
    const talles = [36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46];

    const removeImage = (selectedImage) => {
        const auxImagen = formData.imagen.filter((image) => image !== selectedImage)
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
                    ...producto.stock, [talle]: producto.stock[talle]++,
                }
            });
        }
    };

    useEffect(() => {
        if (producto) {
            setFormData({
                id: producto.id,
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
            <form onSubmit={handleSubmit} className="col-span-3 space-y-4 flex-col">
                {/* Campos de formulario */}
                {[
                    { label: 'Nombre', name: 'nombre' },
                    { label: 'Marca', name: 'marca' },
                    { label: 'Modelo', name: 'modelo' },
                    { label: 'Comentario', name: 'comentario' },
                    { label: 'Precio', name: 'precio' },
                    { label: 'Genero', name: 'genero', type: 'select', options: ['Masculino', 'Femenino', 'Unisex'] },
                    { label: 'Descuento', name: 'descuento' },
                    // Resto de tus campos...
                ].map((field) => (
                    <div key={field.name} className="mb-4">
                        <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                            {field.label}:
                        </label>
                        {field.type === 'select' ? (
                            <select
                                name={field.name}
                                id={field.name}
                                onChange={handleChange}
                                defaultValue={producto[field.name]}
                                className="mt-1 p-2 border rounded-md w-full sm:w-96 focus:outline-none focus:border-blue-500"
                            >
                                {field.options.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type="text"
                                id={field.name}
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded-md w-full sm:w-96 focus:outline-none focus:border-blue-500"
                            />
                        )}
                    </div>
                ))}

                {/* Botones de enviar y cancelar */}
                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none transition duration-300 ease-in-out"
                    >
                        Guardar cambios
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400 focus:outline-none transition duration-300 ease-in-out"
                    >
                        Cancelar
                    </button>
                </div>
            </form>

            <div className="col-span-0.5">
                {/* Imágenes */}
                <label htmlFor="imagenes" className="block text-sm font-medium text-gray-700">
                    Imágenes:
                </label>
                {formData.imagen.map((image, index) => (
                    <div key={index} className="mt-2">
                        <img
                            src={image}
                            alt={index}
                            className="w-16 h-16 object-cover rounded"
                        />
                        <button
                            type="button"
                            onClick={() => removeImage(image)}
                            className="ml-2 px-2 py-1 bg-red-500 text-white rounded focus:outline-none"
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
                    <div key={index} className="flex items-center space-x-2">
                        <button
                            className="text-blue-500 focus:outline-none"
                            onClick={() => handleStock(talle, '-')}
                        >
                            -
                        </button>
                        <span>{talle}</span>
                        <button
                            className="text-blue-500 focus:outline-none"
                            onClick={() => handleStock(talle, '+')}
                        >
                            +
                        </button>
                        <span className="ml-2">Cantidad en stock: {producto.stock[talle]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpdateProduct;
