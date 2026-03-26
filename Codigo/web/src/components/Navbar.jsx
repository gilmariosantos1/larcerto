import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Logo from './Logo'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="navbar">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Logo />
        </Link>
        
        <div className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Início</NavLink>
          <NavLink to="/adotar" className={({ isActive }) => isActive ? 'active' : ''}>Adotar</NavLink>
          <NavLink to="/blog" className={({ isActive }) => isActive ? 'active' : ''}>Blog</NavLink>
          <NavLink to="/doe" className="donate">Apoiar</NavLink>
        </div>

        <div className="navbar-actions">
          <NavLink to="/login" className="login-btn">Entrar</NavLink>
        </div>

      </nav>
    </header>
  )
}
