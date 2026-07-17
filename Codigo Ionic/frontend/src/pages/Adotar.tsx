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
  IonInput,
  IonChip,
  IonLabel,
  IonText
} from '@ionic/react';
import { paw } from 'ionicons/icons';
import Footer from '../components/Footer';
import './Adotar.css';

const Adotar: React.FC = () => {
  const [especie, setEspecie] = useState('todos');
  const [porte, setPorte] = useState('qualquer');
  const [busca, setBusca] = useState('');

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

          <IonAvatar slot="end" className="header-avatar">
            <img src="https://i.pravatar.cc/150?u=larcerto" alt="User avatar" />
          </IonAvatar>
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
            <span className="resultados-numero">0</span>
            <span className="resultados-texto">pets encontrados</span>
          </div>

          <div className="empty-state">
            <h3 className="empty-title">Nenhum pet encontrado</h3>
            <p className="empty-message">
              Tente ajustar os filtros ou a busca para encontrar mais amiguinhos disponíveis.
            </p>
          </div>
        </div>

        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Adotar;
