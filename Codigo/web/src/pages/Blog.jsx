import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import VLibras from '../components/VLibras'

const initialPosts = [
  {
    id: 1,
    img: '/img/blog/pexels-viktoria-emilia-89810887-11104120.jpg',
    titulo: 'Como preparar sua casa para um novo pet',
    texto: 'Adotar um animal é um ato de amor, mas exige responsabilidade. Antes da chegada do novo membro, verifique se há rotas de fuga, remova plantas venenosas e organize um espaço confortável com caminha, água e comida. A adaptação pode levar tempo, então tenha paciência.',
  },
  {
    id: 2,
    img: '/img/blog/pexels-szafran-19792010.jpg',
    titulo: 'Vantagens de adotar animais adultos',
    texto: 'Muitas pessoas buscam filhotes, mas animais adultos já têm personalidade definida e costumam ser mais tranquilos. Eles já aprenderam regras básicas de convivência e são imensamente gratos pela segunda chance. Adote um veterano e ganhe um amigo leal.',
  },
  {
    id: 3,
    img: '/img/blog/rottweiler.jpg',
    titulo: 'Importância da vacinação em dia',
    texto: 'Manter a carteirinha de vacinação atualizada protege seu pet contra doenças graves como raiva, parvovirose e cinomose. Além das vacinas, o controle de vermes e ectoparasitas (pulgas e carrapatos) é fundamental para a saúde pública e do animal.',
  },
  {
    id: 4,
    img: '/img/blog/gato tigre.webp',
    titulo: 'Cuidados com pets no verão',
    texto: 'O calor excessivo pode causar hipertermia nos animais. Evite passeios em horários de sol forte (das 10h às 16h), ofereça água fresca constantemente e nunca deixe seu pet sozinho dentro do carro, mesmo com os vidros semiabertos.',
  },
  {
    id: 5,
    img: '/img/blog/vira-lata.jpg',
    titulo: 'Alimentação natural vs Ração',
    texto: 'A escolha da dieta ideal depende da saúde e idade do pet. Enquanto a ração oferece praticidade e equilíbrio nutricional, a alimentação natural deve ser formulada por um veterinário nutrólogo para evitar deficiências. Consulte sempre um profissional.',
  },
  {
    id: 6,
    img: '/img/blog/caramelo.png',
    titulo: 'Como socializar seu cão com outros animais',
    texto: 'Socialização deve ser um processo gradual. Utilize reforço positivo e comece em ambientes controlados. Se o animal demonstrar medo ou agressividade, procure auxílio de um adestrador comportamentalista para garantir segurança.',
  },
]


export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('')
  const [expanded, setExpanded] = useState({})

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const filteredPosts = initialPosts.filter(post => 
    post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.texto.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <Navbar />
      <main className="container">
        <h2 className="section-title">Blog Lar Certo</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
          Dicas, notícias e curiosidades sobre o mundo animal.
        </p>

        {/* Barra de Busca no Blog */}
        <div style={{ maxWidth: '600px', margin: '0 auto 40px', display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Pesquisar no blog..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1, padding: '12px 18px', borderRadius: '12px', border: '1.5px solid #ddd', outline: 'none', fontSize: '15px' }}
          />
        </div>

        <section className="blog-cards">
          {filteredPosts.length > 0 ? filteredPosts.map((post) => (
            <div className="blog-card" key={post.id}>
              <img src={post.img} alt={post.titulo} />
              <h3>{post.titulo}</h3>
              <p className={`resumo ${expanded[post.id] ? 'visible' : ''}`}>
                {post.texto}
              </p>
              <button 
                onClick={() => toggleExpand(post.id)}
                style={{ background: 'none', border: 'none', color: '#2d2de4', fontWeight: '700', cursor: 'pointer', marginTop: '10px', fontSize: '15px' }}
              >
                {expanded[post.id] ? 'Ver menos' : 'Ver mais'}
              </button>
            </div>
          )) : (
            <p style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Nenhum post encontrado. 🐾</p>
          )}
        </section>
      </main>

      <VLibras />
      <Footer />
    </>
  )
}
