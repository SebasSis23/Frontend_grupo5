function Pagination({ page, pageCount, total, onPageChange }) {
  return (
    <div className="org-user-pagination">
      <span>
        Pagina {page} de {pageCount} - {total} registros
      </span>
      <div className="org-user-page-actions">
        <button
          className="org-user-secondary-btn"
          type="button"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          Anterior
        </button>
        <button
          className="org-user-secondary-btn"
          type="button"
          disabled={page === pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Pagination;
