import { useFormik } from "formik";
import validate from "./validate";

const DireccionDeEnvio = ({ userBuyData, setUserBuyData, setView }) => {
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
      provincia: actualForm.provincia
        ? actualForm.provincia
        : user.provincia
        ? user.provincia
        : "",
      localidad: actualForm.localidad
        ? actualForm.localidad
        : user.localidad
        ? user.localidad
        : "",
      direccion: actualForm.direccion
        ? actualForm.direccion
        : user.direccion
        ? user.direccion
        : "",
      codigoPostal: actualForm.codigoPostal
        ? actualForm.codigoPostal
        : user.codigoPostal
        ? user.codigoPostal
        : "",
    },
    validate,
    onSubmit: (values) => handleSubmitAndView(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="direccion"> Direccion de entrega </label>
      <input
        type="text"
        id="direccion"
        name="direccion"
        value={formik.values.direccion}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.direccion && formik.errors.direccion && (
        <span> {formik.errors.direccion} </span>
      )}

      <label htmlFor="localidad"> Localidad </label>
      <input
        type="text"
        id="localidad"
        name="localidad"
        value={formik.values.localidad}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      {formik.touched.localidad && formik.errors.localidad && (
        <span> {formik.errors.localidad} </span>
      )}

      <label htmlFor="provincia"> Provincia </label>
      <input
        type="text"
        id="provincia"
        name="provincia"
        value={formik.values.provincia}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      {formik.touched.provincia && formik.errors.provincia && (
        <span> {formik.errors.provincia} </span>
      )}

      <label htmlFor="codigoPostal"> Código postal </label>
      <input
        type="text"
        id="codigoPostal"
        name="codigoPostal"
        value={formik.values.codigoPostal}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      {formik.touched.codigoPostal && formik.errors.codigoPostal && (
        <span> {formik.errors.codigoPostal} </span>
      )}

      <button type="submit"> Continuar </button>
    </form>
  );
};

export default DireccionDeEnvio;
