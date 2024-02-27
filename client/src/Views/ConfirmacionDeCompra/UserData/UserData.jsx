import { useFormik } from 'formik';
import validate from "./validate";

const UserData = () => {

    const userJSON = window.localStorage.getItem('loggedUser');
    const user = JSON.parse(userJSON);

    const formik = useFormik({
        initialValues: {
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            dni: user.dni ? user.dni : "",
            telefono: user.telefono ? user.telefono : "",
        },
        validate,
        onSubmit: (values) => console.log(values)
    })

    return (
        <form>
            <h2>TUS DATOS PERSONALES</h2>

            <label htmlFor="nombre"> Nombre </label>
            <input 
                id="nombre"
                name="nombre"
                type="text" 
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.onBlur}
            />

            <label htmlFor="apellido"> Apellido </label>
            <input 
                id="apellido"
                name="apellido"
                type="text" 
                value={formik.values.apellido}
                onChange={formik.handleChange}
                onBlur={formik.onBlur}
            />

            <label htmlFor="email"> Email </label>
            <input 
                id="email"
                name="email"
                type="text" 
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.onBlur}
            />

            <label htmlFor="dni"> DNI </label>
            <input 
                id="dni"
                name="dni"
                type="text" 
                value={formik.values.dni}
                onChange={formik.handleChange}
                onBlur={formik.onBlur}
            />

            <label htmlFor="telefono"> Telefono </label>
            <input 
                id="telefono"
                name="telefono"
                type="text" 
                value={formik.values.telefono}
                onChange={formik.handleChange}
                onBlur={formik.onBlur}
            />

            <button type="submit">Enviar</button>
        </form>
    )
};

export default UserData;