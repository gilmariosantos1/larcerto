import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function MinhasSolicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')
  const { user, isLoggedIn } = useAuth()

  const getImgUrl = (path) => {
    if (!path) return 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80';
    if (path.startsWith('http')) return path;
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    return `${baseUrl}${path}`;
  }

  useEffect(() => {
    async function fetchMinhas() {
      if (!isLoggedIn) return
      try {
        const res = await api.get('/adocoes/minhas')
        setSolicitacoes(res.data)
      } catch (err) {
        console.error('Erro ao buscar minhas solicitações:', err)
        setErro('Erro ao carregar solicitações.')
      } finally {
        setLoading(false)
      }
    }
    fetchMinhas()
  }, [isLoggedIn])

  return (
    <div style={{ background: '#f8f9ff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main className="container" style={{ flex: 1, paddingTop: '140px', paddingBottom: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '36px', fontWeight: '800', color: '#2d2de4' }}>
            Minhas Solicitações 🐾
          </h1>
          <p style={{ color: '#666', fontSize: '18px' }}>
            Acompanhe o status dos pets que você deseja adotar.
          </p>
        </div>

        {erro && <p style={{ textAlign: 'center', color: 'red' }}>{erro}</p>}

        {loading ? (
          <p style={{ textAlign: 'center' }}>Pesquisando seus pedidos...</p>
        ) : solicitacoes.length > 0 ? (
          <div style={{ display: 'grid', gap: '20px', maxWidth: '900px', margin: '0 auto' }}>
            {solicitacoes.map((sol) => (
              <div 
                key={sol.idDoacao} 
                style={{ 
                  background: '#fff', borderRadius: '24px', padding: '25px', 
                  display: 'flex', flexDirection: 'column', gap: '20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  border: sol.Status === 'aprovado' ? '1.5px solid #4CAF50' : '1px solid #eee'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                  <div style={{ position: 'relative' }}>
                    <img 
                      src={getImgUrl(sol.pet?.Img)} 
                      alt={sol.pet?.Nome} 
                      style={{ width: '100px', height: '100px', borderRadius: '20px', objectFit: 'cover' }}
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80' }}
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 5px', fontSize: '20px' }}>
                      Adoção de <strong>{sol.pet?.Nome}</strong>
                    </h3>
                    <div style={{ display: 'flex', gap: '15px', color: '#666', fontSize: '14px' }}>
                      <span>👤 Doador: {sol.pet?.doador?.Nome || 'Desconhecido'}</span>
                      <span>🕒 Feita em: {new Date(sol.DataSolicitacao).toLocaleDateString('pt-BR')}</span>
                    </div>
                    
                    <div style={{ marginTop: '10px' }}>
                      <span style={{ 
                        padding: '4px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: '800',
                        background: sol.Status === 'pendente' ? '#fff3e0' : sol.Status === 'aprovado' ? '#e8f5e9' : '#ffebee',
                        color: sol.Status === 'pendente' ? '#e65100' : sol.Status === 'aprovado' ? '#2e7d32' : '#c62828',
                        textTransform: 'uppercase'
                      }}>
                        STATUS: {sol.Status}
                      </span>
                    </div>
                  </div>

                  {}
                </div>

                {}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <span style={{ fontSize: '60px' }}>🏠</span>
            <h3 style={{ color: '#999', marginTop: '20px' }}>Nenhuma solicitação feita ainda.</h3>
            <p style={{ color: '#ccc' }}>Vá para a vitrine e encontre seu novo melhor amigo!</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
