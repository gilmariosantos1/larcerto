import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MenuCards from '../components/MenuCards'
import VLibras from '../components/VLibras'
import '../styles/sobrenos.css'

const artigos = [
  {
    img: '/img/sobre/pexels-blooddrainer-6785224.jpg',
    titulo: 'Nossa Missão',
    texto: 'Nossa missão é ajudar animais a encontrarem lares seguros, amorosos e responsáveis. Acreditamos que cada pet merece uma segunda chance, e nosso objetivo é facilitar o encontro entre quem deseja adotar e os animais que aguardam por um lar. Trabalhamos para criar uma rede de solidariedade que conecta ONGs, abrigos, voluntários e adotantes.',
  },
  {
    img: '/img/sobre/pexels-eyyup-erten-1462748243-33869005.jpg',
    titulo: 'Nossa Visão',
    texto: 'Buscamos ser referência em adoção responsável e na conscientização sobre o bem-estar animal em todo o país. Queremos inspirar uma cultura de respeito e empatia, onde cada pessoa compreenda a importância de adotar com responsabilidade, oferecendo aos animais um futuro digno, seguro e cheio de amor.',
  },
  {
    img: '/img/sobre/pexels-helen1-16264420.jpg',
    titulo: 'Nossos Valores',
    texto: 'Transparência, empatia, respeito, responsabilidade e amor pelos animais são os pilares que sustentam todas as nossas ações. Valorizamos a ética em todas as parcerias e iniciativas, e acreditamos que cada ação, por menor que seja, pode fazer uma diferença enorme na vida de um animal.',
  },
  {
    img: '/img/sobre/pexels-ubaidshareef-20816519.jpg',
    titulo: 'Como Atuamos',
    texto: 'Atuamos diretamente com ONGs, abrigos, voluntários e protetores independentes, oferecendo uma plataforma intuitiva e acessível. Facilitamos processos de adoção, cadastro de pets perdidos, doações e campanhas de conscientização.',
  },
  {
    img: '/img/sobre/pexels-sayefotograf-29507137.jpg',
    titulo: 'Impacto na Comunidade',
    texto: 'Nosso trabalho vai além da adoção. Investimos em educação e conscientização da comunidade sobre cuidados com pets, prevenção de abandono e proteção animal. Já ajudamos centenas de animais a encontrarem novos lares.',
  },
  {
    img: '/img/sobre/pexels-kenzero14-20849770.jpg',
    titulo: 'Nosso Compromisso',
    texto: 'Estamos comprometidos em evoluir constantemente, garantindo que nossa plataforma seja segura, funcional e inclusiva. Queremos que adotantes, voluntários e ONGs encontrem tudo o que precisam de forma prática e confiável.',
  },
]

export default function SobreNos() {
  return (
    <>
      <Navbar />
      <MenuCards />

      <div className="container">
        <section className="about-us">
          <h2>Sobre Lar Certo</h2>
          {artigos.map((a) => (
            <article key={a.titulo}>
              <img src={a.img} alt={a.titulo} />
              <div>
                <h3>{a.titulo}</h3>
                <p>{a.texto}</p>
              </div>
            </article>
          ))}
        </section>
      </div>

      <VLibras />
      <Footer />
    </>
  )
}
