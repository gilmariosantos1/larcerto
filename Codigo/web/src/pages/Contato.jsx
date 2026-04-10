import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import VLibras from '../components/VLibras'

export default function Contato() {
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setEnviado(true)
  }

  return (
    <>
      <Navbar />

      <section className="hero-banner">
        <h2>Entre em Contato 📩</h2>
        <p>Tem alguma dúvida, sugestão ou quer colaborar conosco? Fale com a gente!</p>
      </section>

      <main className="container" style={{ maxWidth: '700px', margin: '40px auto' }}>
        {enviado ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h2 style={{ color: '#2d2de4', fontSize: '28px', marginBottom: '12px' }}>✅ Mensagem enviada!</h2>
            <p>Obrigado pelo contato! Responderemos em breve.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <label htmlFor="nome-contato">Nome</label>
            <input type="text" id="nome-contato" placeholder="Seu nome" required style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '15px' }} />

            <label htmlFor="email-contato">E-mail</label>
            <input type="email" id="email-contato" placeholder="seu@email.com" required style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '15px' }} />

            <label htmlFor="mensagem">Mensagem</label>
            <textarea id="mensagem" placeholder="Escreva sua mensagem aqui..." required rows={6} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '15px', resize: 'vertical' }} />

            <button type="submit" style={{ background: '#2d2de4', color: '#fff', border: 'none', padding: '14px', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
              Enviar Mensagem
            </button>
          </form>
        )}
      </main>

      <VLibras />
      <Footer />
    </>
  )
}
