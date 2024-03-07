import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cambiarPassword } from "../../redux/actions";

const CambioDePassword = () => {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.actualUser);
  const dispatch = useDispatch();
  console.log(token);

  const [newPassword, setNewPassword] = useState({});
  // const [errors, setErrors] = useState({});

  // const validacion = (data) => {
  //   let errors = {};

  //   if (data.newPassword && data.newPassword.length < 6) {
  //     errors = {
  //       ...errors,
  //       errorP1: "La contraseña debe tener mínimo 6 carcteres",
  //     };
  //   }
  //   if (data.repeatNewPassword && data.repeatNewPassword.length < 6) {
  //     errors = {
  //       ...errors,
  //       errorP2: "La contraseña debe tener mínimo 6 carcteres",
  //     };
  //   }
  //   if (data.newPassword.length > 6 && data.repeatNewPassword.length > 6) {
  //     if (data.newPassword !== data.repeatNewPassword) {
  //       errors = { ...errors, error: "Las contraseñas no coinciden" };
  //     }
  //   }

  //   return errors;
  // };

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    const objeto = { [property]: value };

    setNewPassword({ ...newPassword, [property]: value });
    console.log(user);
    console.log(token);
  };

  const confirmarCambio = () => {
    dispatch(cambiarPassword(token, newPassword));
  };

  return (
    <div>
      <h1>Introduce tu nueva contraseña</h1>
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
    </div>
  );
};

export default CambioDePassword;
