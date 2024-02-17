// Estilos
import styles from './App.module.scss'

// Routers
import { Routes, Route } from 'react-router-dom'

// Componentes
import Nav from './components/Header/Nav/Nav';
import Productos from './components/Productos/Productos'
import Detail from "./components/Detail/Detail";
// Views
import Admin from './Views/Admin/Admin'

//PATHROUTES
import PATHROUTES from './Helpers/path'
import HomePage from './components/HomePage/HomePage';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <div className={styles.appContainer}>
      <Nav />

      <Routes>

        <Route path="/productos" element={<Productos />} />
        <Route path={PATHROUTES.ADMIN} element={<Admin />} />
        <Route path="/detail/:id" element={<Detail />} />        
        <Route path={PATHROUTES.LANDING} element={<HomePage />}/>       

      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App