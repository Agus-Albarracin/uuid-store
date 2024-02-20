import { useFormik } from 'formik';
import styles from './LogInForm.module.scss'
import Autenticador from '../../../../Helpers/Auntenticador';


const LogIn = ({ handleView }) => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values) => {console.log(values)}
    })

    return (
        <div className={styles.logIn}>
            <div>INICIA SESIÓN EN UUID STORE</div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email"> Ingrese su mail </label>
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

                <div>
                    <span>O continúa con:</span>
                    <Autenticador />
                </div>

                <div className={styles.side}>
                    <span>¿Eres nuevo?</span>
                    <span onClick={handleView}>¡Crea tu cuenta gratis!</span>
                </div>
                <div className={styles.buttons}>
                    <span>Cancelar</span>
                    <button type='submit'>Iniciar sesion</button>
                </div>
            </form>
        </div>
    )
}

export default LogIn;