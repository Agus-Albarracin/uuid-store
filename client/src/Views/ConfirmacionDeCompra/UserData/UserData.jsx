import { useFormik } from "formik";
import validate from "./validate";

const UserData = ({ userBuyData, setUserBuyData, setView }) => {
  const userJSON = window.localStorage.getItem("loggedUser");
  const user = JSON.parse(userJSON);

  const actualFormJSON = window.localStorage.getItem("actualForm");
  const actualForm = JSON.parse(actualFormJSON);

  const handleSubmitAndView = (values) => {
    setUserBuyData((actualState) => {
      return { ...actualState, ...values };
    });

    window.localStorage.setItem(
      "actualForm",
      JSON.stringify({ ...userBuyData, ...values })
    );

    setView((actualView) => actualView + 1);
  };

  const formik = useFormik({
    initialValues: {
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      dni: user.dni ? user.dni : actualForm ? actualForm.dni : "",
      telefono: user.telefono ? user.telefono : actualForm ? actualForm.telefono : "",
    },
    validate,
    onSubmit: (values) => handleSubmitAndView(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
      {formik.errors.nombre && <span> {formik.errors.nombre} </span>}

      <label htmlFor="apellido"> Apellido </label>
      <input
        id="apellido"
        name="apellido"
        type="text"
        value={formik.values.apellido}
        onChange={formik.handleChange}
        onBlur={formik.onBlur}
      />
      {formik.errors.apellido && <span> {formik.errors.apellido} </span>}

      <label htmlFor="email"> Email </label>
      <input
        id="email"
        name="email"
        type="text"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.onBlur}
      />
      {formik.errors.email && <span> {formik.errors.email} </span>}

      <label htmlFor="dni"> DNI </label>
      <input
        id="dni"
        name="dni"
        type="text"
        value={formik.values.dni}
        onChange={formik.handleChange}
        onBlur={formik.onBlur}
      />
      {formik.errors.dni && <span> {formik.errors.dni} </span>}

      <label htmlFor="telefono"> Telefono </label>
      <input
        id="telefono"
        name="telefono"
        type="text"
        value={formik.values.telefono}
        onChange={formik.handleChange}
        onBlur={formik.onBlur}
      />
      {formik.errors.telefono && <span> {formik.errors.telefono} </span>}

      <button type="submit"> Continuar </button>
    </form>
  );
};

export default UserData;
