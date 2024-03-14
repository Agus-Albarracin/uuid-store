import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { enviarMailPassword } from "../../redux/actions";

const EnvioMailCambioPassword = () => {
  // axios.defaults.baseURL = "https://uuid-store-production.up.railway.app";
  axios.defaults.baseURL = "http://localhost:3001";
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
    <div>
      {envio === false ? (
        <>
          <h1>RECUPERAR CONTRASEÑA</h1>
          <h2>
            Ingresá tu mail para que te enviemos un correo para que puedas crear
            una nueva contraseña
          </h2>
          <div>
            <form>
              <label>Email: </label>
              <input
                type="text"
                placeholder="Ej: nombre@email.com"
                value={email}
                onChange={handleChange}
              />
              <button onClick={handleSendMail}>Enviar correo</button>
              {errors.error && <span>{errors.error}</span>}
            </form>
          </div>
        </>
      ) : (
        <>
          <h1>El corro fue enviado con éxito</h1>
          <button onClick={handleToHome}>volver al home</button>
        </>
      )}
    </div>
  );
};

export default EnvioMailCambioPassword;
