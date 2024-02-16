// Estilos
import styles from './App.module.scss'

// Routers
import { Routes, Route } from 'react-router-dom'

// Componentes
import Nav from './components/Header/Nav/Nav'

// Views
import Admin from './Views/Admin/Admin'

//PATHROUTES
import PATHROUTES from './Helpers/path'

function App() {

  return (
    <div className={styles.appContainer}>
      <Nav/>

      <Routes>
        <Route path={PATHROUTES.ADMIN} element={<Admin />}/>
      </Routes>
    </div>

  )
}

export default App