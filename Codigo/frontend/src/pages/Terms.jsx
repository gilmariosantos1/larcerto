import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import VLibras from '../components/VLibras'
import '../styles/terms.css'

export default function Terms() {
  return (
    <>
      <Navbar />
      <div className="container terms-container">
        <h1>Termos de Uso</h1>
        <p>Última atualização: março de 2025</p>

        <h2>1. Aceitação dos Termos</h2>
        <p>Ao utilizar o Lar Certo, você concorda com os presentes Termos de Uso. Caso não concorde, não utilize a plataforma.</p>

        <h2>2. Uso da Plataforma</h2>
        <p>A plataforma destina-se exclusivamente à divulgação de adoção responsável. É proibido anunciar animais para venda.</p>

        <h2>3. Responsabilidade</h2>
        <p>O Lar Certo não se responsabiliza por negociações realizadas fora da plataforma. Sempre verifique a procedência das informações.</p>

        <h2>4. Alterações</h2>
        <p>Reservamos o direito de alterar estes termos a qualquer momento. Alterações serão comunicadas na plataforma.</p>
      </div>
      <VLibras />
      <Footer />
    </>
  )
}
