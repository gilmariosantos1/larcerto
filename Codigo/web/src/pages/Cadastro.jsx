import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import VLibras from '../components/VLibras'
import Logo from '../components/Logo'

export default function Cadastro() {
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
          <h2>Junte-se à causa!</h2>
          <p className="info-text">
            Crie sua conta e ajude animais a encontrarem um lar. Preencha seus dados abaixo.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', width: '100%' }}>
              <div className="auth-input-group">
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" placeholder="Nome" required />
              </div>
              <div className="auth-input-group">
                <label htmlFor="sobrenome">Sobrenome</label>
                <input type="text" id="sobrenome" placeholder="Sobrenome" required />
              </div>
            </div>


            <div className="auth-input-group">
              <label htmlFor="email-cad">E-mail</label>
              <input
                type="email"
                id="email-cad"
                placeholder="seu@melhoremail.com"
                required
              />
            </div>

            <div className="auth-input-group">
              <label htmlFor="password-cad">Senha</label>
              <input
                type="password"
                id="password-cad"
                placeholder="Crie uma senha forte"
                required
              />
            </div>

            <button type="submit">Finalizar Cadastro</button>
          </form>

          <div className="auth-footer">
            Já possui uma conta? <Link to="/login">Acessar agora</Link>
          </div>
        </div>
      </main>

      {enviado && (
        <div className="toast">✅ Cadastro realizado com sucesso! Redirecionando...</div>
      )}

      <VLibras />
      <Footer />
    </>
  )
}
