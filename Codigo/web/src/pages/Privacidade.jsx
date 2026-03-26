import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import VLibras from '../components/VLibras'
import '../styles/terms.css'

export default function Privacidade() {
  return (
    <>
      <Navbar />
      <div className="container terms-container">
        <h1>Política de Privacidade</h1>
        <p>Última atualização: março de 2025</p>

        <h2>1. Informações Coletadas</h2>
        <p>Coletamos informações fornecidas voluntariamente por você, como nome, e-mail e dados de pets cadastrados. Não compartilhamos seus dados com terceiros sem consentimento.</p>

        <h2>2. Uso das Informações</h2>
        <p>Suas informações são usadas exclusivamente para melhorar sua experiência na plataforma e facilitar processos de adoção e doação.</p>

        <h2>3. Segurança</h2>
        <p>Adotamos medidas de segurança para proteger seus dados contra acesso não autorizado.</p>

        <h2>4. Contato</h2>
        <p>Em caso de dúvidas sobre esta política, entre em contato: <a href="/contato">clique aqui</a>.</p>
      </div>
      <VLibras />
      <Footer />
    </>
  )
}
