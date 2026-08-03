import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonIcon,
  IonInput,
  IonButton,
  useIonRouter,
  IonToast,
} from '@ionic/react';
import { arrowBack, mailOutline, lockClosedOutline, homeOutline } from 'ionicons/icons';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const router = useIonRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'success' | 'danger'>('success');

  const handleVoltar = () => {
    router.goBack();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/auth/logar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });
      const data = await response.json();
      if (!response.ok) {
        setToastColor('danger');
        setToastMessage(data.error || 'Erro ao realizar login.');
        setShowToast(true);
        return;
      }
      localStorage.setItem('token', data.token);
      setToastColor('success');
      setToastMessage('Login realizado com sucesso!');
      setShowToast(true);
      setTimeout(() => {
        router.push('/home', 'root', 'replace');
      }, 1000);
    } catch (err) {
      setToastColor('danger');
      setToastMessage('Erro de conexão ao servidor.');
      setShowToast(true);
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
                  Não tem uma conta? <a href="/cadastro">Cadastro</a>
                </p>
              </form>

            </div>
          </div>

        </div>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          position="bottom"
          color={toastColor}
        />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
