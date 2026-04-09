import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { useAuth } from '../context/AuthContext'
import { useNotificacoes } from '../hooks/useNotificacoes'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  
  const { user, isLoggedIn, logout } = useAuth()
  const { pendentes } = useNotificacoes()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      // Estado de sombra/encolhimento
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setDropdownOpen(false)
    navigate('/')
  }

  const getInitial = () => {
    if (user?.Nome) return user.Nome.charAt(0).toUpperCase()
    if (user?.email) return user.email.charAt(0).toUpperCase()
    return '?'
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="navbar">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Logo />
        </Link>

        <div className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
            Início
            <span className="nav-indicator"></span>
          </NavLink>
          <NavLink to="/adotar" className={({ isActive }) => isActive ? 'active' : ''}>
            Adotar
            <span className="nav-indicator"></span>
          </NavLink>
          <NavLink to="/querodoar" className={({ isActive }) => isActive ? 'active' : ''}>
            Doar Pet
            <span className="nav-indicator"></span>
          </NavLink>
          <NavLink to="/lares" className={({ isActive }) => isActive ? 'active' : ''}>
            Lares
            <span className="nav-indicator"></span>
          </NavLink>
          <NavLink to="/blog" className={({ isActive }) => isActive ? 'active' : ''}>
            Blog
            <span className="nav-indicator"></span>
          </NavLink>
          <NavLink to="/doe" className="donate">Apoiar</NavLink>
        </div>

        <div className="navbar-actions">
          {isLoggedIn ? (
            <div className="user-menu" ref={dropdownRef}>
              <button 
                className="user-avatar-btn" 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ position: 'relative' }}
              >
                <span className="user-avatar">{getInitial()}</span>
                {pendentes > 0 && (
                  <span style={{
                    position: 'absolute', top: '-5px', right: '-5px',
                    background: '#e65100', color: '#fff', fontSize: '11px',
                    fontWeight: 'bold', width: '20px', height: '20px',
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                  }}>
                    {pendentes}
                  </span>
                )}
                <span className="avatar-chevron">{dropdownOpen ? '▲' : '▼'}</span>
              </button>

              {dropdownOpen && (
                <div className="user-dropdown">
                  <div className="dropdown-info">
                    <span className="user-name-dropdown">{user?.Nome}</span>
                    <span className="user-email-dropdown">{user?.email}</span>
                  </div>
                  <hr className="dropdown-divider" />
                  <Link to="/perfil" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                    👤 Meu Perfil
                  </Link>
                  {user?.Perfil === 'Doador' && (
                    <Link to="/gerenciar-adocoes" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                      📋 Gerenciar Adoções
                      {pendentes > 0 && <span style={{ marginLeft: '10px', background: '#e65100', color: '#fff', padding: '2px 8px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold' }}>{pendentes} nova(s)</span>}
                    </Link>
                  )}
                  {user?.Perfil === 'Adotante' && (
                    <Link to="/minhas-solicitacoes" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                      🏠 Minhas Solicitações
                    </Link>
                  )}
                  <button className="dropdown-item logout-item" onClick={handleLogout}>
                    🚪 Sair da conta
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login" className="login-btn">Entrar</NavLink>
          )}
        </div>
      </nav>
    </header>
  )
}
