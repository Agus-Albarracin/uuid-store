// Estilos
import styles from './App.module.scss'

// Routers
import { Routes, Route } from 'react-router-dom'

// Componentes
import Nav from './components/Header/Nav/Nav';
import Footer from './components/Footer/Footer';

// Views
import Admin from './Views/Admin/Admin'
import Detail from "./Views/Detail/Detail";
import HomePage from './Views/HomePage/HomePage';
import Productos from './Views/Productos/Productos'

//PATHROUTES
import PATHROUTES from './Helpers/path'

function App() {

  return (
    <div className={styles.appContainer}>
      <Nav />

      <Routes>

        <Route path={PATHROUTES.ADMIN} element={<Admin />} />
        <Route path={PATHROUTES.DETAIL} element={<Detail />} />        
        <Route path={PATHROUTES.HOME} element={<HomePage />}/>       
        <Route path={PATHROUTES.PRODUCTOS} element={<Productos />} />

      </Routes>

      <Footer/>
    </div>
  );
}

export default App