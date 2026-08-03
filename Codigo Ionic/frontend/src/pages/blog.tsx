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
  IonButton
} from '@ionic/react';
import { paw } from 'ionicons/icons';
import Footer from '../components/Footer';
import './blog.css';

const Blog: React.FC = () => {
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
      <IonContent>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Blog;
