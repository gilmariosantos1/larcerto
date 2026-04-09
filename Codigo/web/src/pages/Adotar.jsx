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
  
  // State para o Modal
  const [selectedPet, setSelectedPet] = useState(null)
  const [solicitando, setSolicitando] = useState(false)
  const [mensagemSucesso, setMensagemSucesso] = useState('')

  const { isLoggedIn, user } = useAuth()
  const { notify } = useNotificacao()

  const getImgUrl = (path) => {
    if (!path) return '/img/adotar/placeholder-pet.jpg';
    if (path.startsWith('http')) return path;
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    return `${baseUrl}${path}`;
  }

  useEffect(() => {
    async function fetchPets() {
      try {
        const response = await api.get('/pets')
        // Filtra somente disponíveis
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
    if (tipoFiltro !== 'Todos') {
      resultado = resultado.filter(p => p.Tipo === tipoFiltro)
    }
    if (porteFiltro !== 'Todos') {
      resultado = resultado.filter(p => p.Porte === porteFiltro)
    }
    if (estadoFiltro !== 'Todos') {
      resultado = resultado.filter(p => p.localizacao?.Estado === estadoFiltro)
    }
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
      setTimeout(() => {
        setSelectedPet(null)
      }, 2000)
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

  // Extrair lista de estados únicos a partir dos pets disponíveis
  const estadosDisponiveis = ['Todos', ...new Set(pets.map(p => p.localizacao?.Estado).filter(Boolean))]

  return (
    <>
      <Navbar />

      <section className="hero-banner">
        <h2>Encontre seu novo amigo 🐶🐱</h2>
        <p>Veja os detalhes de cada amiguinho e faça uma solicitação de adoção responsável.</p>
      </section>

      <main className="container">
        {/* Barra de filtros */}
        <div className="filtro-adotar">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '15px' }}>
            <input
              type="text"
              placeholder="🔍 Buscar por nome ou tipo..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
              className="filtro-input"
            />
            {estadosDisponiveis.length > 1 && (
              <select 
                value={estadoFiltro} 
                onChange={(e) => setEstadoFiltro(e.target.value)}
                className="filtro-input"
                style={{ width: 'fit-content' }}
              >
                {estadosDisponiveis.map(uf => (
                  <option key={uf} value={uf}>{uf === 'Todos' ? '🌍 Qualquer Estado' : `📍 ${uf}`}</option>
                ))}
              </select>
            )}
          </div>
          <div className="filtro-pills">
            {TIPOS.map(tipo => (
              <button
                key={tipo}
                className={`filtro-pill ${tipoFiltro === tipo ? 'ativo' : ''}`}
                onClick={() => setTipoFiltro(tipo)}
              >
                {tipo === 'Todos' ? 'Todos' : tipoLabel[tipo] || tipo}
              </button>
            ))}
          </div>
          <div className="filtro-pills">
            {PORTES.map(porte => (
              <button
                key={porte}
                className={`filtro-pill ${porteFiltro === porte ? 'ativo' : ''}`}
                onClick={() => setPorteFiltro(porte)}
              >
                {porte === 'Todos' ? 'Qualquer porte' : porteLabel[porte]}
              </button>
            ))}
          </div>
        </div>

        <h2 className="section-title" style={{ textAlign: 'center', color: '#2d2de4', margin: '24px 0', fontSize: '28px' }}>
          {filtrados.length > 0
            ? `${filtrados.length} pet${filtrados.length > 1 ? 's' : ''} disponíve${filtrados.length > 1 ? 'is' : 'l'}`
            : 'Animais disponíveis para adoção'}
        </h2>

        <div className="animais-grid">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animal-card skeleton-card">
                <div className="skeleton skeleton-img" />
                <div className="skeleton skeleton-text" />
                <div className="skeleton skeleton-text-sm" />
              </div>
            ))
          ) : filtrados.length > 0 ? (
            filtrados.map((animal) => (
              <div className="pet-card" key={animal.idPet} style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setSelectedPet(animal)}>
                {/* Badge de Espécie */}
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
                    src={animal.Img || '/img/adotar/placeholder-pet.jpg'}
                    alt={animal.Nome}
                    onError={(e) => { e.target.src = '/img/adotar/placeholder-pet.jpg' }}
                  />
                </div>

                <div className="pet-card-info" style={{ padding: '20px', textAlign: 'left' }}>
                  <h3 className="pet-card-name">{animal.Nome}</h3>
                  
                  <div className="pet-card-meta">
                    <span>🦴 {porteLabel[animal.Porte] || animal.Porte || 'Porte n/d'}</span>
                    <span>🚻 {animal.Genero || 'Gênero n/d'}</span>
                  </div>

                  <div className="pet-card-location" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#888', fontSize: '12px', marginTop: '10px' }}>
                    <span>📍 {animal.localizacao ? `${animal.localizacao.Cidade} - ${animal.localizacao.Estado}` : 'Local n/d'}</span>
                  </div>

                  <button className="pet-card-cta">
                    Ver Detalhes 🔍
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', gridColumn: '1/-1', padding: '60px' }}>Nenhum pet encontrado.</p>
          )}
        </div>
      </main>

      {/* MODAL DE DETALHES */}
      {selectedPet && (
        <div 
          className="modal-overlay" 
          onClick={() => !solicitando && setSelectedPet(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', 
            backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', 
            justifyContent: 'center', zIndex: 9999, padding: '20px'
          }}
        >
          <div 
            className="modal-content" 
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: '32px', width: '100%', 
              maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', 
              position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
            }}
          >
            <button 
              onClick={() => setSelectedPet(null)}
              style={{
                position: 'absolute', top: '20px', right: '20px', 
                background: '#eee', border: 'none', width: '40px', height: '40px', 
                borderRadius: '50%', cursor: 'pointer', fontSize: '20px', zIndex: 10
              }}
            >
              ✕
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', padding: '40px' }}>
              <div>
                <img 
                  src={selectedPet.Img || '/img/adotar/placeholder-pet.jpg'} 
                  alt={selectedPet.Nome}
                  style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '24px' }}
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ 
                  background: '#f0f4ff', color: '#2d2de4', padding: '6px 14px', 
                  borderRadius: '30px', fontSize: '12px', fontWeight: '800', 
                  width: 'fit-content', marginBottom: '12px' 
                }}>
                  {tipoLabel[selectedPet.Tipo] || selectedPet.Tipo}
                </span>
                
                <h2 style={{ fontSize: '36px', fontWeight: '800', margin: '0 0 10px' }}>{selectedPet.Nome}</h2>
                
                <div style={{ display: 'flex', gap: '15px', color: '#666', fontSize: '14px', marginBottom: '20px' }}>
                  <span>🦴 {porteLabel[selectedPet.Porte] || selectedPet.Porte || 'Porte n/d'}</span>
                  <span>📅 {selectedPet.Idade || 'Idade n/d'}</span>
                  <span>🚻 {selectedPet.Genero || 'Gênero n/d'}</span>
                  <span>📍 {selectedPet.localizacao ? `${selectedPet.localizacao.Cidade} - ${selectedPet.localizacao.Estado}` : 'Local n/d'}</span>
                </div>

                <div style={{ flex: 1 }}>
                  <h4 style={{ color: '#333', marginBottom: '8px' }}>História</h4>
                  <p style={{ color: '#666', lineHeight: '1.6', fontSize: '15px', whiteSpace: 'pre-line' }}>
                    {selectedPet.Descricao || 'Este amiguinho ainda não tem uma descrição detalhada, mas com certeza está ansioso por um novo lar!'}
                  </p>
                </div>

                <div style={{ marginTop: '30px', padding: '20px', background: '#fafafa', borderRadius: '20px', border: '1px solid #f0f0f0' }}>
                  {mensagemSucesso ? (
                    <div style={{ color: '#2e7d32', fontWeight: '700', textAlign: 'center' }}>✅ {mensagemSucesso}</div>
                  ) : (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                        <span style={{ fontSize: '24px' }}>👤</span>
                        <div>
                          <p style={{ margin: 0, fontSize: '12px', color: '#999' }}>POSTADO POR</p>
                          <p style={{ margin: 0, fontWeight: '700' }}>{selectedPet.doador?.Nome || 'Abrigo Parceiro'}</p>
                        </div>
                      </div>

                      {isLoggedIn ? (
                        user?.Perfil === 'Adotante' ? (
                          <button 
                            className="adotar-btn" 
                            style={{ width: '100%', padding: '15px' }}
                            onClick={() => handleSolicitarAdocao(selectedPet.idPet)}
                            disabled={solicitando}
                          >
                            {solicitando ? 'Enviando...' : '🐾 Solicitar Adoção'}
                          </button>
                        ) : (
                          <p style={{ fontSize: '13px', color: '#e65100', textAlign: 'center' }}>
                            Apenas perfis de <strong>Adotante</strong> podem solicitar adoções.
                          </p>
                        )
                      ) : (
                        <Link to="/login" className="adotar-btn" style={{ textAlign: 'center', display: 'block', textDecoration: 'none' }}>
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
