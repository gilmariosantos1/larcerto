import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import VLibras from '../components/VLibras'

const blogPosts = [
  {
    id: 1,
    categoria: 'Dicas',
    data: '12 Abr 2026',
    leitura: '4 min',
    img: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80',
    titulo: 'Como preparar sua casa para um novo pet',
    texto: 'Adotar um animal é um ato de amor, mas exige responsabilidade e preparo. Antes da chegada do novo membro, verifique se há rotas de fuga perigosas, remova plantas venenosas (como a costela-de-adão ou lírios) e organize um espaço confortável e tranquilo com caminha, água e comida. A adaptação ao novo ambiente pode levar algum tempo, então tenha paciência e evite forçar interações nos primeiros dias. Deixe que o pet explore e se sinta seguro gradualmente.',
  },
  {
    id: 2,
    categoria: 'Comportamento',
    data: '08 Abr 2026',
    leitura: '5 min',
    img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80',
    titulo: 'Vantagens de adotar animais adultos',
    texto: 'Muitas pessoas buscam exclusivamente por filhotes, esquecendo que animais adultos têm características maravilhosas. Eles já possuem a personalidade definida, o tamanho final e costumam ser muito mais tranquilos dentro de casa. Na maioria dos casos, já aprenderam regras básicas de convivência e onde fazer as necessidades. Além disso, cães e gatos adultos são imensamente gratos pela segunda chance, formando um vínculo de lealdade indescritível com seus novos tutores.',
  },
  {
    id: 3,
    categoria: 'Saúde',
    data: '01 Abr 2026',
    leitura: '3 min',
    img: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80',
    titulo: 'Importância da vacinação em dia',
    texto: 'Manter a carteirinha de vacinação do seu pet atualizada não é apenas uma formalidade, é a garantia de que ele está protegido contra doenças virais graves e frequentemente fatais, como a raiva, parvovirose e cinomose para cães, e rinotraqueíte ou FIV/FeLV para gatos. Além das vacinas, o controle rigoroso de vermes e ectoparasitas (pulgas e carrapatos) é fundamental tanto para a saúde do animal quanto para a saúde pública da sua família.',
  },
  {
    id: 4,
    categoria: 'Saúde',
    data: '25 Mar 2026',
    leitura: '4 min',
    img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80',
    titulo: 'Cuidados vitais com pets no verão',
    texto: 'O calor excessivo é um perigo silencioso. Animais não transpiram como os humanos e podem sofrer hipertermia severa rapidamente. Evite passeios em horários de sol forte (geralmente entre as 10h e 16h), pois além do calor, o asfalto quente pode queimar os coxins (almofadinhas das patas). Ofereça água fresca e limpa constantemente. E o mais importante: nunca, em hipótese alguma, deixe seu pet sozinho dentro do carro, mesmo com os vidros semiabertos e na sombra.',
  },
  {
    id: 5,
    categoria: 'Nutrição',
    data: '18 Mar 2026',
    leitura: '6 min',
    img: 'https://images.unsplash.com/photo-1589924691106-073b19f5ee37?auto=format&fit=crop&q=80',
    titulo: 'Alimentação Natural vs Ração: O que escolher?',
    texto: 'A escolha da dieta ideal gera muitas dúvidas e depende diretamente da rotina do tutor, além da saúde e idade do pet. A ração super premium oferece praticidade, segurança e garantia de equilíbrio nutricional diário. Já a alimentação natural (AN) pode ser muito benéfica, aumentando a palatabilidade e hidratação, porém deve obrigatoriamente ser formulada por um veterinário nutrólogo para evitar deficiências de vitaminas e minerais essenciais. Consulte sempre um profissional antes de mudar a dieta.',
  },
  {
    id: 6,
    categoria: 'Comportamento',
    data: '10 Mar 2026',
    leitura: '4 min',
    img: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&q=80',
    titulo: 'Como socializar seu cão com segurança',
    texto: 'A socialização é a chave para um pet equilibrado, mas deve ser um processo gradual e respeitoso. Não force seu animal a interagir se ele demonstrar sinais de desconforto, como rabo entre as pernas, tremores ou rosnados. Utilize sempre o reforço positivo (petiscos e elogios) ao apresentar novos amigos e comece em ambientes controlados e neutros. Se o animal demonstrar reatividade crônica, procurar o auxílio de um adestrador comportamentalista é a decisão mais segura e eficaz.',
  },
  {
    id: 7,
    categoria: 'Curiosidades',
    data: '05 Mar 2026',
    leitura: '5 min',
    img: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&q=80',
    titulo: 'Desvendando a linguagem corporal felina',
    texto: 'Os gatos são mestres na comunicação sutil e não verbal. Um rabo levantado e com a ponta levemente curvada indica uma saudação amigável e feliz. Orelhas para trás e pupilas dilatadas são sinais claros de medo ou agressividade defensiva. Já o famoso "amassar pãozinho" é um comportamento instintivo de conforto e extrema satisfação, herdado da fase de amamentação. Observar esses pequenos sinais fortalece muito o vínculo de confiança entre você e seu felino.',
  },
  {
    id: 8,
    categoria: 'Nutrição',
    data: '28 Fev 2026',
    leitura: '3 min',
    img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80',
    titulo: 'Petiscos saudáveis que você pode fazer em casa',
    texto: 'Mimar o seu pet não precisa ser sinônimo de prejudicar a saúde dele. Substitua os industrializados cheios de corantes por opções naturais e deliciosas! Cubos de maçã (sem sementes), fatias de cenoura crua, melancia (sem caroço) ou até mesmo um pouco de iogurte natural sem açúcar congelado podem ser excelentes recompensas refrescantes. Apenas certifique-se de que nenhum alimento oferecido seja tóxico (como uvas, chocolate ou cebola) e ofereça com moderação.',
  },
  {
    id: 9,
    categoria: 'Curiosidades',
    data: '20 Fev 2026',
    leitura: '3 min',
    img: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80',
    titulo: 'Por que os cães inclinam a cabeça ao nos ouvir?',
    texto: 'Poucas coisas são tão fofas quanto um cão inclinando a cabeça enquanto você fala com ele. Especialistas sugerem que eles fazem isso para reposicionar as orelhas ou desobstruir a visão (especialmente cães com focinhos mais longos) para localizar exatamente a fonte do som ou ler as expressões faciais humanas. Basicamente, é um forte sinal de empatia e de que eles estão prestando muita atenção ao tom da sua voz e tentando entender exatamente o que você quer dizer!',
  },
]

const categorias = ['Todos', 'Saúde', 'Comportamento', 'Nutrição', 'Curiosidades', 'Dicas'];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [expanded, setExpanded] = useState({})

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.texto.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'Todos' || post.categoria === activeCategory
    
    return matchesSearch && matchesCategory
  })

  return (
    <div style={{ background: '#fdfdfd', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main className="container" style={{ flex: 1 }}>
        <div className="blog-header-premium">
          <h2>Mundo Animal em Foco</h2>
          <p>
            Bem-vindo ao espaço Lar Certo de conhecimento. Dicas essenciais, 
            informações sobre saúde veterinária e curiosidades fascinantes 
            para você entender e cuidar cada vez melhor do seu melhor amigo.
          </p>
        </div>

        <div className="blog-controls">
          <div className="blog-search-bar">
            <span>🔍</span>
            <input 
              type="text" 
              placeholder="Pesquisar artigos, dicas ou palavras-chave..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="blog-filter-pills">
            {categorias.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`blog-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <section className="blog-grid-premium">
          {filteredPosts.length > 0 ? filteredPosts.map((post) => (
            <article className="blog-card-premium" key={post.id}>
              <div className="blog-card-img-wrapper">
                <span className="blog-category-badge">{post.categoria}</span>
                <img 
                  src={post.img} 
                  alt={post.titulo} 
                  loading="lazy" 
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80' }}
                />
              </div>
              
              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <span>📅 {post.data}</span>
                  <span>⏱️ {post.leitura}</span>
                </div>
                
                <h3 className="blog-card-title">{post.titulo}</h3>
                
                <div className={`blog-card-text ${expanded[post.id] ? 'expanded' : ''}`}>
                  {expanded[post.id] ? post.texto : `${post.texto.substring(0, 100)}...`}
                </div>
                
                <button 
                  className="blog-read-more-btn"
                  onClick={() => toggleExpand(post.id)}
                >
                  {expanded[post.id] ? 'Ocultar artigo ↑' : 'Ler Artigo completo ➔'}
                </button>
              </div>
            </article>
          )) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', color: '#888', background: '#fff', borderRadius: '24px', border: '1px dashed #ccc' }}>
              <span style={{ fontSize: '48px', display: 'block', marginBottom: '15px' }}>🕵️‍♀️</span>
              <h3>Nenhum artigo encontrado para "{searchTerm}" nessa categoria.</h3>
              <p>Tente usar outros termos ou limpe os filtros para ver mais atualizações.</p>
            </div>
          )}
        </section>
      </main>

      <VLibras />
      <Footer />
    </div>
  )
}
