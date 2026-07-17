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
  addCircleOutline, 
  addCircleSharp,
  paw,
  heartOutline,
  heartSharp,
  newspaperOutline,
  newspaperSharp,
  personAddOutline,
  personAddSharp
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
    title: 'Cadastrar Pet (Doar)',
    url: '/doar',
    iosIcon: addCircleOutline,
    mdIcon: addCircleSharp
  },
  {
    title: 'Apoiar',
    url: '/ajudar',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Blog',
    url: '/blog',
    iosIcon: newspaperOutline,
    mdIcon: newspaperSharp
  },
  {
    title: 'Cadastro',
    url: '/cadastro',
    iosIcon: personAddOutline,
    mdIcon: personAddSharp
  }
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main-content" type="overlay" className="custom-menu">
      <IonContent>
        <div className="menu-header-bg">
          <div className="menu-logo-wrapper">
            <IonIcon icon={paw} className="menu-logo-icon" />
          </div>
          <IonListHeader className="menu-title">LarCerto</IonListHeader>
          <IonNote className="menu-subtitle">Adoção responsável & conexão</IonNote>
        </div>

        <IonList id="inbox-list" className="menu-list-items">
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem 
                  className={`menu-item ${location.pathname === appPage.url ? 'selected' : ''}`}
                  routerLink={appPage.url} 
                  routerDirection="none" 
                  lines="none" 
                  detail={false}
                >
                  <div className="menu-item-icon-wrapper" slot="start">
                    <IonIcon aria-hidden="true" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  </div>
                  <IonLabel className="menu-item-label">{appPage.title}</IonLabel>
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
