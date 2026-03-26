import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MenuCards from '../components/MenuCards'
import VLibras from '../components/VLibras'
import '../styles/adotar.css'

const initialAnimals = [
  { id: 1, nome: 'Rex', idade: '2 anos', local: 'Glória - SE', img: '/img/adotar/istockphoto-2169620101-612x612.webp', tipo: 'Cachorro' },
  { id: 2, nome: 'Luna', idade: '5 meses', local: 'Aracaju - SE', img: '/img/adotar/cat-551554_1280.jpg', tipo: 'Gato' },
  { id: 3, nome: 'Thor', idade: '3 anos', local: 'Glória - SE', img: '/img/adotar/OIP.jpg', tipo: 'Cachorro' },
  { id: 4, nome: 'Bela', idade: '1 ano', local: 'Lagarto - SE', img: '/img/adotar/OIP (1).jpg', tipo: 'Cachorro' },
  { id: 5, nome: 'Mimi', idade: '2 anos', local: 'Aracaju - SE', img: '/img/adotar/OIP (2).jpg', tipo: 'Gato' },
  { id: 6, nome: 'Simba', idade: '4 anos', local: 'Lagarto - SE', img: '/img/adotar/projeto-imuniza-pet-oferece-vacinacao-gratuita-para-caes-e-gatos-de-pessoas-em-situacao-de-rua-em-maringa.webp', tipo: 'Gato' },
]


export default function Adotar() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    )
  }

  const getWhatsappUrl = (nome) => {
    const msg = encodeURIComponent(`Olá! Vi o ${nome} no site Lar Certo e gostaria de saber mais sobre a adoção.`)
    return `https://wa.me/5579999999999?text=${msg}`
  }

  return (
    <>
      <Navbar />

      <section className="hero-banner">
        <h2>Encontre seu novo amigo 🐶🐱</h2>
        <p>Veja animais disponíveis para adoção próximos de você e transforme vidas com amor.</p>
      </section>

      <main className="container">
        <h2 className="section-title" style={{ textAlign: 'center', color: '#2d2de4', margin: '24px 0', fontSize: '28px' }}>
          Animais disponíveis para adoção
        </h2>

        <div className="animais-grid">
          {initialAnimals.map((animal) => (
            <div className="animal-card" key={animal.id} style={{ position: 'relative' }}>
              <button 
                className={`pet-card-fav ${favorites.includes(animal.id) ? 'active' : ''}`}
                onClick={() => toggleFavorite(animal.id)}
                style={{ top: '20px', right: '20px' }}
              >
                {favorites.includes(animal.id) ? '❤️' : '🤍'}
              </button>
              <img src={animal.img} alt={animal.nome} />
              <h3>{animal.nome}</h3>
              <p>{animal.idade} - {animal.local}</p>
              <a 
                href={getWhatsappUrl(animal.nome)} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="adotar-btn"
              >
                Quero Adotar
              </a>
            </div>
          ))}
        </div>
      </main>

      <section className="final-cta">
        <h2>Não encontrou seu amigo?</h2>
        <p>Entre em contato e descubra outros animais disponíveis em abrigos próximos.</p>
        <a href="/contato" className="cta-btn">Fale Conosco</a>
      </section>

      <VLibras />
      <Footer />
    </>
  )
}
