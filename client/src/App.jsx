// Estilos
import styles from "./App.module.scss";

// Routers
import { Routes, Route } from "react-router-dom";

// Componentes
import Nav from "./components/Header/Nav/Nav";
import Footer from "./components/Footer/Footer";

// Views
import Admin from "./Views/Admin/Admin";
import Detail from "./Views/Detail/Detail";
import HomePage from "./Views/HomePage/HomePage";
import Productos from "./Views/Productos/Productos";

//PATHROUTES
import PATHROUTES from "./Helpers/path";

// ADRI: IGNORAR ESTOY HACIENDO PRUEBAS
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import LogIn from "./components/Header/MenuUser/LogInForm/LogInForm";
import { clearMessage } from "./redux/actions";

function App() {
  // const user = useSelector((state) => state.actualUser);
  // const isLoged = JSON.parser(localStorage.getItem("user"));
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (isLoged) {
  //     dispatch()
  //   }
  // }, []);

  const message = useSelector(state => state.messageToUser)

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearMessage());
    }, 5000)
  }, [message])

  return (
    <div className={styles.appContainer}>
      <Nav />

      <Routes>
        <Route path={PATHROUTES.ADMIN} element={<Admin />} />
        <Route path={PATHROUTES.DETAIL} element={<Detail />} />
        <Route path={PATHROUTES.HOME} element={<HomePage />} />
        <Route path={PATHROUTES.PRODUCTOS} element={<Productos />} />
      </Routes>

      { message && <span className={styles.message}> { message } </span> }

      <Footer />
    </div>
  );
}

export default App;
