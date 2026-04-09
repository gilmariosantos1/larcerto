import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import VLibras from '../components/VLibras'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useNotificacao } from '../components/Notificacao'
import '../styles/querodoar.css'

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
    if (!isLoggedIn) {
      navigate('/login')
    }
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

    // Usando FormData para enviar arquivo + campos de texto
    const formData = new FormData()
    formData.append('Nome', form.Nome)
    formData.append('Tipo', form.Tipo)
    formData.append('Porte', form.Porte)
    formData.append('Genero', form.Genero)
    formData.append('Idade', form.Idade)
    formData.append('Descricao', form.Descricao)
    formData.append('Cidade', form.Cidade)
    formData.append('Estado', form.Estado)
    formData.append('Img', imageFile) // O nome 'Img' deve bater com o upload.single('Img') no backend

    try {
      await api.post('/pets', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      notify('Pet cadastrado com sucesso!', 'success')
      setConcluido(true)
    } catch (err) {
      console.error('ERRO AO ENVIAR PET:', err)
      const msg = err.response?.data?.error || 'Erro ao cadastrar pet. Verifique os dados e a foto.'
      notify(msg, 'error')
      setErro(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />

      <section className="hero-banner">
        <h2>Quero Doar um Pet 🐾</h2>
        <p>Preencha os dados e escolha uma foto bem bonita para o seu pet!</p>
      </section>

      <main className="container" style={{ maxWidth: '750px', margin: '40px auto' }}>
        {concluido ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</p>
            <h2 style={{ color: '#2d2de4', fontSize: '28px', marginBottom: '12px' }}>Compartilhado com sucesso!</h2>
            <p style={{ color: '#666', marginBottom: '24px' }}>
              O pet <strong>{form.Nome}</strong> já está na nossa vitrine aguardando um novo lar.
            </p>
            <button
              onClick={() => { setConcluido(false); setForm({ Nome: '', Tipo: '', Porte: '', Genero: '', Idade: '', Descricao: '', Cidade: '', Estado: '' }); setImageFile(null); setImagePreview('') }}
              style={{ padding: '12px 28px', background: '#2d2de4', color: '#fff', border: 'none', borderRadius: '30px', fontWeight: '700', cursor: 'pointer', marginRight: '12px' }}
            >
              Cadastrar outro pet
            </button>
            <button
              onClick={() => navigate('/adotar')}
              style={{ padding: '12px 28px', background: 'transparent', color: '#2d2de4', border: '2px solid #2d2de4', borderRadius: '30px', fontWeight: '700', cursor: 'pointer' }}
            >
              Ver pets disponíveis
            </button>
          </div>
        ) : (
          <form className="querodoar-form" onSubmit={handleSubmit}>

            <div style={{ background: '#f0f4ff', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '32px' }}>👤</span>
              <div>
                <strong style={{ color: '#2d2de4' }}>{user?.Nome}</strong>
                <p style={{ fontSize: '13px', color: '#666', margin: 0 }}>Doador responsável · {user?.Telefone || 'WhatsApp cadastrado'}</p>
              </div>
            </div>

            {erro && (
              <div style={{ color: '#d32f2f', background: '#ffebee', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
                ⚠️ {erro}
              </div>
            )}

            <fieldset>
              <legend>Identidade do Pet</legend>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label htmlFor="Nome">Nome do pet *</label>
                  <input
                    type="text" id="Nome" name="Nome"
                    placeholder="Ex: Bolinha"
                    value={form.Nome} onChange={handleChange} required
                  />
                </div>
                <div>
                  <label htmlFor="Tipo">Espécie *</label>
                  <select id="Tipo" name="Tipo" value={form.Tipo} onChange={handleChange} required>
                    <option value="">Selecione</option>
                    <option value="cao">🐶 Cachorro</option>
                    <option value="gato">🐱 Gato</option>
                    <option value="outro">🐾 Outro</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginTop: '15px' }}>
                <div>
                  <label htmlFor="Porte">Porte</label>
                  <select id="Porte" name="Porte" value={form.Porte} onChange={handleChange}>
                    <option value="">Selecione</option>
                    <option value="P">Pequeno</option>
                    <option value="M">Médio</option>
                    <option value="G">Grande</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="Genero">Sexo</label>
                  <select id="Genero" name="Genero" value={form.Genero} onChange={handleChange}>
                    <option value="">Selecione</option>
                    <option value="Macho">Macho</option>
                    <option value="Femea">Fêmea</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="Idade">Idade aprox.</label>
                  <input
                    type="text" id="Idade" name="Idade"
                    placeholder="Ex: 2 anos"
                    value={form.Idade} onChange={handleChange}
                  />
                </div>
              </div>

              <label htmlFor="Descricao" style={{ marginTop: '15px' }}>História e Personalidade</label>
              <textarea 
                id="Descricao" name="Descricao" 
                placeholder="Conte um pouco sobre o temperamento, se é vacinado, se convive bem com outros animais..."
                value={form.Descricao} onChange={handleChange}
                style={{ height: '120px', resize: 'vertical' }}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
                <div>
                  <label htmlFor="Cidade">Cidade *</label>
                  <input
                    type="text" id="Cidade" name="Cidade"
                    placeholder="Ex: São Paulo"
                    value={form.Cidade} onChange={handleChange} required
                  />
                </div>
                <div>
                  <label htmlFor="Estado">Estado *</label>
                  <select id="Estado" name="Estado" value={form.Estado} onChange={handleChange} required>
                    <option value="">UF</option>
                    {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(uf => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                </div>
              </div>
            </fieldset>

            <fieldset style={{ marginTop: '20px' }}>
              <legend>Foto do Amiguinho</legend>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '15px' }}>
                Escolha uma foto clara e nítida para aumentar as chances de adoção.
              </p>
              
              <div style={{ 
                border: '2px dashed #ddd', padding: '20px', borderRadius: '15px', textAlign: 'center',
                background: '#fafafa', cursor: 'pointer', position: 'relative'
              }}>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  style={{ opacity: 0, position: 'absolute', inset: 0, cursor: 'pointer' }}
                />
                {!imagePreview ? (
                  <div>
                    <span style={{ fontSize: '40px' }}>📷</span>
                    <p style={{ margin: '10px 0 0', fontWeight: '600' }}>Clique para selecionar a foto</p>
                    <small style={{ color: '#999' }}>JPG, PNG ou WebP (Máx. 5MB)</small>
                  </div>
                ) : (
                  <div style={{ position: 'relative' }}>
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '10px' }} 
                    />
                    <p style={{ marginTop: '5px', fontSize: '12px', color: '#2d2de4' }}>Clique para trocar a foto</p>
                  </div>
                )}
              </div>
            </fieldset>

            <button type="submit" className="adotar-btn" style={{ width: '100%', marginTop: '30px', padding: '18px' }} disabled={loading}>
              {loading ? 'Processando upload...' : '🐾 Publicar anúncio de adoção'}
            </button>
          </form>
        )}
      </main>

      <VLibras />
      <Footer />
    </>
  )
}
