import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import VLibras from '../components/VLibras'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import '../styles/lares.css'

// Fix ícone padrão do Leaflet no Vite
const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconAnchor: [12, 41],
})

const lares = [
  {
    nome: 'Abrigo Amigo Pet',
    lat: -23.5505, lon: -46.6333,
    local: 'São Paulo - SP',
    telefone: '(11) 99999-9999',
    img: '/img/lares/como-ajudar-ong-de-animais-petlove1.jpg',
  },
  {
    nome: 'Lar dos Focinhos',
    lat: -22.9068, lon: -43.1729,
    local: 'Rio de Janeiro - RJ',
    telefone: '(21) 98888-8888',
    img: '/img/lares/vista-elevada-de-um-mao-humana-afagar-cao.jpg',
  },
  {
    nome: 'Patinhas Felizes',
    lat: -19.9191, lon: -43.9386,
    local: 'Belo Horizonte - MG',
    telefone: '(31) 97777-7777',
    img: '/img/lares/vulneravel-728x472-copiar.jpg',
  },
]

export default function Lares() {
  return (
    <>
      <Navbar />

      <section className="hero-banner">
        <h2>Encontre Lares de Adoção 🏡</h2>
        <p>Descubra ONGs e abrigos próximos que têm animais esperando por um novo lar cheio de amor.</p>
      </section>

      <main className="container">
        <h2 style={{ textAlign: 'center', color: '#2d2de4', margin: '24px 0', fontSize: '28px' }}>
          Lares próximos de você
        </h2>

        <MapContainer
          center={[-23.5505, -46.6333]}
          zoom={5}
          style={{ height: '400px', borderRadius: '12px', marginBottom: '32px' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {lares.map((lar) => (
            <Marker key={lar.nome} position={[lar.lat, lar.lon]} icon={defaultIcon}>
              <Popup>
                <b>{lar.nome}</b><br />{lar.telefone}
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <div className="lares-grid">
          {lares.map((lar) => (
            <div className="lar-card" key={lar.nome}>
              <img src={lar.img} alt={lar.nome} />
              <h3>{lar.nome}</h3>
              <p>Local: {lar.local}</p>
              <p>Telefone: {lar.telefone}</p>
              <a href="#" className="lar-btn">Ver animais</a>
            </div>
          ))}
        </div>
      </main>

      <VLibras />
      <Footer />
    </>
  )
}
