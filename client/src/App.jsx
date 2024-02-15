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
    <div>
      <Nav/>

      <Routes>
        <Route path={PATHROUTES.ADMIN} element={<Admin />}/>
      </Routes>
    </div>

  )
}

export default App