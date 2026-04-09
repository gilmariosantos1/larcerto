import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Adotar from './pages/Adotar'
import Blog from './pages/Blog'
import Lares from './pages/Lares'
import Perdi from './pages/Perdi'
import SobreNos from './pages/SobreNos'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Perfil from './pages/Perfil'
import Doe from './pages/Doe'
import QuerDoar from './pages/QuerDoar'
import GerenciarAdocoes from './pages/GerenciarAdocoes'
import MinhasSolicitacoes from './pages/MinhasSolicitacoes'
import Privacidade from './pages/Privacidade'
import Terms from './pages/Terms'
import Contato from './pages/Contato'
import BackToTop from './components/BackToTop'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './pages/NotFound'
import Notificacao from './components/Notificacao'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adotar" element={<Adotar />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/lares" element={<Lares />} />
          <Route path="/perdi" element={<Perdi />} />
          <Route path="/sobre" element={<SobreNos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
          <Route path="/doe" element={<Doe />} />
          <Route path="/querodoar" element={<ProtectedRoute role="Doador"><QuerDoar /></ProtectedRoute>} />
          <Route path="/gerenciar-adocoes" element={<ProtectedRoute role="Doador"><GerenciarAdocoes /></ProtectedRoute>} />
          <Route path="/minhas-solicitacoes" element={<ProtectedRoute role="Adotante"><MinhasSolicitacoes /></ProtectedRoute>} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="/termos" element={<Terms />} />
          <Route path="/contato" element={<Contato />} />

          {/* ROTA 404 SUPREME */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BackToTop />
        <Notificacao />
      </BrowserRouter>
    </AuthProvider>
  )
}
