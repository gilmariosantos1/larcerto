import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import Privacidade from './pages/Privacidade';
import Sobre from './pages/Sobre';
import Menu from './components/Menu';
import Apoio from './pages/Apoio';
import Blog from './pages/blog';
import Contato from './pages/Contato';
import Adotar from './pages/Adotar';
import LoginPage from './pages/LoginPage';

import '@ionic/react/css/core.css';

import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
import PetRegistro from './pages/PetRegistro';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main-content">
        <Menu />
        <IonRouterOutlet id="main-content">
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/cadastro">
            <Cadastro />
          </Route>
          <Route exact path="/privacidade">
            <Privacidade />
          </Route>
          <Route exact path="/sobre">
            <Sobre />
          </Route>
          <Route exact path="/adotar">
            <Adotar />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/doar">
            <PetRegistro />
          </Route>
          <Route exact path="/blog">
            <Blog />
          </Route>
          <Route exact path="/ajudar">
            <Apoio />
          </Route>
          <Route exact path="/contato">
            <Contato />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
