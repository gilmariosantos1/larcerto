import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import VLibras from '../components/VLibras'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useNotificacao } from '../components/Notificacao'

export default function Perfil() {
  const { user, isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()
  const { notify } = useNotificacao()

  const [meusPets, setMeusPets] = useState([])
  const [minhasAdocoes, setMinhasAdocoes] = useState([])
  const [loadingPets, setLoadingPets] = useState(true)
  const [abaAtiva, setAbaAtiva] = useState('info')

  useEffect(() => {
    if (!isLoggedIn) navigate('/login')
  }, [isLoggedIn, navigate])

  useEffect(() => {
    if (!isLoggedIn) return

    async function fetchDados() {
      try {
        const [petsRes, adocoesRes] = await Promise.all([
          api.get('/pets'),
          api.get('/adocoes').catch(() => ({ data: [] }))
        ])

        // Filtra pets do doador logado
        if (user?.Perfil === 'Doador') {
          const meus = petsRes.data.filter(p => p.doador?.idPessoa === user?.idPessoa)
          setMeusPets(meus)
        }

        // Filtra adoções do adotante logado
        if (user?.Perfil === 'Adotante') {
          const minhas = adocoesRes.data.filter(a => a.adotante?.idPessoa === user?.idPessoa)
          setMinhasAdocoes(minhas)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoadingPets(false)
      }
    }
    fetchDados()
  }, [isLoggedIn, user])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleExcluirPet = async (idPet, nome) => {
    if (!window.confirm(`Tem certeza que deseja remover o pet ${nome}? Esta ação é permanente e a foto será apagada do servidor.`)) return;

    try {
      await api.delete(`/pets/${idPet}`);
      setMeusPets(prev => prev.filter(p => p.idPet !== idPet));
      notify(`Pet ${nome} removido com sucesso!`, 'success');
    } catch (err) {
      console.error('Erro ao excluir pet:', err);
      notify('Erro ao excluir pet. Tente novamente.', 'error');
    }
  }

  const getInitial = () => (user?.Nome || user?.email || '?').charAt(0).toUpperCase()
  
  const getImgUrl = (path) => {
    if (!path) return 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80';
    if (path.startsWith('http')) return path;
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    return `${baseUrl}${path}`;
  }

  const statusBadge = {
    disponivel: { label: 'Disponível', color: '#4caf50' },
    adotado:    { label: 'Adotado',    color: '#9e9e9e' },
    pendente:   { label: 'Pendente',   color: '#ff9800' },
    aprovado:   { label: 'Aprovado',   color: '#4caf50' },
    recusado:   { label: 'Recusado',   color: '#f44336' }
  }

  return (
    <>
      <Navbar />

      <main style={{ minHeight: '100vh', background: '#f8f9ff', paddingTop: '120px', paddingBottom: '60px' }}>
        <div className="container" style={{ maxWidth: '900px' }}>

          {/* Card do perfil */}
          <div style={{
            background: 'white', borderRadius: '24px', padding: '40px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)', marginBottom: '24px',
            display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap'
          }}>
            {/* Avatar grande */}
            <div style={{
              width: '90px', height: '90px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #2d2de4, #5c4eff)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '36px', color: '#fff', fontWeight: '800', flexShrink: 0
            }}>
              {getInitial()}
            </div>

            <div style={{ flex: 1, minWidth: '200px' }}>
              <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#222', margin: '0 0 4px' }}>
                {user?.Nome}
              </h1>
              <p style={{ color: '#666', margin: '0 0 8px', fontSize: '15px' }}>{user?.email}</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{
                  background: user?.Perfil === 'Doador' ? '#fff3e0' : '#e8f5e9',
                  color: user?.Perfil === 'Doador' ? '#e65100' : '#2e7d32',
                  padding: '4px 14px', borderRadius: '30px', fontSize: '13px', fontWeight: '700'
                }}>
                  {user?.Perfil === 'Doador' ? '🏠 Doador' : '🐾 Adotante'}
                </span>
                {user?.Telefone && (
                  <span style={{ background: '#f5f5f5', color: '#555', padding: '4px 14px', borderRadius: '30px', fontSize: '13px' }}>
                    📱 {user.Telefone}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handleLogout}
              style={{
                padding: '10px 22px', background: 'transparent', border: '2px solid #eee',
                borderRadius: '12px', color: '#666', cursor: 'pointer', fontWeight: '600',
                fontSize: '14px', transition: 'all 0.2s'
              }}
              onMouseEnter={e => { e.target.style.borderColor = '#d32f2f'; e.target.style.color = '#d32f2f' }}
              onMouseLeave={e => { e.target.style.borderColor = '#eee'; e.target.style.color = '#666' }}
            >
              🚪 Sair
            </button>
          </div>

          {/* Abas */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            {['info', user?.Perfil === 'Doador' ? 'pets' : 'adocoes'].map(aba => (
              <button
                key={aba}
                onClick={() => setAbaAtiva(aba)}
                style={{
                  padding: '10px 22px', borderRadius: '30px', border: 'none', cursor: 'pointer',
                  fontWeight: '700', fontSize: '14px', transition: 'all 0.2s',
                  background: abaAtiva === aba ? '#2d2de4' : '#fff',
                  color: abaAtiva === aba ? '#fff' : '#666',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}
              >
                {aba === 'info' && '👤 Meus Dados'}
                {aba === 'pets' && '🐾 Meus Pets'}
                {aba === 'adocoes' && '📋 Minhas Adoções'}
              </button>
            ))}
          </div>

          {/* Aba: Meus Dados */}
          {abaAtiva === 'info' && (
            <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '24px', color: '#222' }}>Informações da conta</h2>
              {[
                { label: 'Nome completo', value: user?.Nome },
                { label: 'E-mail', value: user?.email },
                { label: 'Telefone', value: user?.Telefone || 'Não cadastrado' },
                { label: 'Perfil', value: user?.Perfil },
              ].map(({ label, value }) => (
                <div key={label} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f5f5f5' }}>
                  <p style={{ fontSize: '12px', color: '#999', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</p>
                  <p style={{ fontSize: '16px', color: '#333', margin: 0, fontWeight: '600' }}>{value}</p>
                </div>
              ))}
            </div>
          )}

          {/* Aba: Meus Pets (Doador) */}
          {abaAtiva === 'pets' && user?.Perfil === 'Doador' && (
            <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px', color: '#222', margin: 0 }}>
                  Pets que você cadastrou ({meusPets.length})
                </h2>
                <Link to="/querodoar" style={{
                  padding: '10px 20px', background: '#2d2de4', color: '#fff',
                  borderRadius: '12px', textDecoration: 'none', fontSize: '14px', fontWeight: '700'
                }}>
                  + Cadastrar pet
                </Link>
              </div>
              {loadingPets ? (
                <p style={{ color: '#999' }}>Carregando...</p>
              ) : meusPets.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <p style={{ fontSize: '48px' }}>🐾</p>
                  <p style={{ color: '#666' }}>Você ainda não cadastrou nenhum pet.</p>
                  <Link to="/querodoar" style={{ color: '#2d2de4', fontWeight: '700' }}>Cadastrar primeiro pet →</Link>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                  {meusPets.map(pet => (
                    <div key={pet.idPet} style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #f0f0f0', background: '#fafafa', position: 'relative' }}>
                      <img
                        src={getImgUrl(pet.Img)}
                        alt={pet.Nome}
                        style={{ width: '100%', height: '140px', objectFit: 'cover' }}
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80' }}
                      />
                      <button 
                        onClick={() => handleExcluirPet(pet.idPet, pet.Nome)}
                        style={{
                          position: 'absolute', top: '10px', right: '10px', 
                          background: 'rgba(211, 47, 47, 0.9)', color: '#fff', 
                          border: 'none', borderRadius: '8px', padding: '5px 8px',
                          cursor: 'pointer', fontSize: '12px', fontWeight: '800',
                          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                        }}
                      >
                        🗑️ Excluir
                      </button>
                      <div style={{ padding: '12px' }}>
                        <strong>{pet.Nome}</strong>
                        <p style={{ fontSize: '12px', color: '#999', margin: '4px 0 8px' }}>{pet.Tipo} · {pet.Porte}</p>
                        <span style={{
                          fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px',
                          background: statusBadge[pet.Status]?.color + '20',
                          color: statusBadge[pet.Status]?.color
                        }}>
                          {statusBadge[pet.Status]?.label || pet.Status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Aba: Minhas Adoções (Adotante) */}
          {abaAtiva === 'adocoes' && user?.Perfil === 'Adotante' && (
            <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontSize: '20px', color: '#222', marginBottom: '24px' }}>
                Minhas solicitações de adoção ({minhasAdocoes.length})
              </h2>
              {loadingPets ? (
                <p style={{ color: '#999' }}>Carregando...</p>
              ) : minhasAdocoes.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <p style={{ fontSize: '48px' }}>🐾</p>
                  <p style={{ color: '#666' }}>Você ainda não solicitou nenhuma adoção.</p>
                  <Link to="/adotar" style={{ color: '#2d2de4', fontWeight: '700' }}>Ver pets disponíveis →</Link>
                </div>
              ) : (
                minhasAdocoes.map(adocao => (
                  <div key={adocao.idDoacao} style={{ padding: '16px', border: '1px solid #f0f0f0', borderRadius: '12px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ position: 'relative' }}>
                      <img 
                        src={getImgUrl(adocao.pet?.Img)} 
                        alt={adocao.pet?.Nome} 
                        style={{ width: '50px', height: '50px', borderRadius: '10px', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <strong>{adocao.pet?.Nome}</strong>
                      <p style={{ fontSize: '13px', color: '#999', margin: '4px 0 0' }}>
                        Solicitado em {new Date(adocao.DataSolicitacao).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <span style={{
                      fontSize: '12px', fontWeight: '700', padding: '4px 14px', borderRadius: '20px',
                      background: statusBadge[adocao.Status]?.color + '20',
                      color: statusBadge[adocao.Status]?.color
                    }}>
                      {statusBadge[adocao.Status]?.label || adocao.Status}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </main>

      <VLibras />
      <Footer />
    </>
  )
}
