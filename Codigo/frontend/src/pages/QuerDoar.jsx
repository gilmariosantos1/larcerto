import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import VLibras from '../components/VLibras'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useNotificacao } from '../components/Notificacao'
import '../styles/querodoar.css'

const UFs = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']

const WHY_CARDS = [
  { icon: '🏠', title: 'Lar garantido', text: 'Seu pet será visto por famílias que já estão buscando ativamente por um novo amigo.' },
  { icon: '💜', title: 'Processo seguro', text: 'Todos os adotantes passam por validação. Você ainda aprova cada solicitação.' },
  { icon: '🌟', title: 'Gratuito & fácil', text: 'Cadastre em menos de 3 minutos. Sem burocracia, sem custos.' },
  { icon: '🤝', title: 'Você não está sozinho', text: 'Nossa comunidade acompanha cada adoção até que o pet encontre o lar certo.' },
]

export default function QuerDoar() {
  const { isLoggedIn, user } = useAuth()
  const navigate = useNavigate()
  const { notify } = useNotificacao()

  const [form, setForm] = useState({
    Nome: '', Tipo: '', Porte: '', Genero: '', Idade: '', Descricao: '', Cidade: '', Estado: ''
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const [concluido, setConcluido] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) navigate('/login')
  }, [isLoggedIn, navigate])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')

    if (!form.Nome.trim()) return notify('Informe o nome do pet.', 'error')
    if (!form.Tipo) return notify('Selecione o tipo do animal.', 'error')
    if (!imageFile) return notify('Selecione uma foto do pet.', 'error')
    if (!form.Cidade.trim()) return notify('Informe a cidade.', 'error')
    if (!form.Estado) return notify('Selecione o estado.', 'error')

    setLoading(true)
    const formData = new FormData()
    Object.entries(form).forEach(([k, v]) => formData.append(k, v))
    formData.append('Img', imageFile)

    try {
      await api.post('/pets', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      notify('Pet cadastrado com sucesso!', 'success')
      setConcluido(true)
    } catch (err) {
      const msg = err.response?.data?.error || 'Erro ao cadastrar pet. Verifique os dados e a foto.'
      notify(msg, 'error')
      setErro(msg)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setConcluido(false)
    setForm({ Nome: '', Tipo: '', Porte: '', Genero: '', Idade: '', Descricao: '', Cidade: '', Estado: '' })
    setImageFile(null)
    setImagePreview('')
    setErro('')
  }

  const userInitial = user?.Nome?.charAt(0)?.toUpperCase() || '?'

  return (
    <>
      <Navbar />

      {/* Hero Acolhedor */}
      <section className="querodoar-hero">
        <h1>
          Dar um lar é um ato<br />
          de <span>puro amor</span>.
        </h1>
        <p>
          Sabemos que não é fácil. Mas você está fazendo a escolha certa — dar ao seu pet
          uma segunda chance com uma família que vai amá-lo de verdade.
        </p>
      </section>

      <main className="container">

        {/* Por que cadastrar */}
        <div className="querodoar-why">
          {WHY_CARDS.map((c) => (
            <div className="querodoar-why-card" key={c.title}>
              <div className="icon">{c.icon}</div>
              <h4>{c.title}</h4>
              <p>{c.text}</p>
            </div>
          ))}
        </div>

        {concluido ? (
          <div className="querodoar-success">
            <span className="success-icon">🎉</span>
            <h2>
              <span>{form.Nome}</span> já está na vitrine!
            </h2>
            <p>
              Obrigado por confiar no Lar Certo. O anúncio do {form.Nome} já está visível 
              para famílias que estão esperando exatamente por ele.
            </p>
            <div className="success-actions">
              <button className="btn-primary" onClick={resetForm}>
                🐾 Cadastrar outro pet
              </button>
              <button className="btn-outline" onClick={() => navigate('/adotar')}>
                Ver pets disponíveis
              </button>
            </div>
          </div>
        ) : (
          <div className="querodoar-layout">

            {/* Sidebar */}
            <aside className="querodoar-sidebar">
              <div className="user-badge">
                <div className="user-avatar-big">{userInitial}</div>
                <div className="user-info">
                  <h4>{user?.Nome}</h4>
                  <p>Doador responsável</p>
                </div>
              </div>

              <h3>🌟 Dicas para um anúncio incrível</h3>
              <ul className="querodoar-tips">
                <li>
                  <span className="tip-icon">📸</span>
                  <span>Uma foto clara e iluminada aumenta em 3x as chances de adoção.</span>
                </li>
                <li>
                  <span className="tip-icon">✍️</span>
                  <span>Descreva a personalidade, não só os dados básicos. Ele late muito? Adora colo?</span>
                </li>
                <li>
                  <span className="tip-icon">💉</span>
                  <span>Mencione se é vacinado, castrado ou microchipado.</span>
                </li>
                <li>
                  <span className="tip-icon">⏱️</span>
                  <span>Responda as solicitações rapidamente para não perder famílias interessadas!</span>
                </li>
                <li>
                  <span className="tip-icon">🚫</span>
                  <span>Nunca cobre pela adoção. Isso é proibido por lei.</span>
                </li>
              </ul>
            </aside>

            {/* Formulário */}
            <form className="querodoar-form-main" onSubmit={handleSubmit}>

              {erro && (
                <div style={{ color: '#d32f2f', background: '#ffebee', padding: '14px 18px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px', fontWeight: '600' }}>
                  ⚠️ {erro}
                </div>
              )}

              {/* Seção 1: Identidade */}
              <div className="form-section">
                <div className="form-section-header">
                  <div className="form-section-icon">🐾</div>
                  <div>
                    <h3>Identidade do Pet</h3>
                    <p>Dados básicos para identificar seu amiguinho</p>
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="Nome">Nome do pet *</label>
                    <input
                      type="text" id="Nome" name="Nome"
                      placeholder="Ex: Bolinha, Lola..."
                      value={form.Nome} onChange={handleChange} required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Tipo">Espécie *</label>
                    <select id="Tipo" name="Tipo" value={form.Tipo} onChange={handleChange} required>
                      <option value="">Selecione...</option>
                      <option value="cao">🐶 Cachorro</option>
                      <option value="gato">🐱 Gato</option>
                      <option value="outro">🐾 Outro</option>
                    </select>
                  </div>
                </div>

                <div className="form-grid-3" style={{ marginTop: '18px' }}>
                  <div className="form-group">
                    <label htmlFor="Porte">Porte</label>
                    <select id="Porte" name="Porte" value={form.Porte} onChange={handleChange}>
                      <option value="">Selecione</option>
                      <option value="P">Pequeno</option>
                      <option value="M">Médio</option>
                      <option value="G">Grande</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Genero">Sexo</label>
                    <select id="Genero" name="Genero" value={form.Genero} onChange={handleChange}>
                      <option value="">Selecione</option>
                      <option value="Macho">Macho</option>
                      <option value="Femea">Fêmea</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Idade">Idade aprox.</label>
                    <input
                      type="text" id="Idade" name="Idade"
                      placeholder="Ex: 2 anos"
                      value={form.Idade} onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Seção 2: Personalidade */}
              <div className="form-section">
                <div className="form-section-header">
                  <div className="form-section-icon">💬</div>
                  <div>
                    <h3>História & Personalidade</h3>
                    <p>Esse é o diferencial! Conte quem ele é de verdade.</p>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="Descricao">Descrição</label>
                  <textarea
                    id="Descricao" name="Descricao"
                    placeholder="Ex: A Lola é uma cadela dócil e carinhosa, adora crianças e convive bem com outros pets. Está vacinada e vermifugada. Precisa de um lar com quintal..."
                    value={form.Descricao} onChange={handleChange}
                  />
                </div>
              </div>

              {/* Seção 3: Localização */}
              <div className="form-section">
                <div className="form-section-header">
                  <div className="form-section-icon">📍</div>
                  <div>
                    <h3>Localização</h3>
                    <p>Onde o pet está atualmente</p>
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="Cidade">Cidade *</label>
                    <input
                      type="text" id="Cidade" name="Cidade"
                      placeholder="Ex: São Paulo"
                      value={form.Cidade} onChange={handleChange} required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Estado">Estado *</label>
                    <select id="Estado" name="Estado" value={form.Estado} onChange={handleChange} required>
                      <option value="">Selecione o UF</option>
                      {UFs.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Seção 4: Foto */}
              <div className="form-section">
                <div className="form-section-header">
                  <div className="form-section-icon">📷</div>
                  <div>
                    <h3>Foto do Amiguinho</h3>
                    <p>Foto clara = mais chances de adoção!</p>
                  </div>
                </div>

                <div className="upload-dropzone">
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                  {!imagePreview ? (
                    <>
                      <div className="upload-icon">🖼️</div>
                      <h4>Clique para escolher uma foto</h4>
                      <small>JPG, PNG ou WebP — máximo 5MB</small>
                    </>
                  ) : (
                    <div className="upload-preview">
                      <img src={imagePreview} alt="Preview do pet" />
                      <span className="change-label">📸 Clique para trocar a foto</span>
                    </div>
                  )}
                </div>
              </div>

              <button type="submit" className="querodoar-submit-btn" disabled={loading}>
                {loading ? '⏳ Publicando anúncio...' : '🐾 Publicar anúncio de adoção'}
              </button>
            </form>
          </div>
        )}
      </main>

      <VLibras />
      <Footer />
    </>
  )
}
