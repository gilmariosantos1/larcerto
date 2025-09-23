// inicializa o mapa em Nossa Senhora da Glória - SE
const map = L.map('lares-map').setView([-10.2571, -37.4505], 13); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const lares = [
  {nome: "Abrigo Nosso Lar", lat: -10.2571, lon: -37.4505, telefone: "(79) 99999-1111"},
  {nome: "Lar dos Animais Felizes", lat: -10.2580, lon: -37.4520, telefone: "(79) 98888-2222"},
  {nome: "Patinhas de Esperança", lat: -10.2555, lon: -37.4485, telefone: "(79) 97777-3333"}
];

lares.forEach(lar => {
  L.marker([lar.lat, lar.lon])
    .addTo(map)
    .bindPopup(`<b>${lar.nome}</b><br>${lar.telefone}`);
});

map.locate({setView: true, maxZoom: 12});
map.on('locationfound', e => {
  L.marker(e.latlng).addTo(map)
    .bindPopup("Você está aqui")
    .openPopup();
});
