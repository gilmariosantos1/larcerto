import React from 'react';
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

          <IonButton routerLink="/LoginPage" slot="end" fill="clear" className="header-profile-button">
            <IonAvatar slot="end" className="header-avatar">
              <img src="https://i.pravatar.cc/150?u=larcerto" alt="User avatar" />
            </IonAvatar>
          </IonButton>

        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="home-content">
        <div className="home-container">
          {/* Hero Section */}
          <IonCard className="hero-card">
            <div className="hero-content">
              <h1 className="hero-title">Encontre<br />sua melhor<br />companhia.</h1>
              <p className="hero-subtitle">
                Conectando pets que precisam de um lar com pessoas cheias de amor para dar.
              </p>

              <div className="hero-buttons">
                {/* Exemplo de Navegação: O atributo routerLink faz a transição de tela */}
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

          {/* Stats Section */}
          <div className="stats-section">
            <div className="stats-header">
              <IonIcon icon={heart} className="stats-heart-icon" />
              <h2 className="stats-title">Juntos fazemos a<br />diferença</h2>
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

          {/* Pets List / Empty State */}
          <div className="pets-section">
            <div className="pets-header">
              <IonIcon icon={paw} className="pets-title-icon" />
              <h2 className="pets-title">Pets Disponíveis</h2>
            </div>

            <IonCard className="empty-state-card">
              <div className="empty-state-icon-container">
                <IonIcon icon={searchOutline} className="empty-search-icon" />
                <IonIcon icon={closeCircleOutline} className="empty-close-icon" />
              </div>
              <h3 className="empty-state-title">Nenhum pet<br />encontrado</h3>
              <p className="empty-state-message">
                No momento não temos pets disponíveis com os filtros selecionados, mas novos amigos chegam todos os dias.
              </p>
              <IonButton className="btn-alerta" fill="outline" shape="round">
                <IonIcon slot="start" icon={notificationsOutline} />
                Criar Alerta
              </IonButton>
            </IonCard>
          </div>
        </div>

        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Home;