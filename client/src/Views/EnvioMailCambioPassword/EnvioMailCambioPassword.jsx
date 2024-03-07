import { useState } from "react";
import { useDispatch } from "react-redux";
import { enviarMailPassword } from "../../redux/actions";

const EnvioMailCambioPassword = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(null);
  const [errors, setErrors] = useState({});

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

  const handleSendMail = () => {
    //crear un dispatch que guarde el token en actualUser, en la propiedad recoveryToken. Tiene que hacer un post en la ruta recovery y mandar el mail
    dispatch(enviarMailPassword(email));
  };

  return (
    <div>
      <h1>RECUPERAR CONTRASEÑA</h1>
      <h2>
        Ingresá tu mail para que te enviemos un correo para que puedas crear una
        nueva contraseña
      </h2>
      <label>Email: </label>
      <input
        type="text"
        placeholder="Ej: nombre@email.com"
        value={email}
        onChange={handleChange}
      />
      <button onClick={handleSendMail}>Enviar correo</button>
      {errors.error && <span>{errors.error}</span>}
    </div>
  );
};

export default EnvioMailCambioPassword;
