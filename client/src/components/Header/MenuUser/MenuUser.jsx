import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../../redux/actions";
import LogIn from "./LogInForm/LogInForm";
import SignIn from "./SignInForm/SignInForm";

const MenuUser = ({ mostrarUser }) => {
  const dispatch = useDispatch();
  const [logInOrSignIn, setLogInOrSignIn] = useState(false);

  const user = useSelector((state) => state.actualUser);

  const handleView = () => {
    setLogInOrSignIn(!logInOrSignIn);
  };

  const handleLogOut = () => {
    dispatch(logOut());
    mostrarUser();
  };

  const handleCloseMenu = () => {
    if (logInOrSignIn) {
      setLogInOrSignIn(false);
      mostrarUser();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={handleCloseMenu}>
      {Object.keys(user).length === 0 ? (
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="bg-white max-w-md p-4 rounded-md mx-auto" onClick={(e) => e.stopPropagation()}>
            {logInOrSignIn ? (
              <LogIn handleView={handleView} mostrarUser={mostrarUser} />
            ) : (
              <SignIn handleView={handleView} mostrarUser={mostrarUser} />
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-md" onClick={(e) => e.stopPropagation()}>
          <div>{`${user.nombre}  ${user.apellido}`}</div>
          <span className="cursor-pointer text-blue-500 mr-4" onClick={handleView}>
            Mi cuenta
          </span>
          <span className="cursor-pointer text-blue-500" onClick={handleLogOut}>
            Salir
          </span>
        </div>
      )}
    </div>
  );
};

export default MenuUser;
