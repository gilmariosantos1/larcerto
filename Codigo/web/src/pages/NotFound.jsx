import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <div style={{ background: '#f8f9ff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main className="container" style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        paddingTop: '100px',
        textAlign: 'center'
      }}>
        <div style={{ position: 'relative', marginBottom: '40px' }}>
          {/* Ilustração Representativa de Pets Brincando */}
          <div style={{ fontSize: '120px', animation: 'float 3s ease-in-out infinite' }}>🐶⚽🐱</div>
          <style>
            {`
              @keyframes float {
                0%, 100% { transform: translateY(0) rotate(0); }
                50% { transform: translateY(-20px) rotate(5deg); }
              }
            `}
          </style>
        </div>

        <h1 style={{ 
          fontFamily: 'Outfit, sans-serif', 
          fontSize: '48px', 
          fontWeight: '900', 
          color: '#2d2de4',
          marginBottom: '15px' 
        }}>
          404 - Ops! Esse pet fugiu.
        </h1>
        
        <p style={{ 
          fontSize: '20px', 
          color: '#666', 
          maxWidth: '500px', 
          lineHeight: '1.6',
          marginBottom: '40px'
        }}>
          Parece que você tentou acessar uma página que não existe ou que foi brincar em outro lugar com os nossos amiguinhos.
        </p>

        <Link to="/" style={{
          background: '#2d2de4',
          color: '#fff',
          padding: '16px 40px',
          borderRadius: '40px',
          textDecoration: 'none',
          fontWeight: '800',
          fontSize: '18px',
          boxShadow: '0 10px 25px rgba(45, 45, 228, 0.3)',
          transition: 'all 0.3s'
        }}
        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          Voltar para a Segurança 🏠
        </Link>
      </main>

      <Footer />
    </div>
  );
}
