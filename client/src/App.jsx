//Routers
import { Routes, Route } from 'react-router-dom'
//comps
import Autenticador from './Helpers/Auntenticador'
//PATHROUTES
import PATHROUTES from './Helpers/path'

function App() {

  return (
    <Routes>
      <Route path={PATHROUTES.LANDING} element={<Autenticador />}/>
    </Routes>
  )
}

export default App