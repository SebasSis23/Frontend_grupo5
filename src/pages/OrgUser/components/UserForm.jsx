function UserForm({ formData, mode, saving, onCancel, onChange, onSubmit }) {
  const isReadonly = mode === 'view';
  const title = mode === 'edit' ? 'Editar Usuario' : mode === 'view' ? 'Detalle Usuario' : 'Nuevo Usuario';

  const updateField = (field, value) => {
    onChange({
      ...formData,
      [field]: value,
    });
  };

  return (
    <form className="org-user-form" onSubmit={onSubmit}>
      <div className="org-user-form-title">
        <h3>{title}</h3>
      </div>

      <div className="org-user-form-grid">
        <label>
          Type
          <input
            maxLength="12"
            readOnly={isReadonly}
            required
            value={formData.type}
            onChange={(event) => updateField('type', event.target.value.toUpperCase())}
          />
        </label>

        <label>
          Identificacion
          <input
            maxLength="12"
            readOnly={isReadonly || mode === 'edit'}
            required
            value={formData.id}
            onChange={(event) => updateField('id', event.target.value.toUpperCase())}
          />
        </label>

        <label>
          Name
          <input
            maxLength="24"
            readOnly={isReadonly}
            required
            value={formData.name}
            onChange={(event) => updateField('name', event.target.value)}
          />
        </label>

        <label>
          Numero de Control
          <input
            max="999999"
            min="0"
            readOnly={isReadonly}
            type="number"
            value={formData.ckval}
            onChange={(event) => updateField('ckval', event.target.value)}
          />
        </label>

        <label>
          Updated
          <input
            readOnly={isReadonly}
            type="date"
            value={formData.updated}
            onChange={(event) => updateField('updated', event.target.value)}
          />
        </label>

        <label className="org-user-check">
          <input
            checked={formData.readonly}
            disabled={isReadonly}
            type="checkbox"
            onChange={(event) => updateField('readonly', event.target.checked)}
          />
          Read Only
        </label>

        <label className="org-user-textarea-label">
          Data
          <textarea
            readOnly={isReadonly}
            rows="4"
            value={formData.data}
            onChange={(event) => updateField('data', event.target.value)}
          />
        </label>
      </div>

      <div className="org-user-form-actions">
        <button className="org-user-secondary-btn" type="button" onClick={onCancel}>
          {isReadonly ? 'Cerrar' : 'Cancelar'}
        </button>
        {!isReadonly && (
          <button className="org-user-primary-btn" type="submit" disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        )}
      </div>
    </form>
  );
}

export default UserForm;
