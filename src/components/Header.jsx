import './Header.css';

function Header() {
  return (
    <header className="system-header">
      <div className="header-left">
        {/* Espacio para la bandera tricolor */}
        <div className="flag-logo"></div>
        <div className="system-titles">
          <h1>V.S.I.A.F</h1>
          <h2>Sistema de Activos Fijos</h2>
        </div>
      </div>
      <div className="header-right">
        <p><strong>USUARIO:</strong> admin</p>
        <p><strong>BACKUPS:</strong> None</p>
        <p><strong>FECHA:</strong> 17/6/2026 | <strong>HORA:</strong> 5:49:04 p. m.</p>
      </div>
    </header>
  );
}

export default Header;
