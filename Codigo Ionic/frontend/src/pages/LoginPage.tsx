import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonIcon,
  IonInput,
  IonButton,
  useIonRouter,
} from '@ionic/react';
import { arrowBack, mailOutline, lockClosedOutline, homeOutline } from 'ionicons/icons';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const router = useIonRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVoltar = () => {
    router.goBack();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: integrar com o serviço de autenticação real
      console.log('Login:', { email, senha });
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false} className="login-content">
        <div className="login-wrapper">

          {/* Painel esquerdo - imagem/branding */}
          <div className="login-hero">
            <button
              type="button"
              className="back-button"
              onClick={handleVoltar}
              aria-label="Voltar"
            >
              <IonIcon icon={arrowBack} />
            </button>

            <div className="hero-overlay" />

            <div className="hero-text">
              <h1>Sua jornada<br />começa aqui.</h1>
              <p>
                O Lar Certo conecta corações. Juntos, damos a oportunidade
                de um novo começo para quem mais precisa.
              </p>
            </div>
          </div>

          {/* Painel direito - formulário */}
          <div className="login-form-panel">
            <div className="login-form-inner">

              <div className="brand">
                <span className="brand-icon">
                  <IonIcon icon={homeOutline} />
                </span>
                <span className="brand-name">
                  Lar<span className="brand-accent">Certo</span>
                </span>
              </div>

              <h2 className="welcome-title">Boas-vindas de volta!</h2>
              <p className="welcome-subtitle">
                Sua conta é o portal para ajudar mais pets. Entre com seu e-mail abaixo.
              </p>

              <form onSubmit={handleLogin} className="login-form">
                <div className="input-group">
                  <label htmlFor="email">E-mail</label>
                  <div className="input-with-icon">
                    <IonIcon icon={mailOutline} />
                    <IonInput
                      id="email"
                      type="email"
                      placeholder="exemplo@email.com"
                      value={email}
                      onIonInput={(e) => setEmail(e.detail.value ?? '')}
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="senha">Senha</label>
                  <div className="input-with-icon">
                    <IonIcon icon={lockClosedOutline} />
                    <IonInput
                      id="senha"
                      type="password"
                      placeholder="Sua senha secreta"
                      value={senha}
                      onIonInput={(e) => setSenha(e.detail.value ?? '')}
                      required
                    />
                  </div>
                </div>

                <IonButton
                  type="submit"
                  expand="block"
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? 'Entrando...' : 'Entrar na Plataforma'}
                </IonButton>

                <p className="signup-text">
                  Não tem uma conta? <a href="/criar-conta">Criar agora</a>
                </p>
              </form>

            </div>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
