import React from 'react';
import { IonGrid, IonRow, IonCol, IonIcon, IonButton } from '@ionic/react';
import { arrowUpOutline, home } from 'ionicons/icons';
import './Footer.css';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    // A simple hack to scroll top if placed inside IonContent
    const content = document.querySelector('ion-content');
    if (content) {
      content.scrollToTop(500);
    }
  };

  return (
    <div className="footer-container">
      <div className="footer-brand">
        <div className="footer-logo">
          <IonIcon icon={home} className="footer-logo-icon" />
          <span className="footer-logo-text">LarCerto</span>
        </div>
        <p className="footer-description">
          Transformando vidas através da adoção responsável.
          Encontre seu melhor amigo hoje no Lar Certo.
        </p>
      </div>

      <IonGrid className="footer-links-grid ion-no-padding">
        <IonRow>
          <IonCol size="6">
            <h4 className="footer-links-title">PLATAFORMA</h4>
            <ul className="footer-links-list">
              <li><a href="#" className="footer-link active">Início</a></li>
              <li><a href="#" className="footer-link">Quero Adotar</a></li>
              <li><a href="#" className="footer-link">Blog & Notícias</a></li>
              <li><a href="#" className="footer-link">Como Ajudar</a></li>
            </ul>
          </IonCol>
          <IonCol size="6">
            <h4 className="footer-links-title">SUPORTE</h4>
            <ul className="footer-links-list">
              <li><a href="#" className="footer-link">Fale Conosco</a></li>
              <li><a href="#" className="footer-link">Privacidade</a></li>
              <li><a href="#" className="footer-link">Termos de Uso</a></li>
              <li><a href="#" className="footer-link">Sobre Nós</a></li>
            </ul>
          </IonCol>
        </IonRow>
      </IonGrid>

      <div className="footer-bottom">
        <span className="footer-copyright">© 2025 Lar Certo. Feito com amor para todos os pets.</span>
        <IonButton fill="solid" shape="round" className="scroll-top-btn" onClick={scrollToTop}>
          <IonIcon icon={arrowUpOutline} />
        </IonButton>
      </div>
    </div>
  );
};

export default Footer;
