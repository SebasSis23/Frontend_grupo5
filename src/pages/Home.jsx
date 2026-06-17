import React from 'react';
import './Home.css';
// Apuntamos al nuevo nombre y extensión de tu imagen
import imagenFondo from '../assets/logo.jpeg'; 

function Home() {
  return (
    <div className="home-content">
      {/* Barra Informativa superior */}
      <div className="institution-info-bar">
        <p><strong>ENTIDAD:</strong> 821 - Administración Autónoma para Obras Sanitarias - Potosí</p>
        <p><strong>UNIDAD:</strong> UA01 - Unidad de Activos Fijos</p>
      </div>

      {/* Área del contenedor central */}
      <div className="center-workspace">
        <div className="illustration-container">
          {/* Aquí se inyecta tu logo de fondo */}
          <img src={imagenFondo} alt="Banner Sistema" className="banner-image" />
          
          <div className="banner-tagline">
            <span>DISEÑO</span>
            <span>UI/UX</span>
            <span>COFFEE & CODE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;