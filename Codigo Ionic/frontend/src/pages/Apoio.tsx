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
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel
} from '@ionic/react';
import { 
  paw, 
  heartOutline, 
  shieldCheckmarkOutline, 
  businessOutline, 
  schoolOutline, 
  footballOutline,
  ribbonOutline,
  chevronDownOutline
} from 'ionicons/icons';
import Footer from '../components/Footer';
import './Apoio.css';

const Apoio: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem('token');
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

      <IonContent fullscreen className="apoio-content">
        {/* Top Header Section */}
        <div className="apoio-hero-section">
          <h1 className="apoio-hero-title">Apoie e<br/>transforme<br/>vidas hoje.</h1>
          <p className="apoio-hero-subtitle">
            O LarCerto é 100% gratuito para os apadrinhados e toda a instituição, mas nós precisamos da sua ajuda para a manutenção e para promover projetos na região.
          </p>

          <div className="apoio-hero-stats">
            <div className="apoio-stat-card">
              <h3>12.5K</h3>
              <p>Pet apoiados</p>
            </div>
            <div className="apoio-stat-card">
              <h3>100%</h3>
              <p>Transparência</p>
            </div>
            <div className="apoio-stat-card">
              <h3>48+</h3>
              <p>Projetos apoiados</p>
            </div>
          </div>
        </div>

        <div className="apoio-container">
          {/* Escolha como impactar Section */}
          <div className="apoio-section">
            <h2 className="apoio-section-title">Escolha como<br/>impactar</h2>
            <p className="apoio-section-subtitle">Você decide como e quando pode ajudar a manter nossas histórias na nossa instituição.</p>

            <IonCard className="impact-card">
              <div className="impact-icon-wrapper">
                <IonIcon icon={heartOutline} />
              </div>
              <h3 className="impact-title">Doação Única</h3>
              <p className="impact-description">
                A sua doação única é a maneira mais direta e rápida de apoiar as campanhas de emergência ou custos rotineiros e despesas.
              </p>
              <IonButton expand="block" fill="outline" className="btn-doacao-unica">
                Doar de forma única
              </IonButton>
            </IonCard>

            <IonCard className="impact-card featured">
              <div className="impact-icon-wrapper featured">
                <IonIcon icon={ribbonOutline} />
              </div>
              <h3 className="impact-title">Padrinho Fiel</h3>
              <p className="impact-description">
                Nosso modelo de doação que garante a estabilidade de recursos para a manutenção diária do nosso trabalho de longo prazo da instituição.
              </p>
              <IonButton expand="block" className="btn-padrinho-fiel">
                Tornar-se padrinho
              </IonButton>
            </IonCard>
          </div>

          {/* Para onde vai o seu dinheiro Section */}
          <div className="apoio-section">
            <h2 className="apoio-section-title left-align">Para onde vai o seu<br/>dinheiro?</h2>
            <p className="apoio-section-subtitle left-align">
              Acreditamos que a transparência é a base da confiança. Por isso mantemos todas as nossas transações de forma transparente e clara para o público.
            </p>
            <p className="apoio-section-subtitle left-align">
              Nossa distribuição de fundos é feita com cuidado para maximizar o impacto que doações de diversas naturezas podem ter nas vidas que tocamos.
            </p>

            <IonCard className="funds-card">
              <div className="fund-item">
                <div className="fund-icon">
                  <IonIcon icon={businessOutline} />
                </div>
                <div className="fund-info">
                  <h3>30%</h3>
                  <p>Manutenção dos espaços físicos</p>
                </div>
              </div>
              
              <div className="fund-item">
                <div className="fund-icon">
                  <IonIcon icon={schoolOutline} />
                </div>
                <div className="fund-info">
                  <h3>50%</h3>
                  <p>Ração e suprimentos</p>
                </div>
              </div>

              <div className="fund-item">
                <div className="fund-icon">
                  <IonIcon icon={footballOutline} />
                </div>
                <div className="fund-info">
                  <h3>20%</h3>
                  <p>Atividades e Projetos para Pets</p>
                </div>
              </div>
            </IonCard>
          </div>

          {/* Dúvidas Frequentes Section */}
          <div className="apoio-section faq-section">
            <h2 className="apoio-section-title">Dúvidas Frequentes</h2>
            
            <IonAccordionGroup className="faq-accordion-group">
              <IonAccordion value="first">
                <IonItem slot="header" color="light">
                  <IonLabel className="faq-question">Por que ajudar o LarCerto?</IonLabel>
                </IonItem>
                <div className="ion-padding" slot="content">
                  A sua ajuda é fundamental para mantermos as portas abertas e continuarmos transformando vidas. Todo apoio, seja financeiro ou voluntário, faz a diferença.
                </div>
              </IonAccordion>
              <IonAccordion value="second">
                <IonItem slot="header" color="light">
                  <IonLabel className="faq-question">Posso cancelar minha doação mensal?</IonLabel>
                </IonItem>
                <div className="ion-padding" slot="content">
                  Sim, você pode cancelar ou pausar a sua doação mensal a qualquer momento, sem nenhuma burocracia, acessando o seu perfil.
                </div>
              </IonAccordion>
              <IonAccordion value="third">
                <IonItem slot="header" color="light">
                  <IonLabel className="faq-question">Como as doações são utilizadas?</IonLabel>
                </IonItem>
                <div className="ion-padding" slot="content">
                  As doações são revertidas em ração, suprimentos, manutenção do espaço físico e atividades relacionadas aos pets.
                </div>
              </IonAccordion>
            </IonAccordionGroup>
          </div>

        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Apoio;
