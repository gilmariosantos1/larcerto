import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Adotar from './pages/Adotar'
import Blog from './pages/Blog'
import Lares from './pages/Lares'
import Perdi from './pages/Perdi'
import SobreNos from './pages/SobreNos'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Doe from './pages/Doe'
import QuerDoar from './pages/QuerDoar'
import Privacidade from './pages/Privacidade'
import Terms from './pages/Terms'
import Contato from './pages/Contato'
import BackToTop from './components/BackToTop'

export default function App() {
  return (
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
        <Route path="/doe" element={<Doe />} />
        <Route path="/querodoar" element={<QuerDoar />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route path="/termos" element={<Terms />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
      <BackToTop />
    </BrowserRouter>
  )
}

