import React from 'react';
import { 
  IonContent, 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonMenuButton, 
  IonTitle 
} from '@ionic/react';
import Footer from '../components/Footer';
import './Privacidade.css';

const Privacidade: React.FC = () => {
  return (
    <IonPage className="privacidade-page">
      {/* O header padrão pode ser importado ou construído. Vamos usar o padrão do app. */}
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

      <IonContent fullscreen className="privacidade-content">
        <div className="privacidade-container">
          <div className="privacidade-card">
            <h1 className="privacidade-title">Política de Privacidade</h1>
            <p className="privacidade-subtitle">ÚLTIMA ATUALIZAÇÃO: MARÇO DE 2025</p>

            <div className="privacidade-section">
              <h2 className="privacidade-section-title">1. Informações Coletadas</h2>
              <p className="privacidade-text">
                Coletamos informações fornecidas voluntariamente por você, como nome, e-mail
                e dados de pets cadastrados. Não compartilhamos seus dados com terceiros
                sem consentimento.
              </p>
            </div>

            <div className="privacidade-section">
              <h2 className="privacidade-section-title">2. Uso das Informações</h2>
              <p className="privacidade-text">
                Suas informações são usadas exclusivamente para melhorar sua experiência na plataforma e
                facilitar processos de adoção e doação.
              </p>
            </div>

            <div className="privacidade-section">
              <h2 className="privacidade-section-title">3. Segurança</h2>
              <p className="privacidade-text">
                Adotamos medidas de segurança para proteger seus dados contra acesso não autorizado.
              </p>
            </div>

            <div className="privacidade-section">
              <h2 className="privacidade-section-title">4. Contato</h2>
              <p className="privacidade-text">
                Em caso de dúvidas sobre esta política, entre em contato: <a href="mailto:contato@larcerto.com">clique aqui</a>.
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Privacidade;
