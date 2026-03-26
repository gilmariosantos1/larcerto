import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p className="footer-tagline">Transformando vidas através da adoção responsável. Encontre seu melhor amigo hoje no Lar Certo.</p>
          <div className="footer-socials">
            <a href="#">📸</a>
            <a href="#">📘</a>
            <a href="#">🐦</a>
          </div>
        </div>

        <div className="footer-nav">
          <h4>Plataforma</h4>
          <Link to="/">Início</Link>
          <Link to="/adotar">Quero Adotar</Link>
          <Link to="/blog">Blog & Notícias</Link>
          <Link to="/doe">Como Ajudar</Link>
        </div>

        <div className="footer-legal">
          <h4>Suporte</h4>
          <Link to="/contato">Fale Conosco</Link>
          <Link to="/privacidade">Privacidade</Link>
          <Link to="/termos">Termos de Uso</Link>
          <Link to="/sobre">Sobre Nós</Link>
        </div>

        <div className="footer-newsletter">
          <h4>Fique por dentro</h4>
          <p>Receba novidades e alertas de novos pets para adoção.</p>
          <div className="newsletter-box">
            <input type="email" placeholder="Seu e-mail" />
            <button>Assinar</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom container">
        <p>© 2025 Lar Certo. Feito com ❤️ para todos os pets.</p>
        <p>Desenvolvido com tecnologia Supreme.</p>
      </div>
    </footer>
  )
}
