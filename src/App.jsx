import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import CreateOficina from './components/oficina/create' 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Oficina from './pages/Oficina' 

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
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App;