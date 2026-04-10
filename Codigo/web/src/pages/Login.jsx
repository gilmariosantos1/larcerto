import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Lock } from 'lucide-react'
import Logo from '../components/Logo'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useNotificacao } from '../components/Notificacao'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()
  const { notify } = useNotificacao()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')

    if (!email || !senha) {
      return notify('Por favor, preencha e-mail e senha.', 'error')
    }

    setLoading(true)
    try {
      const response = await api.post('/auth/logar', { email, senha })
      const { token, user } = response.data

      login(token, user)
      notify('Boas-vindas ao Lar Certo!', 'success')
      setTimeout(() => navigate('/'), 1200)
    } catch (err) {
      const msg = err.response?.data?.error || 'Erro ao realizar login.'
      notify(msg, 'error')
      setErro(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <main className="auth-page">
        <Link to="/" className="auth-back-btn" title="Voltar ao Início">
          <ArrowLeft size={24} />
        </Link>
        <div className="auth-split-banner">
          <div className="auth-banner-content">
            <h1>Sua jornada<br/>começa aqui.</h1>
            <p>O Lar Certo conecta corações. Juntos, damos a oportunidade de um novo começo para quem mais precisa.</p>
          </div>
        </div>

        <div className="auth-split-form">
          <div className="auth-card">
            <div style={{ marginBottom: '40px' }}>
              <Logo />
            </div>
            <h2>Boas-vindas de volta!</h2>
            <p className="info-text">
              Sua conta é o portal para ajudar mais pets. Entre com seu e-mail abaixo.
            </p>

            <form className="auth-form" onSubmit={handleSubmit}>
            {erro && (
              <div style={{ color: '#d32f2f', marginBottom: '15px', textAlign: 'center', fontSize: '14px', background: '#ffebee', padding: '10px', borderRadius: '8px' }}>
                {erro}
              </div>
            )}

            <div className="auth-input-group">
              <label htmlFor="email">E-mail</label>
              <div className="auth-input-wrapper">
                <Mail className="auth-input-icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="exemplo@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label htmlFor="password">Senha</label>
              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Sua senha secreta"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar na Plataforma'}
            </button>
          </form>

            <div className="auth-footer">
              Não tem uma conta? <Link to="/cadastro">Criar agora</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
