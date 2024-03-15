import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cambiarPassword } from "../../redux/actions";

const CambioDePassword = () => {
  const tokenStorage = localStorage.getItem("recoveryToken") || "";
  const token = JSON.parse(tokenStorage);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState({});
  const [errors, setErrors] = useState({});
  const [confirm, setConfirm] = useState(false);

  const validacion = (data) => {
    let errors = {};

    if (data.newPassword.length < 6) {
      errors.error = "La contraseña debe tener mínimo 6 caracteres.";
    }

    if (data.newPassword !== data.repeatNewPassword) {
      errors.error2 = "Las contraseñas no coinciden.";
    }

    return errors;
  };

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    const objeto = { ...newPassword, [property]: value };

    setNewPassword({ ...newPassword, [property]: value });
    setErrors(validacion(objeto));
  };

  const confirmarCambio = (event) => {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      dispatch(cambiarPassword(token, newPassword));
      setNewPassword({ newPassword: "", repeatNewPassword: "" });
      setConfirm(true);
    }
  };

  const handleToHome = () => {
    navigate("/");
  };

  return (
    <div>
      {confirm === false ? (
        <>
          <h1>Introduce tu nueva contraseña</h1>
          {errors.error && <h1>{errors.error}</h1>}
          {!errors.error ? <h1>{errors.error2}</h1> : false}
          <form>
            <label>Nueva contraseña</label>
            <input
              type="text"
              name="newPassword"
              value={newPassword.newPassword}
              onChange={handleChange}
            />
            <label>Repetir contraseña</label>
            <input
              type="text"
              name="repeatNewPassword"
              value={newPassword.repeatNewPassword}
              onChange={handleChange}
            />
            <button onClick={confirmarCambio}>confirmar</button>
          </form>
        </>
      ) : (
        <>
          <h1>El cambio se realizó con éxito</h1>
          <button onClick={handleToHome}>volver al home</button>
        </>
      )}
    </div>
  );
};

export default CambioDePassword;
