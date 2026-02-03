import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Dashboard from './pages/Dashboard'
import Productos from './pages/Productos'
import Entradas from './pages/Entradas'
import Salidas from './pages/Salidas'
import Caducidad from './pages/Caducidad'

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/entradas" element={<Entradas />} />
          <Route path="/salidas" element={<Salidas />} />
          <Route path="/caducidad" element={<Caducidad />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App
