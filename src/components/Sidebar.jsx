import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
const menuOptions = [
    { name: "Oficinas", path: "/oficina" },
    { name: "Unidades Administrativas", path: "/unidades" },
    { name: "Organismos Financiadores", path: "/organismos" },
    { name: "Objetos de Gasto", path: "/gastos" },
    { name: "Control de Contraseñas", path: "/contrasenas" },
    { name: "Gestión de Usuarios", path: "/usuarios" }
  ];

  return (
    <aside className="sidebar-menu">
      <h3>MENU PRINCIPAL</h3>
      <div className="menu-buttons">
        {menuOptions.map((option, index) => (
          <Link 
            key={index} 
            to={option.path} 
            className="menu-btn"
            style={{ textDecoration: 'none', display: 'block' }}
          >
            {option.name}
          </Link>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;