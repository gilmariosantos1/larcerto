import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import VLibras from '../components/VLibras'
import { useNotificacao } from '../components/Notificacao'
import '../styles/doe.css'

export default function Doe() {
  const { notify } = useNotificacao()

  const handleDonate = () => {
    notify('Funcionalidade de pagamento em breve! Obrigado pelo interesse.', 'info')
  }

  return (
    <div style={{ background: '#fdfdfd', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Hero Premium */}
      <section className="apoio-hero">
        <h1>
          Apoie e transforme<br />
          <span>vidas hoje.</span>
        </h1>
        <p>
          O Lar Certo é 100% gratuito para abrigos e adotantes. 
          Sua contribuição mantém nossa plataforma no ar e ajuda 
          instituições parceiras a comprar ração e remédios.
        </p>
        
        <div className="apoio-hero-stats">
          <div className="apoio-stat-item">
            <strong>12.5K</strong>
            <span>Vidas Salvas</span>
          </div>
          <div className="apoio-stat-item">
            <strong>100%</strong>
            <span>Transparência</span>
          </div>
          <div className="apoio-stat-item">
            <strong>48+</strong>
            <span>Abrigos Apoiados</span>
          </div>
        </div>
      </section>

      <main style={{ flex: 1 }}>
        {/* Opções de Apoio */}
        <section className="apoio-opcoes-section" id="opcoes">
          <div className="apoio-section-header">
            <h2>Escolha como impactar</h2>
            <p>Toda contribuição financeira é fundamental para mantermos nossa missão viva.</p>
          </div>

          <div className="apoio-grid">
            {/* Opção 1 */}
            <div className="apoio-card">
              <div className="apoio-icon-wrapper">💖</div>
              <h3>Doação Única</h3>
              <p>Uma ajuda pontual que faz muita diferença agora. Ideal para campanhas de emergência ou custos veterinários inesperados.</p>
              <button className="apoio-btn" onClick={handleDonate}>
                Doar qualquer valor
              </button>
            </div>

            {/* Opção 2 (Destaque) */}
            <div className="apoio-card" style={{ transform: 'scale(1.05)', zIndex: 10, borderColor: '#2d2de4', boxShadow: '0 20px 50px rgba(45, 45, 228, 0.15)' }}>
              <div className="apoio-icon-wrapper" style={{ background: 'linear-gradient(135deg, #2d2de4, #5052d4)', color: '#fff' }}>🌟</div>
              <h3>Padrinho Fiel</h3>
              <p>Doe um valor mensal e garanta a estabilidade do nosso trabalho. Você recebe relatórios anuais sobre o impacto da sua doação.</p>
              <button className="apoio-btn destaque" onClick={handleDonate}>
                Assinar mensalmente
              </button>
            </div>
          </div>
        </section>

        {/* Transparência */}
        <section className="apoio-transparencia">
          <div className="transparencia-content">
            <div className="transparencia-text">
              <h2>Para onde vai o seu dinheiro?</h2>
              <p>
                Acreditamos que a transparência é a base da confiança. Todo o valor arrecadado
                pelo Lar Certo tem um destino muito claro e auditável.
              </p>
              <p>
                Não operamos visando lucro. Nossa equipe técnica é voluntária, e os custos 
                são estritamente operacionais e voltados ao bem-estar animal.
              </p>
            </div>
            
            <div className="transparencia-stats">
              <div className="t-stat">
                <span className="t-stat-icon">💻</span>
                <span className="t-stat-valor">30%</span>
                <span className="t-stat-label">Servidores e Manutenção do App</span>
              </div>
              <div className="t-stat">
                <span className="t-stat-icon">🐾</span>
                <span className="t-stat-valor">50%</span>
                <span className="t-stat-label">Fundo de Emergência Vet/Abrigos</span>
              </div>
              <div className="t-stat">
                <span className="t-stat-icon">📢</span>
                <span className="t-stat-valor">20%</span>
                <span className="t-stat-label">Marketing p/ Impulsionar Adoções</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Básica */}
        <section className="apoio-faq">
          <div className="apoio-section-header">
            <h2>Dúvidas Frequentes</h2>
          </div>
          
          <div className="faq-item">
            <h4>💡 É seguro doar pelo site?</h4>
            <p>Sim. Utilizamos gateways de pagamento reconhecidos no mercado, as transações são criptografadas e não armazenamos dados de cartão de crédito.</p>
          </div>
          
          <div className="faq-item">
            <h4>💡 Posso cancelar minha doação mensal?</h4>
            <p>A qualquer momento e sem nenhuma burocracia. Basta acessar seu perfil e clicar em "Cancelar assinatura".</p>
          </div>

          <div className="faq-item">
            <h4>💡 Aceitam doação de ração?</h4>
            <p>Sim! Entre em contato conosco na seção de Contato para vermos o ponto de coleta mais próximo da sua residência.</p>
          </div>
        </section>
      </main>

      <VLibras />
      <Footer />
    </div>
  )
}
