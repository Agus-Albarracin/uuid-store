import { useFormik } from "formik";
import validate from './validation.js';

const CreateForm = () => {
    
    const talles = [35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.4, 44, 44.5, 45, 45.5, 46];
    
    const formik = useFormik({
        initialValues: {
            marca: '',
            modelo: '',
            precio: '',
            genero: 'masculino',
            imagenes: []
        },
        validate,
        onSubmit: values => {
            console.log(values);
        }
    });

    return (
        <form onSubmit={formik.handleSubmit} >
            <label htmlFor="marca"> Marca </label>
            <input
                id='marca'
                name='marca'
                type="text"
                onChange={formik.handleChange}
                value={formik.values.marca}
            />
            { formik.errors.marca && <div>error: {formik.errors.marca}</div> }
            
            <label htmlFor="modelo"> Modelo </label>
            <input
                id='modelo'
                name='modelo'
                type="text"
                onChange={formik.handleChange}
                value={formik.values.modelo}
            />
            { formik.errors.modelo && <div>error: {formik.errors.modelo}</div> }
            
            <label htmlFor="precio"> Precio </label>
            <input
                id='precio'
                name='precio'
                type="number"
                onChange={formik.handleChange}
                value={formik.values.precio}
            />
            { formik.errors.precio && <div>error: {formik.errors.precio}</div> }

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

            <button type='submit'>Submit</button>
        </form>
    )
}

export default CreateForm;