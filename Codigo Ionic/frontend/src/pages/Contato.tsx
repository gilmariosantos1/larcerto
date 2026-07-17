import React, { useState } from 'react';
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
  IonButton,
  IonInput,
  IonTextarea,
  IonLabel
} from '@ionic/react';
import { 
  paw
} from 'ionicons/icons';
import Footer from '../components/Footer';
import './Contato.css';

const Contato: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ação do formulário
    console.log('Mensagem enviada:', { nome, email, mensagem });
  };

  return (
    <IonPage className="contato-page">
      <IonHeader className="ion-no-border">
        <IonToolbar className="custom-toolbar">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          
          <div className="header-brand" slot="start">
            <IonIcon icon={paw} className="header-logo-icon" />
            <span className="header-logo-text">LarCerto</span>
          </div>

          <IonAvatar slot="end" className="header-avatar">
            <img src="https://i.pravatar.cc/150?u=larcerto" alt="User avatar" />
          </IonAvatar>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="contato-content">
        <div className="contato-hero">
          <h1 className="contato-hero-title">Entre em Contato 📩</h1>
          <p className="contato-hero-subtitle">
            Tem alguma dúvida, sugestão ou quer colaborar conosco? Fale com a gente!
          </p>
        </div>

        <div className="contato-form-container">
          <IonCard className="contato-card">
            <form onSubmit={handleSubmit} className="contato-form">
              <div className="form-group">
                <IonLabel className="form-label">Nome</IonLabel>
                <IonInput 
                  className="custom-input"
                  placeholder="Seu nome" 
                  value={nome}
                  onIonChange={e => setNome(e.detail.value!)}
                  required
                />
              </div>

              <div className="form-group">
                <IonLabel className="form-label">E-mail</IonLabel>
                <IonInput 
                  className="custom-input"
                  type="email"
                  placeholder="seu@email.com" 
                  value={email}
                  onIonChange={e => setEmail(e.detail.value!)}
                  required
                />
              </div>

              <div className="form-group">
                <IonLabel className="form-label">Mensagem</IonLabel>
                <IonTextarea 
                  className="custom-textarea"
                  placeholder="Escreva sua mensagem aqui..." 
                  value={mensagem}
                  onIonChange={e => setMensagem(e.detail.value!)}
                  rows={6}
                  required
                />
              </div>

              <IonButton expand="block" type="submit" className="btn-enviar">
                Enviar Mensagem
              </IonButton>
            </form>
          </IonCard>
        </div>

        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Contato;
