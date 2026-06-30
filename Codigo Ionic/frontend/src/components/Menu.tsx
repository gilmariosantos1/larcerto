import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { 
  homeOutline, 
  homeSharp, 
  searchOutline, 
  searchSharp, 
  heartOutline, 
  heartSharp, 
  helpCircleOutline, 
  helpCircleSharp 
} from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Início',
    url: '/home',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  {
    title: 'Quero Adotar',
    url: '/adotar',
    iosIcon: searchOutline,
    mdIcon: searchSharp
  },
  {
    title: 'Blog & Notícias',
    url: '/blog',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Como Ajudar',
    url: '/ajudar',
    iosIcon: helpCircleOutline,
    mdIcon: helpCircleSharp
  }
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main-content" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Menu LarCerto</IonListHeader>
          <IonNote>adoção responsável</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem 
                  className={location.pathname === appPage.url ? 'selected' : ''} 
                  routerLink={appPage.url} 
                  routerDirection="none" 
                  lines="none" 
                  detail={false}
                >
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
