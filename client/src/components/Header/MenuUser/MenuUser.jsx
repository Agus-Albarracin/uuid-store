import styles from "./MenuUser.module.scss";

import { useState } from "react";
import { useSelector } from "react-redux";

import LogIn from "./LogInForm/LogInForm";
import SignIn from "./SignInForm/SignInForm";

import { logOut } from "../../../redux/actions";
import { useDispatch } from "react-redux";

const MenuUser = ({ mostrarUser }) => {
  const dispatch = useDispatch();
  const [logInOrSignIn, setLogInOrSignIn] = useState(false);

  const user = useSelector((state) => state.actualUser);

  const handleView = () => {
    setLogInOrSignIn(!logInOrSignIn);
  };

  return (
    <div className={styles.viewContainer}>
      {Object.keys(user).length === 0 ? (
        <div>
          <div className={styles.fondo} onClick={mostrarUser}></div>
          <div className={styles.menuContainer}>
            {logInOrSignIn ? (
              <LogIn handleView={handleView} />
            ) : (
              <SignIn handleView={handleView} />
            )}
          </div>
        </div>
      ) : (
        <div>
          {`${user.nombre}  ${user.apellido}`}
          <span> Mi cuenta </span>
          <span onClick={() => dispatch(logOut())}> Salir </span>
        </div>
      )}
    </div>
  );
};

export default MenuUser;
