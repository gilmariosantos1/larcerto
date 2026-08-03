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
  IonButton,
  IonCard,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { 
  paw, 
  searchOutline, 
  heart, 
  people, 
  closeCircleOutline, 
  notificationsOutline 
} from 'ionicons/icons';
import Footer from '../components/Footer';
import './Home.css';

const Home: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem('token');
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/pets')
      .then(res => res.json())
      .then(data => {
        const disponiveis = data.filter((p: any) => p.Status === 'disponivel').slice(0, 4);
        setPets(disponiveis);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  return (
    <IonPage>
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

      <IonContent fullscreen className="home-content">
        <div className="home-container">
          <IonCard className="hero-card">
            <div className="hero-content">
              <h1 className="hero-title">Encontre<br/>sua melhor<br/>companhia.</h1>
              <p className="hero-subtitle">
                Conectando pets que precisam de um lar com pessoas cheias de amor para dar.
              </p>
              
              <div className="hero-buttons">
                <IonButton expand="block" className="btn-adotar" routerLink="/adotar">
                  <IonIcon slot="start" icon={searchOutline} />
                  Quero Adotar
                </IonButton>
                <IonButton expand="block" fill="outline" className="btn-doar" routerLink="/doar">
                  <IonIcon slot="start" icon={paw} />
                  Quero Doar
                </IonButton>
              </div>
            </div>
          </IonCard>

          <div className="stats-section">
            <div className="stats-header">
              <IonIcon icon={heart} className="stats-heart-icon" />
              <h2 className="stats-title">Juntos fazemos a<br/>diferença</h2>
            </div>
            
            <IonGrid className="ion-no-padding">
              <IonRow className="ion-justify-content-between">
                <IonCol size="5.8">
                  <IonCard className="stat-card">
                    <IonIcon icon={paw} className="stat-icon" />
                    <h3 className="stat-number">+500</h3>
                    <p className="stat-label">Pets Adotados</p>
                  </IonCard>
                </IonCol>
                <IonCol size="5.8">
                  <IonCard className="stat-card">
                    <IonIcon icon={people} className="stat-icon" />
                    <h3 className="stat-number">+200</h3>
                    <p className="stat-label">Lares Felizes</p>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>

          <div className="pets-section">
            <div className="pets-header">
              <IonIcon icon={paw} className="pets-title-icon" />
              <h2 className="pets-title">Pets Disponíveis</h2>
            </div>
            
            {loading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>Carregando...</div>
            ) : pets.length === 0 ? (
              <IonCard className="empty-state-card">
                <div className="empty-state-icon-container">
                  <IonIcon icon={searchOutline} className="empty-search-icon" />
                  <IonIcon icon={closeCircleOutline} className="empty-close-icon" />
                </div>
                <h3 className="empty-state-title">Nenhum pet<br/>encontrado</h3>
                <p className="empty-state-message">
                  No momento não temos pets disponíveis com os filtros selecionados, mas novos amigos chegam todos os dias.
                </p>
                <IonButton className="btn-alerta" fill="outline" shape="round">
                  <IonIcon slot="start" icon={notificationsOutline} />
                  Criar Alerta
                </IonButton>
              </IonCard>
            ) : (
              <div className="pets-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '16px', padding: '16px 0' }}>
                {pets.map(pet => (
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
        </div>

        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
