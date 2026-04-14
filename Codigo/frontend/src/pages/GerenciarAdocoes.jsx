import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useNotificacao } from '../components/Notificacao'
import { useNotificacoes } from '../hooks/useNotificacoes'

export default function GerenciarAdocoes() {
  const [solicitacoes, setSolicitacoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState('')
  const { user } = useAuth()
  const { notify } = useNotificacao()

  const getImgUrl = (path) => {
    if (!path) return 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80';
    if (path.startsWith('http')) return path;
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    return `${baseUrl}${path}`;
  }
  const { atualizarNotificacoes } = useNotificacoes()

  useEffect(() => {
    async function fetchSolicitacoes() {
      try {
        const res = await api.get('/adocoes/recebidas')
        setSolicitacoes(res.data)
      } catch (err) {
        console.error('Erro ao buscar solicitações:', err)
        setErro('Erro ao carregar solicitações.')
      } finally {
        setLoading(false)
      }
    }
    fetchSolicitacoes()
  }, [])

  const handleStatus = async (id, status) => {
    try {
      await api.put(`/adocoes/${id}`, { Status: status })
      const acao = status === 'aprovado' ? 'aprovada' : 'recusada'
      notify(`Solicitação ${acao} com sucesso!`, 'success')
      
      // Atualiza lista local
      setSolicitacoes(prev => 
        prev.map(s => s.idDoacao === id ? { ...s, Status: status } : s)
      )
      atualizarNotificacoes()
    } catch (err) {
      notify('Erro ao atualizar status.', 'error')
    }
  }

  return (
    <div style={{ background: '#f8f9ff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main className="container" style={{ flex: 1, paddingTop: '140px', paddingBottom: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '42px', fontWeight: '800', color: '#2d2de4' }}>
            Gerenciar Adoções 🐾
          </h1>
          <p style={{ color: '#666', fontSize: '18px' }}>
            Aqui você vê quem quer dar um novo lar para seus amiguinhos.
          </p>
        </div>

        {erro && <p style={{ textAlign: 'center', color: 'red' }}>{erro}</p>}

        {loading ? (
          <p style={{ textAlign: 'center' }}>Carregando solicitações...</p>
        ) : solicitacoes.length > 0 ? (
          <div style={{ display: 'grid', gap: '20px', maxWidth: '900px', margin: '0 auto' }}>
            {solicitacoes.map((sol) => (
              <div 
                key={sol.idDoacao} 
                style={{ 
                  background: '#fff', borderRadius: '24px', padding: '25px', 
                  display: 'flex', flexDirection: 'column', gap: '20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  border: sol.Status === 'pendente' ? '1.5px solid #2d2de433' : '1px solid #eee'
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
                  <div style={{ 
                    position: 'absolute', bottom: '-5px', right: '-5px', 
                    background: '#2d2de4', color: '#fff', width: '30px', height: '30px',
                    borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: '12px'
                  }}>
                    {sol.pet?.Tipo === 'cao' ? '🐶' : '🐱'}
                  </div>
                </div>

                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 5px', fontSize: '20px' }}>
                    <span style={{ color: '#2d2de4' }}>{sol.adotante?.Nome}</span> quer adotar <strong>{sol.pet?.Nome}</strong>
                  </h3>
                  <div style={{ display: 'flex', gap: '15px', color: '#666', fontSize: '14px' }}>
                    <span>📞 {sol.adotante?.Telefone || 'Sem telefone'}</span>
                    <span>🕒 {new Date(sol.DataSolicitacao).toLocaleDateString('pt-BR')}</span>
                  </div>
                  
                  <div style={{ marginTop: '10px' }}>
                    <span style={{ 
                      padding: '4px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: '800',
                      background: sol.Status === 'pendente' ? '#fff3e0' : sol.Status === 'aprovado' ? '#e8f5e9' : '#ffebee',
                      color: sol.Status === 'pendente' ? '#e65100' : sol.Status === 'aprovado' ? '#2e7d32' : '#c62828',
                      textTransform: 'uppercase'
                    }}>
                      {sol.Status}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                    {}

                  {sol.Status === 'pendente' && (
                    <>
                      <button 
                        onClick={() => handleStatus(sol.idDoacao, 'recusado')}
                        style={{ 
                          background: '#fff', color: '#666', border: '1.5px solid #eee',
                          padding: '10px 20px', borderRadius: '15px', cursor: 'pointer', fontWeight: '700'
                        }}
                      >
                        Recusar
                      </button>
                      <button 
                        onClick={() => handleStatus(sol.idDoacao, 'aprovado')}
                        style={{ 
                          background: '#2d2de4', color: '#fff', border: 'none',
                          padding: '10px 20px', borderRadius: '15px', cursor: 'pointer', fontWeight: '700'
                        }}
                      >
                        Aprovar
                      </button>
                    </>
                  )}
                </div>
                </div>

                {}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <span style={{ fontSize: '60px' }}>🏜️</span>
            <h3 style={{ color: '#999', marginTop: '20px' }}>Nenhuma solicitação recebida ainda.</h3>
            <p style={{ color: '#ccc' }}>Divulgue seus pets para encontrar adotantes!</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
