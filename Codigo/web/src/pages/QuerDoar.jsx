import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import VLibras from '../components/VLibras'
import '../styles/querodoar.css'

export default function QuerDoar() {
  const [etapa, setEtapa] = useState(1)
  const [doacao, setDoacao] = useState({ tipo: '', raca: '', idade: '', sexo: '', descricao: '', foto: null })
  const [concluido, setConcluido] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setConcluido(true)
  }

  return (
    <>
      <Navbar />

      <section className="hero-banner">
        <h2>Quero Doar um Pet 🐾</h2>
        <p>Preencha o formulário para anunciar seu pet para adoção de forma responsável.</p>
      </section>

      <main className="container" style={{ maxWidth: '700px', margin: '40px auto' }}>
        {concluido ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h2 style={{ color: '#2d2de4', fontSize: '28px', marginBottom: '12px' }}>🎉 Anúncio enviado!</h2>
            <p>Seu pet foi cadastrado. Entraremos em contato em breve. Obrigado!</p>
          </div>
        ) : (
          <form className="querodoar-form" onSubmit={handleSubmit}>
            <fieldset>
              <legend>Dados do Pet para Doação</legend>

              <label htmlFor="tipo-doacao">Tipo de Animal</label>
              <select id="tipo-doacao" required>
                <option value="">Selecione</option>
                <option value="cachorro">Cachorro</option>
                <option value="gato">Gato</option>
                <option value="outro">Outro</option>
              </select>

              <label htmlFor="raca-doacao">Raça</label>
              <input type="text" id="raca-doacao" placeholder="Ex: Vira-lata" required />

              <label htmlFor="idade-doacao">Idade</label>
              <input type="text" id="idade-doacao" placeholder="Ex: 1 ano" required />

              <label htmlFor="sexo-doacao">Sexo</label>
              <select id="sexo-doacao" required>
                <option value="">Selecione</option>
                <option value="macho">Macho</option>
                <option value="femea">Fêmea</option>
              </select>

              <label htmlFor="desc-doacao">Descrição</label>
              <textarea id="desc-doacao" placeholder="Conte um pouco sobre o pet: personalidade, hábitos..." required />

              <label htmlFor="foto-doacao">Foto do Pet</label>
              <input type="file" id="foto-doacao" accept="image/*" required />
            </fieldset>

            <fieldset>
              <legend>Seus Contatos</legend>
              <label htmlFor="nome-doador">Seu Nome</label>
              <input type="text" id="nome-doador" placeholder="Nome completo" required />

              <label htmlFor="tel-doador">Telefone / WhatsApp</label>
              <input type="tel" id="tel-doador" placeholder="(99) 99999-9999" required />

              <label htmlFor="email-doador">E-mail</label>
              <input type="email" id="email-doador" placeholder="exemplo@email.com" required />
            </fieldset>

            <button type="submit" className="adotar-btn" style={{ width: '100%', marginTop: '16px' }}>
              Anunciar Pet
            </button>
          </form>
        )}
      </main>

      <VLibras />
      <Footer />
    </>
  )
}
