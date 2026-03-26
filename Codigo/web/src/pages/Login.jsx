import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import VLibras from '../components/VLibras'
import Logo from '../components/Logo'

export default function Login() {
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setEnviado(true)
    setTimeout(() => {
      window.location.href = '/'
    }, 2000)
  }

  return (
    <>
      <Navbar />

      <main className="auth-page">
        <div className="auth-card">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Logo />
          </div>
          <h2>Boas-vindas de volta!</h2>
          <p className="info-text">
            Sua conta é o portal para ajudar mais pets. Entre com seu e-mail.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>

            <div className="auth-input-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                placeholder="exemplo@email.com"
                required
              />
            </div>

            <div className="auth-input-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                placeholder="Sua senha secreta"
                required
              />
            </div>

            <button type="submit">Entrar na Plataforma</button>
          </form>

          <div className="auth-footer">
            Não tem uma conta? <Link to="/cadastro">Criar agora</Link>
          </div>
        </div>
      </main>

      {enviado && (
        <div className="toast">✅ Login realizado com sucesso! Redirecionando...</div>
      )}

      <VLibras />
      <Footer />
    </>
  )
}
