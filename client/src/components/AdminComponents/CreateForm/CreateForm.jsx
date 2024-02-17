import { useFormik } from "formik";
import validate from './validation.js';
import styles from './CreateForm.module.scss';
import { useState } from "react";
import { postProducto } from "../../../redux/actions.js";
import { useDispatch } from 'react-redux';

const CreateForm = () => {

    const talles = [ 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46 ];

    const [ images, setImages ] = useState([]);

    const dispatch = useDispatch();

    const handleDrop = (event) => {
        event.preventDefault();
        const newFiles = event.dataTransfer.files;
        const newImagesArray = Array.from(newFiles).map((file) => file);
        setImages(prevImages => [...prevImages, ...newImagesArray]);
        // Actualizar el valor de imagenes en formik
        formik.setFieldValue('imagenes', [...formik.values.imagenes, ...newImagesArray]);
      };
    
    const removeImage = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
        // Actualizar el valor de imagenes en formik
        formik.setFieldValue('imagenes', formik.values.imagenes.filter((_, i) => i !== index));
    };

    const handleStock = (talle) => {
        formik.setFieldValue('stock', {...formik.values.stock, [talle]: formik.values.stock[talle] + 1 })
    }
    
    const formik = useFormik({
        initialValues: {
            nombre: '',
            marca: '',
            modelo: '',
            precio: '',
            genero: 'masculino',
            imagenes: [],
            estado: false,
            stock: {
                36: 0, 
                36.5: 0, 
                37: 0, 
                37.5: 0, 
                38: 0, 
                38.5: 0, 
                39: 0, 
                39.5: 0, 
                40: 0, 
                40.5: 0, 
                41: 0, 
                41.5: 0, 
                42: 0, 
                42.5: 0, 
                43: 0, 
                43.5: 0, 
                44: 0, 
                44.5: 0, 
                45: 0, 
                45.5: 0,
                46: 0,
            }
        },
        validate,
        onSubmit: values => {

            dispatch(postProducto({...values, imagenes: 'berretin', stock: 1}))
        }
    });

    return (
        <form onSubmit={formik.handleSubmit} >
            <label htmlFor="nombre"> Nombre </label>
            <input
                id='nombre'
                name='nombre'
                type="text"
                onChange={formik.handleChange}
                value={formik.values.nombre}
                onBlur={formik.handleBlur}
            />
            { formik.errors.marca && <div>{formik.errors.marca}</div> }

            <label htmlFor="marca"> Marca </label>
            <input
                id='marca'
                name='marca'
                type="text"
                onChange={formik.handleChange}
                value={formik.values.marca}
                onBlur={formik.handleBlur}
            />
            { formik.errors.marca && <div>{formik.errors.marca}</div> }
            
            <label htmlFor="modelo"> Modelo </label>
            <input
                id='modelo'
                name='modelo'
                type="text"
                onChange={formik.handleChange}
                value={formik.values.modelo}
                onBlur={formik.handleBlur}
            />
            { formik.errors.modelo && <div>{formik.errors.modelo}</div> }
            
            <label htmlFor="precio"> Precio </label>
            <input
                id='precio'
                name='precio'
                type="number"
                onChange={formik.handleChange}
                value={formik.values.precio}
                onBlur={formik.handleBlur}
            />
            { formik.errors.precio && <div>{formik.errors.precio}</div> }

            <label htmlFor="genero"> Genero </label>
            <select 
                name="genero" 
                id="genero" 
                onChange={formik.handleChange} 
                value={formik.values.genero}
            >
                <option value="Masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="unisex">Unisex</option>
            </select>

            <div className={styles.images}>
                <div
                    onDrop={handleDrop}
                    onDragOver={(event) => event.preventDefault()}
                    className={styles.dropZone}
                >
                    <p>Arrastra y suelta una o varias imágenes aquí</p>
                </div>

                {images?.map((image, index) => (
                    <div key={index}>
                        <img src={URL.createObjectURL(image)} alt={`Imagen ${index}`} />
                        <button type="button" onClick={() => removeImage(index)}>x</button>
                    </div>
                ))}

                { formik.errors.imagenes && <div>{formik.errors.imagenes}</div> }
            </div>

            <div className={styles.talles}>
                {
                    talles.map( ( talle, index) => {
                        return (
                            <div key={index}>
                                <span onClick={() => handleStock(talle)}> - </span>
                                <span> {talle} </span>
                                <span onClick={() => handleStock(talle)}> + </span>
                                <span> Cantidad en stock: {formik.values.stock[talle]} </span>
                            </div>
                        )
                    })
                }
            </div>

            <button type='submit'>Submit</button>
        </form>
    )
}

export default CreateForm;