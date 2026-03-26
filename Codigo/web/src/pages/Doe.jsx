import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import VLibras from '../components/VLibras'
import '../styles/doe.css'

export default function Doe() {
  return (
    <>
      <Navbar />

      <section className="hero-banner">
        <h2>Faça Parte da Mudança 🐶🐱</h2>
        <p>Com sua ajuda, podemos salvar vidas, oferecer cuidados e encontrar lares amorosos para animais abandonados.</p>
        <a href="#opcoes" className="cta-btn">Quero Ajudar</a>
      </section>

      <main className="container" id="opcoes">
        <h2 style={{ textAlign: 'center', color: '#2d2de4', margin: '32px 0 24px', fontSize: '28px' }}>
          Como Você Pode Ajudar
        </h2>

        <div className="donate-options">
          <div className="donate-card">
            <div className="donate-icon">💳</div>
            <h3>Doação Única</h3>
            <p>Contribua uma vez e faça a diferença na vida de um animal hoje mesmo.</p>
            <button>Doar agora</button>
          </div>

          <div className="donate-card">
            <div className="donate-icon">🔁</div>
            <h3>Doação Mensal</h3>
            <p>Seja um apoiador recorrente e ajude a garantir a continuidade do nosso trabalho.</p>
            <button>Assinar doação</button>
          </div>

          <div className="donate-card">
            <div className="donate-icon">🤝</div>
            <h3>Seja Voluntário</h3>
            <p>Doe seu tempo em eventos, feiras de adoção e cuidados com os pets resgatados.</p>
            <button>Inscreva-se</button>
          </div>
        </div>
      </main>

      <section className="final-cta">
        <h2>Juntos podemos mudar vidas ❤️</h2>
        <p>Cada contribuição é um passo a mais para dar um lar feliz a quem mais precisa.</p>
        <a href="#opcoes" className="cta-btn">Ajudar Agora</a>
      </section>

      <VLibras />
      <Footer />
    </>
  )
}
