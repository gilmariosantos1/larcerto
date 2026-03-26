import { Link } from 'react-router-dom'

const menuItems = [
  { path: '/perdi', label: 'Perdi um Pet', img: '/img/a29c55e72a2ec8f9829a5229902f52e4f36cc519.png', color: '#eef2ff' },
  { path: '/adotar', label: 'Quero Adotar', img: '/img/cdfbe98809e57b0c923fe7c6894a03d3e6e61b2d.png', color: '#f0fdf4' },
  { path: '/querodoar', label: 'Quero Doar', img: '/img/92666b7aaa33bfabfe4e9d62ec1749dbab28bf57.png', color: '#fff7ed' },
  { path: '/lares', label: 'Lares Temporários', img: '/img/d39a31c077f6cf3d94e82b52e7d9aba9205519ab.png', color: '#faf5ff' },
  { path: '/doe', label: 'Doe agora', img: '/img/9239e72fdc0f4bde1a3935d4bf602b3f4033adec.png', color: '#fff1f2' },
]


export default function MenuCards() {
  return (
    <div className="menu-cards container">
      {menuItems.map((item) => (
        <Link 
          key={item.path} 
          to={item.path} 
          className="menu-card"
          style={{ '--bg-color': item.color }}
        >
          <img src={item.img} alt={item.label} />
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  )
}
