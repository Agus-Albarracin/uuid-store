import { useFormik } from "formik";
import { validate } from "./validate";
import styles from "./SignInForm.module.scss";
import Autenticador from "../../../../Helpers/Auntenticador";
import { signUp } from "../../../../redux/actions";
import { useDispatch } from "react-redux";

const SignIn = ({ handleView }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      rPassword: "",
    },
    validate,
    onSubmit: (values) => {
      dispatch(signUp(values));
    },
  });

  return (
    <div className={styles.logIn}>
      <div>REGISTRARSE EN UUID STORE</div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="nombre"> Nombre </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.nombre}
          onBlur={formik.handleBlur}
        />
        {formik.touched.nombre && formik.errors.nombre && (
          <span> {formik.errors.nombre} </span>
        )}

        <label htmlFor="apellido"> Apellido </label>
        <input
          id="apellido"
          name="apellido"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.apellido}
          onBlur={formik.handleBlur}
        />
        {formik.touched.apellido && formik.errors.apellido && (
          <span> {formik.errors.apellido} </span>
        )}

        <label htmlFor="email"> Email</label>
        <input
          id="email"
          name="email"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <span> {formik.errors.email} </span>
        )}

        <label htmlFor="password"> Contraseña </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <span> {formik.errors.password} </span>
        )}

        <label htmlFor="rPassword"> Repetir contraseña </label>
        <input
          id="rPassword"
          name="rPassword"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.rPassword}
          onBlur={formik.handleBlur}
        />
        {formik.touched.rPassword && formik.errors.rPassword && (
          <span> {formik.errors.rPassword} </span>
        )}

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
          <button type="submit"> Registrar </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
