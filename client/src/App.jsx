import './App.css'
//Routers
import { Routes, Route, useLocation } from 'react-router-dom'
//hooks
import { useEffect, useState } from 'react'
//comps
import Autenticador from './Helpers/Auntenticador'
//PATHROUTES
import PATHROUTES from './Helpers/path'

function App() {

  return (
<>

<Routes>
<Route path={PATHROUTES.LANDING} element={<Autenticador />}  />
</Routes>
</>
  )
}

export default App