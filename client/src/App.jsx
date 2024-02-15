//Routers
import { Routes, Route } from 'react-router-dom'
//comps
import Autenticador from './Helpers/Auntenticador'
import Nav from './components/Nav/Nav'

//PATHROUTES
import PATHROUTES from './Helpers/path'

function App() {

  return (
    <div>
      <Nav/>

      {/* <Routes>
        <Route path={PATHROUTES.LANDING} element={<Autenticador />}/>
      </Routes> */}
    </div>

  )
}

export default App