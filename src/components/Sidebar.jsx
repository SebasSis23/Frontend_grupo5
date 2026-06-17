import React from 'react';
import './Sidebar.css';

function Sidebar() {
  // Las 6 opciones del menú correspondientes a tus 6 tablas exactas
  const menuOptions = [
    "Oficinas",                  
    "Unidades Administrativas",  
    "Organismos Financiadores",  
    "Objetos de Gasto",          
    "Control de Contraseñas",    
    "Gestión de Usuarios"        
  ];

  return (
    <aside className="sidebar-menu">
      <h3>MENU PRINCIPAL</h3>
      <div className="menu-buttons">
        {menuOptions.map((option, index) => (
          <button key={index} className="menu-btn">
            {option}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;