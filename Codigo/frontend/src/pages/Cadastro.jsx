import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Mail, Phone, Lock, CheckCircle } from 'lucide-react'
import Logo from '../components/Logo'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useNotificacao } from '../components/Notificacao'

export default function Cadastro() {
  const [form, setForm] = useState({
    Nome: '', email: '', Telefone: '', Perfil: 'Adotante', senha: '', confirmarSenha: ''
  })
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()
  const { notify } = useNotificacao()

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')

    if (!form.Nome.trim()) return notify('Por favor, informe seu nome.', 'error')
    if (form.senha !== form.confirmarSenha) return notify('As senhas não coincidem.', 'error')
    if (form.senha.length < 6) return notify('A senha deve ter no mínimo 6 caracteres.', 'error')

    setLoading(true)
    try {
      await api.post('/auth/registrar', {
        Nome:     form.Nome,
        email:    form.email,
        senha:    form.senha,
        Telefone: form.Telefone || undefined,
        Perfil:   form.Perfil
      })

      // Login automático após cadastro
      const loginRes = await api.post('/auth/logar', { email: form.email, senha: form.senha })
      login(loginRes.data.token, loginRes.data.user)

      notify('Bem-vindo(a) à causa animal!', 'success')
      setTimeout(() => navigate('/'), 1200)
    } catch (err) {
      const msg = err.response?.data?.error || 'Erro ao realizar cadastro.'
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
        <div className="auth-split-banner" style={{ background: "url('https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80') center/cover no-repeat" }}>
          <div className="auth-banner-content">
            <h1>Faça parte<br/>dessa causa.</h1>
            <p>Crie sua conta e ajude a transformar a vida de milhares de pets que estão nas ruas e abrigos à procura de um lar apaixonado.</p>
          </div>
        </div>

        <div className="auth-split-form">
          <div className="auth-card" style={{ maxWidth: '480px' }}>
            <div style={{ marginBottom: '30px' }}>
              <Logo />
            </div>
            <h2>Junte-se à causa!</h2>
            <p className="info-text">Adote ou conecte corações, cadastre sua conta agora.</p>

            <form className="auth-form" onSubmit={handleSubmit}>
            {erro && (
              <div style={{ color: '#d32f2f', marginBottom: '15px', textAlign: 'center', fontSize: '14px', background: '#ffebee', padding: '10px', borderRadius: '8px' }}>
                {erro}
              </div>
            )}

            <div className="auth-input-group">
              <label htmlFor="Nome">Nome completo *</label>
              <div className="auth-input-wrapper">
                <User className="auth-input-icon" />
                <input type="text" id="Nome" name="Nome" placeholder="Seu nome completo"
                  value={form.Nome} onChange={handleChange} required />
              </div>
            </div>

            <div className="auth-input-group">
              <label htmlFor="email-cad">E-mail *</label>
              <div className="auth-input-wrapper">
                <Mail className="auth-input-icon" />
                <input type="email" id="email-cad" name="email" placeholder="seu@email.com"
                  value={form.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="auth-input-group">
              <label htmlFor="Telefone">Telefone / WhatsApp</label>
              <div className="auth-input-wrapper">
                <Phone className="auth-input-icon" />
                <input type="tel" id="Telefone" name="Telefone" placeholder="(79) 99999-9999"
                  value={form.Telefone} onChange={handleChange} />
              </div>
            </div>

            <div className="auth-input-group">
              <label htmlFor="Perfil">Quero me cadastrar como *</label>
              <select id="Perfil" name="Perfil" value={form.Perfil} onChange={handleChange}
                style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '2px solid #eee', fontSize: '15px', background: '#fff', cursor: 'pointer' }}>
                <option value="Adotante">🐾 Adotante — quero adotar um pet</option>
                <option value="Doador">🏠 Doador — quero publicar adoções</option>
              </select>
            </div>

            <div className="auth-input-group">
              <label htmlFor="password-cad">Senha * (mín. 6 caracteres)</label>
              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" />
                <input type="password" id="password-cad" name="senha" placeholder="Crie uma senha forte"
                  value={form.senha} onChange={handleChange} required />
              </div>
            </div>

            <div className="auth-input-group">
              <label htmlFor="confirmar-senha">Confirmar senha *</label>
              <div className="auth-input-wrapper">
                <CheckCircle className="auth-input-icon" />
                <input type="password" id="confirmar-senha" name="confirmarSenha" placeholder="Repita sua senha"
                  value={form.confirmarSenha} onChange={handleChange} required />
              </div>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Cadastrando...' : 'Criar minha conta'}
            </button>
          </form>

            <div className="auth-footer">
              Já possui uma conta? <Link to="/login">Acessar agora</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
