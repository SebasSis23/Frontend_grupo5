import { useCallback, useEffect, useMemo, useState } from 'react';
import { orgUserService } from '../../services/orgUserService';
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

function OrgUser() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [formMode, setFormMode] = useState(null);
  const [formData, setFormData] = useState(emptyOrgUser);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

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

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const data = await orgUserService.getAll();
      setUsers(data);
    } catch {
      setError('No se pudo cargar OrgUser desde el backend.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(loadUsers, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadUsers]);

  const openNewForm = () => {
    setFormMode('create');
    setFormData(emptyOrgUser);
    setMessage('');
    setError('');
  };

  const openEditForm = (user) => {
    setFormMode('edit');
    setFormData(user);
    setMessage('');
    setError('');
  };

  const openDetail = (user) => {
    setFormMode('view');
    setFormData(user);
    setMessage('');
    setError('');
  };

  const closeForm = () => {
    setFormMode(null);
    setFormData(emptyOrgUser);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    const normalizedUser = {
      ...formData,
      type: formData.type.trim().toUpperCase(),
      id: formData.id.trim().toUpperCase(),
      name: formData.name.trim(),
      ckval: Number(formData.ckval || 0),
    };

    try {
      if (formMode === 'edit') {
        await orgUserService.update(normalizedUser.id, normalizedUser);
        setMessage('Registro OrgUser actualizado correctamente.');
      } else {
        await orgUserService.create(normalizedUser);
        setMessage('Registro OrgUser creado correctamente.');
      }

      closeForm();
      setPage(1);
      await loadUsers();
    } catch {
      setError('No se pudo guardar el registro OrgUser.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (userToDelete) => {
    const confirmed = window.confirm(`Eliminar el registro ${userToDelete.id}?`);

    if (!confirmed) return;

    setError('');

    try {
      await orgUserService.remove(userToDelete.id);
      setMessage('Registro OrgUser eliminado correctamente.');
      setPage(1);
      await loadUsers();
    } catch {
      setError('No se pudo eliminar el registro OrgUser.');
    }
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
      {error && <div className="org-user-alert error">{error}</div>}

      {formMode && (
        <UserForm
          formData={formData}
          mode={formMode}
          saving={saving}
          onCancel={closeForm}
          onChange={setFormData}
          onSubmit={handleSubmit}
        />
      )}

      <section className="org-user-table-panel">
        <UserTable
          loading={loading}
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
