// Routers
import { Routes, Route } from 'react-router-dom'

// Componentes
import Nav from './components/Header/Nav/Nav'
import HomePage from './components/HomePage/HomePage'

// Views
import Admin from './Views/Admin/Admin'

//PATHROUTES
import PATHROUTES from './Helpers/path'


function App() {

  return (
    <div>
      <Nav/>

      <Routes>
        <Route path={PATHROUTES.ADMIN} element={<Admin />}/>
        <Route path={PATHROUTES.LANDING} element={<HomePage />}/>
      </Routes>
    </div>

  )
}

export default App