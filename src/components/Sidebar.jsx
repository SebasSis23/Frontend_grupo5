import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const menuOptions = [
    { label: 'Inicio', path: '/' },
    { label: 'Oficinas' },
    { label: 'Unidades Administrativas' },
    { label: 'Organismos Financiadores' },
    { label: 'Objetos de Gasto' },
    { label: 'Control de Contrasenas' },
    { label: 'Gestion de Usuarios', path: '/org-user' },
  ];

  return (
    <aside className="sidebar-menu">
      <h3>MENU PRINCIPAL</h3>
      <div className="menu-buttons">
        {menuOptions.map((option, index) => (
          option.path ? (
            <NavLink
              key={option.label}
              to={option.path}
              className={({ isActive }) => `menu-btn menu-link${isActive ? ' active' : ''}`}
            >
              {option.label}
            </NavLink>
          ) : (
            <button key={index} className="menu-btn" type="button">
              {option.label}
            </button>
          )
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
