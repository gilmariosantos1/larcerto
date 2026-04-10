import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import VLibras from '../components/VLibras'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useNotificacao } from '../components/Notificacao'
import '../styles/adotar.css'

const TIPOS = ['Todos', 'cao', 'gato', 'outro']
const PORTES = ['Todos', 'P', 'M', 'G']
const TIPO_LABELS = { Todos: '🐾 Todos', cao: '🐶 Cão', gato: '🐱 Gato', outro: '🐾 Outro' }
const PORTE_LABELS = { Todos: 'Qualquer porte', P: 'Pequeno', M: 'Médio', G: 'Grande' }

export default function Adotar() {
  const [pets, setPets] = useState([])
  const [filtrados, setFiltrados] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')
  const [busca, setBusca] = useState('')
  const [tipoFiltro, setTipoFiltro] = useState('Todos')
  const [porteFiltro, setPorteFiltro] = useState('Todos')
  const [estadoFiltro, setEstadoFiltro] = useState('Todos')
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })
  const [selectedPet, setSelectedPet] = useState(null)
  const [solicitando, setSolicitando] = useState(false)
  const [mensagemSucesso, setMensagemSucesso] = useState('')

  const { isLoggedIn, user } = useAuth()
  const { notify } = useNotificacao()

  const getImgUrl = (path) => {
    if (!path) return 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80'
    if (path.startsWith('http')) return path
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
    return `${baseUrl}${path}`
  }

  useEffect(() => {
    async function fetchPets() {
      try {
        const response = await api.get('/pets')
        const disponiveis = response.data.filter(p => p.Status === 'disponivel')
        setPets(disponiveis)
        setFiltrados(disponiveis)
      } catch (error) {
        console.error('Erro ao buscar pets:', error)
        setErro('Não foi possível carregar os pets. Tente novamente.')
      } finally {
        setLoading(false)
      }
    }
    fetchPets()
  }, [])

  useEffect(() => {
    let resultado = pets
    if (busca.trim()) {
      resultado = resultado.filter(p =>
        p.Nome?.toLowerCase().includes(busca.toLowerCase()) ||
        p.Tipo?.toLowerCase().includes(busca.toLowerCase())
      )
    }
    if (tipoFiltro !== 'Todos') resultado = resultado.filter(p => p.Tipo === tipoFiltro)
    if (porteFiltro !== 'Todos') resultado = resultado.filter(p => p.Porte === porteFiltro)
    if (estadoFiltro !== 'Todos') resultado = resultado.filter(p => p.localizacao?.Estado === estadoFiltro)
    setFiltrados(resultado)
  }, [busca, tipoFiltro, porteFiltro, estadoFiltro, pets])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    )
  }

  const handleSolicitarAdocao = async (idPet) => {
    if (!isLoggedIn) return
    setSolicitando(true)
    setErro('')
    try {
      await api.post('/adocoes', { idPet })
      notify('Solicitação enviada! O doador receberá seu interesse.', 'success')
      setTimeout(() => setSelectedPet(null), 2000)
    } catch (err) {
      const msg = err.response?.data?.error || 'Erro ao enviar solicitação.'
      notify(msg, 'error')
      setErro(msg)
    } finally {
      setSolicitando(false)
    }
  }

  const tipoLabel = { cao: '🐶 Cão', gato: '🐱 Gato', outro: '🐾 Outro' }
  const porteLabel = { P: 'Pequeno', M: 'Médio', G: 'Grande' }

  const estadosDisponiveis = ['Todos', ...new Set(pets.map(p => p.localizacao?.Estado).filter(Boolean))]
  const totalPets = pets.length
  const totalAdotados = Math.round(totalPets * 0.85) // Estatística estimada

  return (
    <>
      <Navbar />

      {/* Hero Premium */}
      <section className="adotar-hero">
        <h1>
          Encontre seu próximo<br />
          <span>melhor amigo.</span>
        </h1>
        <p>
          Cada pet aqui é um coração esperando por você.
          Filtre, explore e faça a diferença na vida de um animal.
        </p>

        {!loading && (
          <div className="adotar-stats">
            <div className="adotar-stat">
              <strong>{totalPets}+</strong>
              <span>Pets disponíveis</span>
            </div>
            <div className="adotar-stat">
              <strong>500+</strong>
              <span>Adoções realizadas</span>
            </div>
            <div className="adotar-stat">
              <strong>100%</strong>
              <span>Gratuito</span>
            </div>
          </div>
        )}
      </section>

      <main className="container">

        {/* Painel de Filtros */}
        <div className="adotar-filter-panel">
          {/* Busca + Estado */}
          <div className="adotar-search-row">
            <input
              type="text"
              className="adotar-search-input"
              placeholder="🔍  Buscar por nome, raça ou tipo..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
            />
            {estadosDisponiveis.length > 1 && (
              <select
                value={estadoFiltro}
                onChange={(e) => setEstadoFiltro(e.target.value)}
                className="adotar-state-select"
              >
                {estadosDisponiveis.map(uf => (
                  <option key={uf} value={uf}>{uf === 'Todos' ? '🌍 Qualquer Estado' : `📍 ${uf}`}</option>
                ))}
              </select>
            )}
          </div>

          <hr className="adotar-filter-divider" />

          {/* Filtro de Espécie */}
          <div>
            <div className="adotar-filter-label">Espécie</div>
            <div className="adotar-pills">
              {TIPOS.map(tipo => (
                <button
                  key={tipo}
                  className={`adotar-pill ${tipoFiltro === tipo ? 'ativo' : ''}`}
                  onClick={() => setTipoFiltro(tipo)}
                >
                  {TIPO_LABELS[tipo]}
                </button>
              ))}
            </div>
          </div>

          {/* Filtro de Porte */}
          <div>
            <div className="adotar-filter-label">Porte</div>
            <div className="adotar-pills">
              {PORTES.map(porte => (
                <button
                  key={porte}
                  className={`adotar-pill ${porteFiltro === porte ? 'ativo' : ''}`}
                  onClick={() => setPorteFiltro(porte)}
                >
                  {PORTE_LABELS[porte]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contador de resultados */}
        {!loading && (
          <div className="adotar-results-bar">
            <div className="adotar-results-count">
              <span>{filtrados.length}</span> {filtrados.length === 1 ? 'pet encontrado' : 'pets encontrados'}
            </div>
          </div>
        )}

        {/* Grid de Pets */}
        <div className="animais-grid">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="pet-card skeleton-card">
                <div className="skeleton skeleton-img" />
                <div className="skeleton skeleton-text" />
                <div className="skeleton skeleton-text-sm" />
              </div>
            ))
          ) : filtrados.length > 0 ? (
            filtrados.map((animal) => (
              <div
                className="pet-card"
                key={animal.idPet}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedPet(animal)}
              >
                <span className="pet-card-type-badge">
                  {tipoLabel[animal.Tipo] || animal.Tipo}
                </span>

                <button
                  className={`pet-card-fav ${favorites.includes(animal.idPet) ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(animal.idPet) }}
                  style={{ zIndex: 10 }}
                >
                  {favorites.includes(animal.idPet) ? '❤️' : '🤍'}
                </button>

                <div className="pet-card-img-container">
                  <img
                    src={getImgUrl(animal.Img)}
                    alt={animal.Nome}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80' }}
                  />
                </div>

                <div className="pet-card-info" style={{ padding: '20px', textAlign: 'left' }}>
                  <h3 className="pet-card-name">{animal.Nome}</h3>

                  <div className="pet-card-meta">
                    <span>🦴 {porteLabel[animal.Porte] || animal.Porte || 'Porte n/d'}</span>
                    <span>🚻 {animal.Genero || 'Gênero n/d'}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#aaa', fontSize: '12px', marginBottom: '15px' }}>
                    📍 {animal.localizacao ? `${animal.localizacao.Cidade} — ${animal.localizacao.Estado}` : 'Local n/d'}
                  </div>

                  <button className="pet-card-cta">
                    Ver Detalhes 🔍
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="adotar-empty-state">
              <span className="empty-icon">🔭</span>
              <h3>Nenhum pet encontrado</h3>
              <p>Tente ajustar os filtros ou a busca para encontrar mais amiguinhos disponíveis.</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal de Detalhes */}
      {selectedPet && (
        <div
          onClick={() => !solicitando && setSelectedPet(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', zIndex: 9999, padding: '20px'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: '32px', width: '100%',
              maxWidth: '820px', maxHeight: '90vh', overflowY: 'auto',
              position: 'relative', boxShadow: '0 30px 80px rgba(0,0,0,0.25)'
            }}
          >
            <button
              onClick={() => setSelectedPet(null)}
              style={{
                position: 'absolute', top: '20px', right: '20px',
                background: '#f0f0f0', border: 'none', width: '42px', height: '42px',
                borderRadius: '50%', cursor: 'pointer', fontSize: '18px', zIndex: 10,
                fontWeight: '800', transition: 'background 0.2s'
              }}
            >
              ✕
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
              {/* Imagem */}
              <div style={{ position: 'relative' }}>
                <img
                  src={getImgUrl(selectedPet.Img)}
                  alt={selectedPet.Nome}
                  style={{ width: '100%', height: '100%', minHeight: '450px', objectFit: 'cover', borderRadius: '32px 0 0 32px' }}
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80' }}
                />
                <div style={{
                  position: 'absolute', bottom: '20px', left: '20px',
                  background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)',
                  padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '700', color: '#2d2de4'
                }}>
                  📍 {selectedPet.localizacao ? `${selectedPet.localizacao.Cidade}, ${selectedPet.localizacao.Estado}` : 'Local n/d'}
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '40px', display: 'flex', flexDirection: 'column' }}>
                <span style={{
                  background: '#f0f4ff', color: '#2d2de4', padding: '6px 14px',
                  borderRadius: '30px', fontSize: '12px', fontWeight: '800',
                  width: 'fit-content', marginBottom: '12px'
                }}>
                  {tipoLabel[selectedPet.Tipo] || selectedPet.Tipo}
                </span>

                <h2 style={{ fontFamily: 'Outfit', fontSize: '38px', fontWeight: '900', margin: '0 0 16px', color: '#1a1a1a' }}>
                  {selectedPet.Nome}
                </h2>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '22px' }}>
                  {[
                    { label: `🦴 ${porteLabel[selectedPet.Porte] || selectedPet.Porte || 'Porte n/d'}` },
                    { label: `📅 ${selectedPet.Idade || 'Idade n/d'}` },
                    { label: `🚻 ${selectedPet.Genero || 'Gênero n/d'}` },
                  ].map(tag => (
                    <span key={tag.label} style={{ background: '#f5f5f5', padding: '6px 14px', borderRadius: '12px', fontSize: '13px', fontWeight: '700', color: '#555' }}>
                      {tag.label}
                    </span>
                  ))}
                </div>

                <div style={{ flex: 1 }}>
                  <h4 style={{ color: '#333', marginBottom: '10px', fontSize: '15px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    História & Personalidade
                  </h4>
                  <p style={{ color: '#777', lineHeight: '1.7', fontSize: '15px', whiteSpace: 'pre-line' }}>
                    {selectedPet.Descricao || 'Este amiguinho ainda não tem uma descrição detalhada, mas com certeza está ansioso por um novo lar!'}
                  </p>
                </div>

                <div style={{ marginTop: '25px', padding: '20px', background: '#fafbff', borderRadius: '20px', border: '1px solid #eee' }}>
                  {mensagemSucesso ? (
                    <div style={{ color: '#2e7d32', fontWeight: '700', textAlign: 'center', fontSize: '16px' }}>✅ {mensagemSucesso}</div>
                  ) : (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '28px' }}>👤</span>
                        <div>
                          <p style={{ margin: 0, fontSize: '11px', color: '#bbb', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Doador Responsável</p>
                          <p style={{ margin: 0, fontWeight: '800', fontSize: '15px', color: '#1a1a1a' }}>{selectedPet.doador?.Nome || 'Abrigo Parceiro'}</p>
                        </div>
                      </div>
                      {erro && <p style={{ color: '#d32f2f', fontSize: '12px', marginBottom: '10px', textAlign: 'center', fontWeight: '600' }}>{erro}</p>}
                      {isLoggedIn ? (
                        user?.Perfil === 'Adotante' ? (
                          <button
                            style={{
                              width: '100%', padding: '16px',
                              background: 'linear-gradient(135deg, #2d2de4, #5052d4)',
                              color: '#fff', border: 'none', borderRadius: '16px',
                              fontWeight: '800', fontSize: '16px', cursor: 'pointer',
                              transition: 'all 0.3s', boxShadow: '0 6px 18px rgba(45,45,228,0.25)'
                            }}
                            onClick={() => handleSolicitarAdocao(selectedPet.idPet)}
                            disabled={solicitando}
                          >
                            {solicitando ? '⏳ Enviando...' : '🐾 Solicitar Adoção'}
                          </button>
                        ) : (
                          <p style={{ fontSize: '13px', color: '#e65100', textAlign: 'center', fontWeight: '700' }}>
                            Apenas perfis de <strong>Adotante</strong> podem solicitar adoções.
                          </p>
                        )
                      ) : (
                        <Link
                          to="/login"
                          style={{
                            display: 'block', textAlign: 'center', textDecoration: 'none',
                            padding: '16px', background: 'linear-gradient(135deg, #2d2de4, #5052d4)',
                            color: '#fff', borderRadius: '16px', fontWeight: '800', fontSize: '16px',
                            boxShadow: '0 6px 18px rgba(45,45,228,0.25)'
                          }}
                        >
                          🔑 Faça login para adotar
                        </Link>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <VLibras />
      <Footer />
    </>
  )
}
