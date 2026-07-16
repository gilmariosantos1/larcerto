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

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* 
 * Removed automatic dark mode import to ensure the app 
 * strictly follows the LarCerto light theme design 
 */
/* import '@ionic/react/css/palettes/dark.system.css'; */

/* Theme variables */
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
          {/* Mock routes para os itens do Menu e botões */}
          <Route exact path="/adotar">
            <Home /> {/* Temporariamente renderizando a Home */}
          </Route>
          <Route exact path="/doar">
            <PetRegistro /> {/* Renderizando o componente PetRegistro */}
          </Route>
          <Route exact path="/blog">
            <Blog />
          </Route>
          <Route exact path="/ajudar">
            <Apoio />
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
