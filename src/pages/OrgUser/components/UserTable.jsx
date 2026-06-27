function UserTable({ users, loading, onEdit, onDelete, onView }) {
  return (
    <div className="org-user-table-wrap">
      <table className="org-user-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>ID</th>
            <th>Name</th>
            <th>Read Only</th>
            <th>Numero de Control</th>
            <th>Updated</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td className="org-user-empty" colSpan="7">
                Cargando usuarios...
              </td>
            </tr>
          )}

          {!loading && users.length === 0 && (
            <tr>
              <td className="org-user-empty" colSpan="7">
                No se encontraron usuarios.
              </td>
            </tr>
          )}

          {!loading && users.map((user) => (
            <tr key={user.id}>
              <td>{user.type}</td>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <span className={`org-user-status ${user.readonly ? 'readonly' : 'editable'}`}>
                  {user.readonly ? 'Si' : 'No'}
                </span>
              </td>
              <td>{user.ckval}</td>
              <td>{user.updated}</td>
              <td>
                <div className="org-user-actions">
                  <button className="org-user-icon-btn" type="button" onClick={() => onView(user)} title="Ver detalles">
                    Ver
                  </button>
                  <button className="org-user-icon-btn" type="button" onClick={() => onEdit(user)} title="Editar">
                    Editar
                  </button>
                  <button className="org-user-danger-btn" type="button" onClick={() => onDelete(user)} title="Eliminar">
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
