import { useFormik } from 'formik';
import { validate } from './validate';
import styles from './SignForm.module.scss';
import Autenticador from '../../../../Helpers/Auntenticador';

const SignIn = ({ handleView }) => {

    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            email: '',
            password: '',
            rPassword: '',
        },
        validate,
        onSubmit: (values) => {console.log(values)}
    })

    return (
        <div className={styles.logIn}>
            <div>REGISTRARSE EN UUID STORE</div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="nombre"> Nombre </label>
                <input 
                    id='nombre'
                    name='nombre'
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.nombre} 
                />

                <label htmlFor="apellido"> Apellido </label>
                <input 
                    id='apellido'
                    name='apellido'
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.apellido} 
                />

                <label htmlFor="email"> Email</label>
                <input 
                    id='email'
                    name='email'
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.email} 
                />
                
                <label htmlFor="password"> Contraseña </label>
                <input 
                    id='password'
                    name='password'
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password} 
                />

                <label htmlFor="repetirPassword"> Repetir contraseña </label>
                <input 
                    id='rpassword'
                    name='rpassword'
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.repetirPassword} 
                />

                <hr />

                <div>
                    <span>O continúa con:</span>
                    <Autenticador />
                </div>

                <div className={styles.side}>
                    <span>¿Ya tenés cuenta?</span>
                    <span onClick={handleView}>¡Inicia sesión!</span>
                </div>

                <div className={styles.buttons}>
                    <span>Cancelar</span>
                    <button type='submit'> Registrar </button>
                </div>
            </form>
        </div>
    )
}

export default SignIn;