import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MenuCards from '../components/MenuCards'
import VLibras from '../components/VLibras'

const initialPets = [
  { id: 1, nome: 'Rex', idade: '2 anos', local: 'Glória - SE', img: '/img/adotar/istockphoto-2169620101-612x612.webp', tipo: 'Cachorro' },
  { id: 2, nome: 'Luna', idade: '5 meses', local: 'Aracaju - SE', img: '/img/adotar/cat-551554_1280.jpg', tipo: 'Gato' },
  { id: 3, nome: 'Thor', idade: '3 anos', local: 'N. Sra. Glória - SE', img: '/img/adotar/OIP.jpg', tipo: 'Cachorro' },
  { id: 4, nome: 'Bela', idade: '1 ano', local: 'Lagarto - SE', img: '/img/adotar/OIP (1).jpg', tipo: 'Cachorro' },
]


export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [locationTerm, setLocationTerm] = useState('')
  const [pets, setPets] = useState(initialPets)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    const filtered = initialPets.filter(pet => 
      (pet.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
       pet.tipo.toLowerCase().includes(searchTerm.toLowerCase())) &&
      pet.local.toLowerCase().includes(locationTerm.toLowerCase())
    )
    setPets(filtered)
  }, [searchTerm, locationTerm])

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    )
  }

  return (
    <>
      <Navbar />

      <main className="container">
        {/* Supreme Bento Hero */}
        <section className="hero-bento">
          <div className="bento-main">
            <img src="/img/slids/pexels-akarsh-chandran-2156074716-34026965.jpg" alt="Hero" />
            <div className="bento-main-content">
              <h1 style={{ color: '#fff', fontSize: '48px', marginBottom: '15px' }}>Encontre sua <br/> melhor companhia.</h1>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', maxWidth: '400px' }}>Adote um amigo e transforme uma vida hoje mesmo no Lar Certo.</p>
            </div>

          </div>
          <div className="bento-side">
            <div className="bento-item">
              <h3>+500</h3>
              <p>Pets Adotados</p>
            </div>
            <div className="bento-item" style={{ background: '#2d2de4', color: '#fff' }}>
              <h3 style={{ color: '#fff' }}>Unidos</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)' }}>Pela Causa Animal</p>
            </div>
          </div>
        </section>

        {/* Filter Pill */}
        <section className="filter">
          <div className="filter-inputs">
            <input 
              type="text" 
              placeholder="Gato, Cachorro, Nome..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Cidade" 
              value={locationTerm}
              onChange={(e) => setLocationTerm(e.target.value)}
            />
            <button className="search-btn">🔍</button>
          </div>
        </section>

        <MenuCards />

        <div className="section-title" style={{ textAlign: 'center', margin: '60px 0 20px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800' }}>Pets Disponíveis</h2>
          <p style={{ color: '#666' }}>Novos amigos chegaram recentemente!</p>
        </div>

        <div className="pet-grid">
          {pets.map((pet) => (
            <div className="pet-card" key={pet.id} style={{ position: 'relative' }}>
              <button 
                className={`pet-card-fav ${favorites.includes(pet.id) ? 'active' : ''}`}
                onClick={() => toggleFavorite(pet.id)}
              >
                {favorites.includes(pet.id) ? '❤️' : '🤍'}
              </button>
              <img src={pet.img} alt={pet.nome} />
              <h3>{pet.nome}</h3>
              <p>{pet.idade} - {pet.local}</p>
            </div>
          ))}
        </div>

        <div className="ver-mais">
          <a href="/adotar" className="donate" style={{ display: 'inline-block', textDecoration: 'none' }}>
            Ver todos os amigos
          </a>
        </div>
      </main>

      <VLibras />
      <Footer />
    </>
  )
}
