import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import UnidadAdmin from "./pages/UnidadAdmin";
import './App.css';

function App() {
  return (
    <div className="app-viewport">
      {/* Elemento superior fijo */}
      <Header />
      
      {/* Contenedor inferior dividido en dos columnas */}
      <div className="app-body">
        <Sidebar />
        <UnidadAdmin />
      </div>
    </div>
  );
}

export default App;