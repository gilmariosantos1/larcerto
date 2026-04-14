import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MenuCards from '../components/MenuCards'
import VLibras from '../components/VLibras'
import '../styles/perdiumpet.css'

const petsPerdidos = [
  {
    img: '/img/adotar/istockphoto-2169620101-612x612.webp',
    nome: 'Rex',
    desc: 'Cachorro, 2 anos',
    local: 'Centro, Nossa Senhora da Glória - SE',
    contato: '(79) 99999-1111',
  },
  {
    img: '/img/adotar/cat-551554_1280.jpg',
    nome: 'Mimi',
    desc: 'Gato, 2 anos',
    local: 'Bairro Jardim, Nossa Senhora da Glória - SE',
    contato: '(79) 98888-2222',
  },
]

export default function Perdi() {
  const [form, setForm] = useState({ nomePet: '', tipoPet: '', idadePet: '', descricao: '', foto: null, cidade: '', bairro: '', detalhesLocal: '', nomeDono: '', telefone: '', email: '' })
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setEnviado(true)
    setTimeout(() => setEnviado(false), 4000)
  }

  return (
    <>
      <Navbar />
      <MenuCards />

      <section className="hero-banner">
        <h2>Perdeu seu amigo de quatro patas? 🐶🐱</h2>
        <p>Registre o seu pet perdido e ajude a comunidade a encontrá-lo rapidamente.</p>
      </section>

      <main className="container">
        <h2 className="section-title" style={{ textAlign: 'center', color: '#2d2de4', margin: '24px 0' }}>
          Registre seu Pet Perdido
        </h2>

        <form className="perdiumpet-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados do Pet</legend>
            <label>Nome do Pet</label>
            <input type="text" placeholder="Ex: Rex" required />
            <label>Tipo</label>
            <select required>
              <option value="">Selecione</option>
              <option value="cachorro">Cachorro</option>
              <option value="gato">Gato</option>
              <option value="outro">Outro</option>
            </select>
            <label>Idade aproximada</label>
            <input type="text" placeholder="Ex: 2 anos" required />
            <label>Descrição (raça, cor, características especiais)</label>
            <textarea placeholder="Ex: Pelagem preta, coleira vermelha, manchinha branca no peito" required />
          </fieldset>

          <fieldset>
            <legend>Foto do Pet</legend>
            <input type="file" accept="image/*" required />
          </fieldset>

          <fieldset>
            <legend>Última Localização Conhecida</legend>
            <label>Cidade</label>
            <input type="text" placeholder="Ex: Nossa Senhora da Glória - SE" required />
            <label>Bairro / Região</label>
            <input type="text" placeholder="Ex: Centro" required />
            <label>Detalhes adicionais</label>
            <textarea placeholder="Ex: Visto pela última vez perto do mercado, com coleira azul" required />
          </fieldset>

          <fieldset>
            <legend>Seus Contatos</legend>
            <label>Nome</label>
            <input type="text" placeholder="Seu nome" required />
            <label>Telefone / WhatsApp</label>
            <input type="tel" placeholder="(99) 99999-9999" required />
            <label>E-mail</label>
            <input type="email" placeholder="exemplo@email.com" />
          </fieldset>

          <button type="submit" className="perdiumpet-btn">Registrar Pet Perdido</button>
        </form>

        {enviado && (
          <div className="toast">✅ Pet registrado com sucesso! Entraremos em contato.</div>
        )}

        <h2 style={{ textAlign: 'center', color: '#2d2de4', margin: '36px 0 16px', fontSize: '26px' }}>
          Pets Perdidos Recentemente
        </h2>
        <div className="perdiumpet-grid">
          {petsPerdidos.map((pet) => (
            <div className="pet-card" key={pet.nome}>
              <img src={pet.img} alt={pet.nome} />
              <h3>{pet.nome}</h3>
              <p>{pet.desc}</p>
              <p>Última vez visto: {pet.local}</p>
              <p>Contato: {pet.contato}</p>
            </div>
          ))}
        </div>
      </main>

      <VLibras />
      <Footer />
    </>
  )
}
