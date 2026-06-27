import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  // Estructuramos las opciones con sus rutas correspondientes
  // Deja las otras rutas vacías o con "/" por ahora hasta que crees sus componentes
  const menuOptions = [
    { name: "Oficinas", path: "/oficinas" },                  
    { name: "Unidades Administrativas", path: "/unidadadmin" },  
    { name: "Organismos Financiadores", path: "/organismos" },  
    { name: "Objetos de Gasto", path: "/objetos" },          
    { name: "Control de Contraseñas", path: "/password-control" },    
    { name: "Gestión de Usuarios", path: "/usuarios" }        
  ];

  // Esto nos ayuda a saber en qué página estamos parados actualmente
  const location = useLocation();

  return (
    <aside className="sidebar-menu">
      <h3>MENU PRINCIPAL</h3>
      <div className="menu-buttons">
        {menuOptions.map((option, index) => {
          // Validamos si la ruta de este botón coincide con la URL actual para darle un estilo activo si lo deseas
          const isActive = location.pathname === option.path;

          return (
            <Link 
              key={index} 
              to={option.path} 
              className={`menu-btn-link ${isActive ? 'active' : ''}`}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <button className="menu-btn" style={{ width: '100%', cursor: 'pointer' }}>
                {option.name}
              </button>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;