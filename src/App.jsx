import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import CreateOficina from './components/oficina/create'
import CreatePassword from './components/password/create'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Oficina from './pages/Oficina'
import Password from './pages/Password'

function App() {
  return (
    <BrowserRouter>
      <Header />
      
      <div className="app-layout">
        <Sidebar />

        <main className="main-content">
          <Routes>
            {/* Pantalla de inicio del VSAIF */}
            <Route path="/" element={<Home />} />
            
            {/* Rutas Oficiales de tu proyecto: Oficina */}
            <Route path="/oficina" element={<Oficina />} />
            <Route path="/oficina/create" element={<CreateOficina />} />

            {/* Rutas Control de Contraseñas */}
            <Route path="/contrasenas" element={<Password />} />
            <Route path="/contrasenas/create" element={<CreatePassword />} />
            <Route path="/contrasenas/edit/:id" element={<CreatePassword />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App;