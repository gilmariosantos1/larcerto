import React from 'react';
import { 
  IonContent, 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonMenuButton,
  IonButton,
  IonIcon
} from '@ionic/react';
import { home } from 'ionicons/icons';
import Footer from '../components/Footer';
import './Sobre.css';

const Sobre: React.FC = () => {
  return (
    <IonPage className="sobre-page">
      <IonHeader className="ion-no-border">
        <IonToolbar className="custom-toolbar">
          <IonButtons slot="start">
            <IonMenuButton color="dark" />
          </IonButtons>
          <div className="header-brand">
            <span className="header-logo-text">LarCerto</span>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="sobre-content">
        <div className="sobre-container">
          
          <div className="sobre-header">
            <h1 className="sobre-title">Sobre Lar Certo</h1>
            <div className="sobre-title-underline"></div>
          </div>

          <div className="sobre-cards">
            {/* Missão */}
            <div className="sobre-card">
              <h2 className="sobre-card-title">Nossa Missão</h2>
              <p className="sobre-card-text">
                Nossa missão é ajudar animais a encontrarem lares seguros, amorosos e responsáveis. 
                Acreditamos que cada pet merece uma segunda chance, e nosso objetivo é facilitar o 
                encontro entre quem deseja adotar e os animais que aguardam por um lar. Trabalhamos 
                para criar uma rede de solidariedade que conecta ONGs, abrigos, voluntários e adotantes.
              </p>
            </div>

            {/* Visão */}
            <div className="sobre-card">
              <h2 className="sobre-card-title">Nossa Visão</h2>
              <p className="sobre-card-text">
                Buscamos ser referência em adoção responsável e na conscientização sobre o bem-estar 
                animal em todo o país. Queremos inspirar uma cultura de respeito e empatia, onde cada 
                pessoa compreenda a importância de adotar com responsabilidade, oferecendo aos animais 
                um futuro digno, seguro e cheio de amor.
              </p>
            </div>

            {/* Valores */}
            <div className="sobre-card">
              <h2 className="sobre-card-title">Nossos Valores</h2>
              <p className="sobre-card-text">
                Transparência, empatia, respeito, responsabilidade e amor pelos animais são os pilares 
                que sustentam todas as nossas ações. Valorizamos a ética em todas as parcerias e 
                iniciativas, e acreditamos que cada ação, por menor que seja, pode fazer uma diferença 
                enorme na vida de um animal.
              </p>
            </div>

            {/* Como Atuamos */}
            <div className="sobre-card">
              <h2 className="sobre-card-title">Como Atuamos</h2>
              <p className="sobre-card-text">
                Atuamos através de uma plataforma digital que centraliza anúncios de adoção de diversas 
                instituições parceiras. Oferecemos ferramentas para que os abrigos gerenciem seus pets 
                disponíveis e para que os interessados encontrem seu novo melhor amigo de forma rápida e 
                segura, sempre com foco no bem-estar animal.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="sobre-cta">
            <h2 className="sobre-cta-title">Quer fazer a diferença?</h2>
            
            <IonButton expand="block" className="btn-apoiar" routerLink="/ajudar">
              Apoiar agora
            </IonButton>
            
            <IonButton expand="block" fill="outline" className="btn-adotar-outline" routerLink="/home">
              Quero Adotar
            </IonButton>
          </div>

        </div>

        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Sobre;
