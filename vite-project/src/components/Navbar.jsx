import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Overview', end: true },
  { to: '/expenses', label: 'Expenses', end: false },
]

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M5 17.5 10.1 12l3.6 3.5L19 8" />
        <path d="M14.5 8H19v4.5" />
      </svg>
    </span>
  )
}

export default function Navbar() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <NavLink to="/" className="brand" aria-label="ExpenseMate home">
          <BrandMark />
          <span className="brand-copy">
            <strong>ExpenseTrack</strong>
          </span>
        </NavLink>

        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

       
      </div>
    </header>
  )
}
