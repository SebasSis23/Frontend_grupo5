function SearchBar({ value, onChange }) {
  return (
    <label className="org-user-search">
      <span>Buscar</span>
      <input
        placeholder="Buscar por type, id o name"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export default SearchBar;
