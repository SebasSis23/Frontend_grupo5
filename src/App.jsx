import { BrowserRouter, Routes, Route } from "react-router-dom";


import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

import BloqueSeleccion from './components/BloqueSeleccion'; 

import Home from './pages/Home';

import UnidadAdmin from "./pages/UnidadAdmin";
import CreateUnidadAdmin from "./components/unidadadmin/create";

import './App.css';

function App() {
  return (
   <BrowserRouter>
    <div className="app-viewport">
      {/* Elemento superior fijo */}
      <Header />
      
      {/* Contenedor inferior dividido en dos columnas */}
      <div className="app-body">
        <Sidebar />
        {/* Columna Derecha */}
        <div className="app-content-wrapper">
          
          {/* Bloque de Entidad y Unidad fijo arriba */}
          <BloqueSeleccion />

          {/* Espacio dinámico para las pantallas del sistema */}
          <main className="app-main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/unidadadmin" element={<UnidadAdmin />} />
              <Route path="/unidadadmin/create" element={<CreateUnidadAdmin />} />
            </Routes>
          </main>
          
        </div>
      </div>
    </div>
   </BrowserRouter> 
  );
}

export default App;