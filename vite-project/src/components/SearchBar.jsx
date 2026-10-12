export default function SearchBar({ value, onChange }) {
  return (
    <label className="search-field">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 4 4" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search expenses"
        aria-label="Search expenses by name"
      />
      {value && (
        <button
          className="clear-search"
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </label>
  )
}
