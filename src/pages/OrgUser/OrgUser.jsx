import { useMemo, useState } from 'react';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import './OrgUser.css';

const pageSize = 5;

const emptyOrgUser = {
  type: '',
  id: '',
  name: '',
  readonly: false,
  ckval: '',
  data: '',
  updated: new Date().toISOString().slice(0, 10),
};

const initialUsers = [
  {
    type: 'ADMIN',
    id: 'USR001',
    name: 'Juan Perez',
    readonly: true,
    ckval: 100,
    data: 'Usuario administrador con acceso de solo lectura.',
    updated: '2026-06-27',
  },
  {
    type: 'OPERADOR',
    id: 'USR002',
    name: 'Maria Lopez',
    readonly: false,
    ckval: 225,
    data: 'Operador asignado a la unidad de activos fijos.',
    updated: '2026-06-20',
  },
  {
    type: 'CONSULTA',
    id: 'USR003',
    name: 'Carlos Rojas',
    readonly: true,
    ckval: 58,
    data: 'Perfil de consulta para reportes institucionales.',
    updated: '2026-06-18',
  },
  {
    type: 'TECNICO',
    id: 'USR004',
    name: 'Ana Vargas',
    readonly: false,
    ckval: 310,
    data: 'Usuario tecnico para mantenimiento de catalogos.',
    updated: '2026-06-15',
  },
  {
    type: 'AUDITOR',
    id: 'USR005',
    name: 'Luis Salazar',
    readonly: true,
    ckval: 44,
    data: 'Acceso de auditoria sobre registros historicos.',
    updated: '2026-06-10',
  },
  {
    type: 'AUXILIAR',
    id: 'USR006',
    name: 'Sofia Mendez',
    readonly: false,
    ckval: 91,
    data: 'Apoyo operativo para registro y verificacion.',
    updated: '2026-06-05',
  },
];

function OrgUser() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [formMode, setFormMode] = useState(null);
  const [formData, setFormData] = useState(emptyOrgUser);
  const [message, setMessage] = useState('');

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return users;

    return users.filter((user) => (
      user.type.toLowerCase().includes(query) ||
      user.id.toLowerCase().includes(query) ||
      user.name.toLowerCase().includes(query)
    ));
  }, [search, users]);

  const pageCount = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const openNewForm = () => {
    setFormMode('create');
    setFormData(emptyOrgUser);
    setMessage('');
  };

  const openEditForm = (user) => {
    setFormMode('edit');
    setFormData(user);
    setMessage('');
  };

  const openDetail = (user) => {
    setFormMode('view');
    setFormData(user);
    setMessage('');
  };

  const closeForm = () => {
    setFormMode(null);
    setFormData(emptyOrgUser);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedUser = {
      ...formData,
      type: formData.type.trim().toUpperCase(),
      id: formData.id.trim().toUpperCase(),
      name: formData.name.trim(),
      ckval: Number(formData.ckval || 0),
    };

    if (formMode === 'edit') {
      setUsers((currentUsers) => currentUsers.map((user) => (
        user.id === normalizedUser.id ? normalizedUser : user
      )));
      setMessage('Registro OrgUser actualizado correctamente.');
    } else {
      setUsers((currentUsers) => [normalizedUser, ...currentUsers]);
      setMessage('Registro OrgUser creado correctamente.');
    }

    closeForm();
    setPage(1);
  };

  const handleDelete = (userToDelete) => {
    const confirmed = window.confirm(`Eliminar el registro ${userToDelete.id}?`);

    if (!confirmed) return;

    setUsers((currentUsers) => currentUsers.filter((user) => user.id !== userToDelete.id));
    setMessage('Registro OrgUser eliminado correctamente.');
    setPage(1);
  };

  return (
    <main className="org-user-page">
      <header className="org-user-header">
        <div>
          <h2>Gestion de Usuarios</h2>
        </div>
        <button className="org-user-primary-btn" type="button" onClick={openNewForm}>
          Nuevo Usuario
        </button>
      </header>

      <section className="org-user-toolbar">
        <SearchBar value={search} onChange={handleSearch} />
      </section>

      {message && <div className="org-user-alert success">{message}</div>}

      {formMode && (
        <UserForm
          formData={formData}
          mode={formMode}
          onCancel={closeForm}
          onChange={setFormData}
          onSubmit={handleSubmit}
        />
      )}

      <section className="org-user-table-panel">
        <UserTable
          users={paginatedUsers}
          onDelete={handleDelete}
          onEdit={openEditForm}
          onView={openDetail}
        />
        <Pagination
          page={currentPage}
          pageCount={pageCount}
          total={filteredUsers.length}
          onPageChange={setPage}
        />
      </section>
    </main>
  );
}

export default OrgUser;
