import React, { useState, useEffect } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonToolbar, 
  IonButtons, 
  IonMenuButton, 
  IonIcon, 
  IonAvatar,
  IonCard,
  IonInput,
  IonChip,
  IonLabel,
  IonText,
  IonButton
} from '@ionic/react';
import { paw } from 'ionicons/icons';
import Footer from '../components/Footer';
import './Adotar.css';

const Adotar: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem('token');
  const [especie, setEspecie] = useState('todos');
  const [porte, setPorte] = useState('qualquer');
  const [busca, setBusca] = useState('');
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/pets')
      .then(res => res.json())
      .then(data => {
        setPets(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const petsFiltrados = pets.filter(pet => {
    const matchEspecie = especie === 'todos' || (pet.Tipo && pet.Tipo.toLowerCase() === especie);
    let porteFormatado = 'qualquer';
    if (porte === 'pequeno') porteFormatado = 'P';
    if (porte === 'medio') porteFormatado = 'M';
    if (porte === 'grande') porteFormatado = 'G';
    const matchPorte = porte === 'qualquer' || (pet.Porte === porteFormatado);
    const matchBusca = busca === '' || (pet.Nome && pet.Nome.toLowerCase().includes(busca.toLowerCase()));
    
    return matchEspecie && matchPorte && matchBusca && pet.Status === 'disponivel';
  });

  return (
    <IonPage className="adotar-page">
      <IonHeader className="ion-no-border">
        <IonToolbar className="custom-toolbar">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          
          <div className="header-brand" slot="start">
            <IonIcon icon={paw} className="header-logo-icon" />
            <span className="header-logo-text">LarCerto</span>
          </div>

          {isLoggedIn ? (
            <IonAvatar slot="end" className="header-avatar">
              <img src="https://i.pravatar.cc/150?u=larcerto" alt="User avatar" />
            </IonAvatar>
          ) : (
            <IonButton slot="end" fill="clear" routerLink="/login" style={{ '--color': 'var(--ion-color-primary)', fontWeight: 'bold' }}>
              Entrar
            </IonButton>
          )}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="adotar-content">
        <div className="adotar-container">
          <IonCard className="filtros-card">
            <IonInput 
              className="busca-input"
              placeholder="Buscar por nome, raça ou tipo..." 
              value={busca}
              onIonChange={e => setBusca(e.detail.value!)}
            />

            <div className="filtro-grupo">
              <IonLabel className="filtro-label">ESPÉCIE</IonLabel>
              <div className="chips-container">
                <IonChip 
                  className={especie === 'todos' ? 'chip-active' : 'chip-outline'}
                  onClick={() => setEspecie('todos')}
                >
                  <IonLabel>Todos</IonLabel>
                </IonChip>
                <IonChip 
                  className={especie === 'cao' ? 'chip-active' : 'chip-outline'}
                  onClick={() => setEspecie('cao')}
                >
                  <span role="img" aria-label="cão" style={{marginRight: '6px', fontSize: '16px'}}>🐶</span>
                  <IonLabel>Cão</IonLabel>
                </IonChip>
                <IonChip 
                  className={especie === 'gato' ? 'chip-active' : 'chip-outline'}
                  onClick={() => setEspecie('gato')}
                >
                  <span role="img" aria-label="gato" style={{marginRight: '6px', fontSize: '16px'}}>🐱</span>
                  <IonLabel>Gato</IonLabel>
                </IonChip>
                <IonChip 
                  className={especie === 'outro' ? 'chip-active' : 'chip-outline'}
                  onClick={() => setEspecie('outro')}
                >
                  <span role="img" aria-label="outro" style={{marginRight: '6px', fontSize: '16px'}}>🐾</span>
                  <IonLabel>Outro</IonLabel>
                </IonChip>
              </div>
            </div>

            <div className="filtro-grupo">
              <IonLabel className="filtro-label">PORTE</IonLabel>
              <div className="chips-container">
                <IonChip 
                  className={porte === 'qualquer' ? 'chip-active' : 'chip-outline'}
                  onClick={() => setPorte('qualquer')}
                >
                  <IonLabel>Qualquer porte</IonLabel>
                </IonChip>
                <IonChip 
                  className={porte === 'pequeno' ? 'chip-active' : 'chip-outline'}
                  onClick={() => setPorte('pequeno')}
                >
                  <IonLabel>Pequeno</IonLabel>
                </IonChip>
                <IonChip 
                  className={porte === 'medio' ? 'chip-active' : 'chip-outline'}
                  onClick={() => setPorte('medio')}
                >
                  <IonLabel>Médio</IonLabel>
                </IonChip>
                <IonChip 
                  className={porte === 'grande' ? 'chip-active' : 'chip-outline'}
                  onClick={() => setPorte('grande')}
                >
                  <IonLabel>Grande</IonLabel>
                </IonChip>
              </div>
            </div>
          </IonCard>

          <div className="resultados-header">
            <span className="resultados-numero">{petsFiltrados.length}</span>
            <span className="resultados-texto">pets encontrados</span>
          </div>

          {loading ? (
            <div className="empty-state">
              <p className="empty-message">Carregando pets...</p>
            </div>
          ) : petsFiltrados.length === 0 ? (
            <div className="empty-state">
              <h3 className="empty-title">Nenhum pet encontrado</h3>
              <p className="empty-message">
                Tente ajustar os filtros ou a busca para encontrar mais amiguinhos disponíveis.
              </p>
            </div>
          ) : (
            <div className="pets-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '16px', padding: '16px 0' }}>
              {petsFiltrados.map(pet => (
                <IonCard key={pet.idPet} className="pet-card" style={{ margin: 0, borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                  <img src={pet.Img ? `http://localhost:3001${pet.Img}` : "https://via.placeholder.com/150"} alt={pet.Nome} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                  <div style={{ padding: '12px' }}>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 600, color: '#333' }}>{pet.Nome}</h3>
                    <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{pet.Idade || 'Idade desconhecida'} • {pet.Porte}</p>
                    {pet.localizacao && (
                      <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#888' }}>
                        {pet.localizacao.Cidade} - {pet.localizacao.Estado}
                      </p>
                    )}
                  </div>
                </IonCard>
              ))}
            </div>
          )}
        </div>

        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Adotar;
