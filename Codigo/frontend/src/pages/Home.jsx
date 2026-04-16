import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import VLibras from '../components/VLibras'
import api, { getImgUrl } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useNotificacao } from '../components/Notificacao'
import { Search, MessageCircle, HeartHandshake, PlusCircle } from 'lucide-react'

export default function Home() {
  const [pets, setPets] = useState([])
  const [filtrados, setFiltrados] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [locationTerm, setLocationTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })
  
  // State para o Modal
  const [selectedPet, setSelectedPet] = useState(null)
  const [solicitando, setSolicitando] = useState(false)
  const [mensagemSucesso, setMensagemSucesso] = useState('')
  const [erro, setErro] = useState('')

  const { isLoggedIn, user } = useAuth()
  const navigate = useNavigate()
  const { notify } = useNotificacao()

  // Busca pets da API ao carregar
  useEffect(() => {
    async function fetchPets() {
      try {
        const res = await api.get('/pets')
        const disponiveis = res.data.filter(p => p.Status === 'disponivel').slice(0, 4)
        setPets(disponiveis)
        setFiltrados(disponiveis)
      } catch (err) {
        console.error('Erro ao buscar pets:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPets()
  }, [])

  // Filtro por busca e cidade
  useEffect(() => {
    let resultado = pets
    if (searchTerm.trim()) {
      resultado = resultado.filter(p =>
        p.Nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.Tipo?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (locationTerm.trim()) {
      resultado = resultado.filter(p =>
        p.localizacao?.Cidade?.toLowerCase().includes(locationTerm.toLowerCase())
      )
    }
    setFiltrados(resultado)
  }, [searchTerm, locationTerm, pets])

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
      notify('Solicitação enviada! O doador entrará em contato.', 'success')
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

  const porteLabel = { P: 'Pequeno', M: 'Médio', G: 'Grande' }
  const tipoLabel = { cao: '🐶 Cão', gato: '🐱 Gato', outro: '🐾 Outro' }

  return (
    <>
      <Navbar />

      <main className="container">

        {/* Supreme Bento Hero */}
        <section className="hero-bento">
          <div className="bento-main">
            <img src="/img/slids/pexels-akarsh-chandran-2156074716-34026965.jpg" alt="Hero" />
            <div className="bento-main-content">
              <h1 style={{ color: '#fff', fontSize: '48px', marginBottom: '15px' }}>
                Encontre sua <br /> melhor companhia.
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', maxWidth: '400px' }}>
                Adote um amigo e transforme uma vida hoje mesmo no Lar Certo.
              </p>
            </div>
          </div>
          <div className="bento-side">
            <div className="bento-item">
              <h3>+500</h3>
              <p>Pets Adotados</p>
            </div>
            <div className="bento-item" style={{ background: '#2d2de4', color: '#fff' }}>
              <h3 style={{ color: '#fff' }}>Unidos</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)' }}>Pela Causa Animal</p>
            </div>
          </div>
        </section>

        {/* ================= COMPONENTE DE ONBOARDING (STEPS) ================= */}
        <section className="steps-section">
          <div className="section-title">
            <h2 style={{ fontSize: '36px', fontWeight: '900', color: '#1a1a1a' }}>Tão fácil quanto dar um carinho</h2>
            <p style={{ color: '#666', fontSize: '18px' }}>O processo do Lar Certo foi criado para ser seguro, rápido e transparente.</p>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon-wrapper">
                <Search size={40} />
              </div>
              <h3>Busque o Match</h3>
              <p>Navegue pela lista, filtre por espécie ou cidade e encontre os pets que estão ansiosos para conhecer você.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon-wrapper">
                <MessageCircle size={40} />
              </div>
              <h3>Faça o Contato</h3>
              <p>Envie a sua solicitação com um clique e combine os detalhes diretamente com o responsável pelo pet.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon-wrapper">
                <HeartHandshake size={40} />
              </div>
              <h3>Complete a Família</h3>
              <p>Tudo certo? Leve seu novo melhor amigo para casa e comece uma jornada inesquecível de muito amor.</p>
            </div>
          </div>
        </section>

        <div className="section-title" style={{ textAlign: 'center', margin: '60px 0 20px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800' }}>Pets Disponíveis</h2>
          <p style={{ color: '#666' }}>Novos amigos chegaram recentemente!</p>
        </div>

        <div className="pet-grid">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="pet-card skeleton-card">
                <div className="skeleton skeleton-img" />
                <div style={{ padding: '15px' }}>
                  <div className="skeleton skeleton-text" />
                  <div className="skeleton skeleton-text-sm" />
                </div>
              </div>
            ))
          ) : filtrados.length > 0 ? (
            filtrados.map((pet) => (
              <div className="pet-card" key={pet.idPet} style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setSelectedPet(pet)}>
                {/* Badge de Espécie */}
                <span className="pet-card-type-badge">
                  {tipoLabel[pet.Tipo] || pet.Tipo}
                </span>

                <button
                  className={`pet-card-fav ${favorites.includes(pet.idPet) ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(pet.idPet) }}
                >
                  {favorites.includes(pet.idPet) ? '❤️' : '🤍'}
                </button>

                <div className="pet-card-img-container">
                    <img
                        src={getImgUrl(pet.Img)}
                        alt={pet.Nome}
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80' }}
                    />
                </div>

                <div className="pet-card-info" style={{ padding: '20px', textAlign: 'left' }}>
                    <h3 className="pet-card-name">{pet.Nome}</h3>
                    
                    <div className="pet-card-meta">
                        <span>🦴 {porteLabel[pet.Porte] || pet.Porte || 'Porte n/d'}</span>
                        <span>🚻 {pet.Genero || 'Gênero n/d'}</span>
                    </div>

                    <div className="pet-card-location" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#888', fontSize: '12px', marginTop: '10px' }}>
                        <span>📍 {pet.localizacao?.Cidade || 'Cidade n/d'}</span>
                        <span>• {pet.Idade || 'Idade n/d'}</span>
                    </div>

                    <button className="pet-card-cta">
                        Conhecer {pet.Nome} 🐾
                    </button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#666', padding: '40px' }}>
              Nenhum pet encontrado com essa busca.
            </p>
          )}
        </div>

        {/* ================= COMPONENTE EDUCACIONAL (DOADORES) ================= */}
        <section className="donor-cta-section">
          <div className="donor-cta-banner">
            <div className="donor-cta-content">
              <h2>Ajudou a resgatar?<br/>Nós ajudamos a doar.</h2>
              <p>O Lar Certo também é o seu espaço. Se você possui um amiguinho que precisa com urgência de um novo lar, nossa comunidade está pronta para ajudar. Anuncie de forma 100% gratuita.</p>
              <Link to="/cadastro" className="btn-primary">
                Começar a Doar <PlusCircle size={20} style={{ marginLeft: '4px' }} />
              </Link>
            </div>
            <div className="donor-cta-image"></div>
          </div>
        </section>

        <div className="ver-mais">
          <Link to="/adotar" className="donate" style={{ display: 'inline-block', textDecoration: 'none' }}>
            Ver todos os amigos
          </Link>
        </div>
      </main>

      <VLibras />
      <Footer />

      {/* MODAL DE DETALHES (SUPREME) */}
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

            <div className="modal-body-supreme" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', padding: '40px' }}>
              <div className="modal-img-container">
                <img 
                  src={getImgUrl(selectedPet.Img)} 
                  alt={selectedPet.Nome}
                  style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '24px' }}
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80' }}
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
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', color: '#666', fontSize: '13px', marginBottom: '20px' }}>
                  <span style={{ background: '#f5f5f5', padding: '4px 10px', borderRadius: '10px' }}>🦴 {porteLabel[selectedPet.Porte] || selectedPet.Porte || 'Porte n/d'}</span>
                  <span style={{ background: '#f5f5f5', padding: '4px 10px', borderRadius: '10px' }}>📅 {selectedPet.Idade || 'Idade n/d'}</span>
                  <span style={{ background: '#f5f5f5', padding: '4px 10px', borderRadius: '10px' }}>🚻 {selectedPet.Genero || 'Gênero n/d'}</span>
                </div>

                <div style={{ flex: 1 }}>
                  <h4 style={{ color: '#333', marginBottom: '8px', fontSize: '16px' }}>História e Personalidade</h4>
                  <p style={{ color: '#666', lineHeight: '1.6', fontSize: '14px', whiteSpace: 'pre-line' }}>
                    {selectedPet.Descricao || 'Este amiguinho ainda não tem uma descrição detalhada, mas com certeza está ansioso por um novo lar!'}
                  </p>
                </div>

                <div style={{ marginTop: '30px', padding: '20px', background: '#fafafa', borderRadius: '20px', border: '1px solid #f0f0f0' }}>
                  {mensagemSucesso ? (
                    <div style={{ color: '#2e7d32', fontWeight: '700', textAlign: 'center' }}>✅ {mensagemSucesso}</div>
                  ) : (
                    <>
                      {erro && <p style={{ color: '#d32f2f', fontSize: '12px', marginBottom: '10px', textAlign: 'center' }}>{erro}</p>}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                        <span style={{ fontSize: '24px' }}>👤</span>
                        <div>
                          <p style={{ margin: 0, fontSize: '11px', color: '#999' }}>DOADOR RESPONSÁVEL</p>
                          <p style={{ margin: 0, fontWeight: '700', fontSize: '14px' }}>{selectedPet.doador?.Nome || 'Abrigo Parceiro'}</p>
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
                        <button 
                          className="adotar-btn" 
                          style={{ width: '100%', padding: '15px' }}
                          onClick={() => navigate('/login')}
                        >
                          🔑 Faça login para adotar
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
