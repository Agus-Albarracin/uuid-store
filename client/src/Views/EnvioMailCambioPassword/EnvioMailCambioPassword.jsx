import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { enviarMailPassword } from "../../redux/actions";

const EnvioMailCambioPassword = () => {
  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [errors, setErrors] = useState({});
  const [envio, setEnvio] = useState(false);

  const validacion = (data) => {
    const regexEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

    let errors = {};
    if (!data) errors = { ...errors, error: "Campo obligatorio" };
    if (data.length > 0 && !regexEmail.test(data))
      errors = {
        ...errors,
        error: "Email no válido",
      };
    return errors;
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setErrors(validacion(value));
  };

  useEffect(() => {
    window.localStorage.setItem("recoveryToken", JSON.stringify(token));
  }, [token]);

  const handleSendMail = async (event) => {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      dispatch(enviarMailPassword(email));
      setEnvio(true);
      setEmail("");
    }
  };

  const handleToHome = () => {
    navigate("/");
  };

  return (
    <div
      style={{ backgroundColor: "#d9d9d9" }}
      className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md transition-opacity transform duration-500"
    >
      {envio === false ? (
        <>
          <div className="text-2xl font-bold mb-6 text-gray-600">
            RECUPERAR CONTRASEÑA
          </div>
          <div className="text-1xl font-bold mb-6 text-gray-600">
            Ingresá tu mail para que te enviemos un correo para que puedas crear
            una nueva contraseña
          </div>
          <div>
            <form className="flex flex-col space-y-4">
              <label className="text-gray-600 block font-semibold">
                Email:{" "}
              </label>
              <input
                type="text"
                placeholder="Ej: nombre@email.com"
                value={email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1 text-black"
              />
              {errors.error && (
                <span className="text-red-500">{errors.error}</span>
              )}
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleSendMail}
              >
                Enviar correo
              </button>
            </form>
          </div>
        </>
      ) : (
        <>
          <h1>El correo fue enviado con éxito</h1>
          <button onClick={handleToHome}>volver al home</button>
        </>
      )}
    </div>
  );
};

export default EnvioMailCambioPassword;
