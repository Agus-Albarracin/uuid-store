// Estilos
import styles from './App.module.scss'

// Routers
import { Routes, Route } from 'react-router-dom'

// Componentes
import Nav from './components/Header/Nav/Nav';
import Productos from './components/Productos/Productos'
// Views
import Admin from './Views/Admin/Admin'

//PATHROUTES
import PATHROUTES from './Helpers/path'
import HomePage from './components/HomePage/HomePage';

function App() {

  return (
    <div className={styles.appContainer}>
      <Nav/>

      <Routes>
        <Route path='/productos' element={<Productos />} />
        <Route path={PATHROUTES.LANDING} element={<HomePage />}/>
        <Route path={PATHROUTES.ADMIN} element={<Admin />}/>
      </Routes>
    </div>

  )
}

export default App