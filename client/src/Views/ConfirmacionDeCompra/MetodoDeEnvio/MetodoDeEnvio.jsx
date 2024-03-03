import { useFormik } from "formik";

const MetodoDeEnvio = ({ userBuyData, setUserBuyData, setView }) => {
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
      metodoDeEnvio: actualForm.metodoDeEnvio ? actualForm.metodoDeEnvio : "",
    },
    onSubmit: (values) => handleSubmitAndView(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="oca">
        <input
          type="radio"
          name="metodoDeEnvio"
          id="oca"
          value="OCA"
          onChange={formik.handleChange}
          checked={formik.values.metodoDeEnvio === "OCA"}
        />
        Oca
      </label>

      <label htmlFor="correoArgentino">
        <input
          type="radio"
          name="metodoDeEnvio"
          id="correoArgentino"
          value="Correo Argentino"
          onChange={formik.handleChange}
          checked={formik.values.metodoDeEnvio === "Correo Argentino"}
        />
        Correo Argentino
      </label>

      <button type="submit"> Confirmar </button>
    </form>
  );
};

export default MetodoDeEnvio;
