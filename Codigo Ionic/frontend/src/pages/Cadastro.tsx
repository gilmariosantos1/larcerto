import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonIcon,
  IonButton,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonToast
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import {
  arrowBackOutline,
  paw,
  personOutline,
  mailOutline,
  callOutline,
  lockClosedOutline,
  checkmarkCircleOutline,
  pawOutline
} from 'ionicons/icons';
import './Cadastro.css';

const Cadastro: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('adotante');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Estado de Erros e Feedback
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'success' | 'danger'>('success');

  // Máscara para telefone/WhatsApp
  const handlePhoneInput = (ev: any) => {
    const value = ev.target.value || '';
    const onlyNums = value.replace(/\D/g, '');

    let formatted = onlyNums;
    if (onlyNums.length > 2) {
      formatted = `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2)}`;
    }
    if (onlyNums.length > 7) {
      formatted = `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}-${onlyNums.slice(7, 11)}`;
    }

    const finalValue = onlyNums.length <= 11 ? formatted : phone;
    setPhone(finalValue);
    ev.target.value = finalValue;

    // Limpa erro ao digitar
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      tempErrors.name = 'O nome completo é obrigatório.';
    }

    if (!email.trim()) {
      tempErrors.email = 'O e-mail é obrigatório.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        tempErrors.email = 'Insira um e-mail válido.';
      }
    }

    if (!password) {
      tempErrors.password = 'A senha é obrigatória.';
    } else if (password.length < 6) {
      tempErrors.password = 'A senha deve ter no mínimo 6 caracteres.';
    }

    if (!confirmPassword) {
      tempErrors.confirmPassword = 'A confirmação de senha é obrigatória.';
    } else if (password !== confirmPassword) {
      tempErrors.confirmPassword = 'As senhas não coincidem.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const mappedRole = role.charAt(0).toUpperCase() + role.slice(1);
      const response = await fetch('http://localhost:3001/api/auth/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Nome: name, email, Telefone: phone, Perfil: mappedRole, senha: password })
      });

      const data = await response.json();

      if (!response.ok) {
        setToastColor('danger');
        setToastMessage(data.error || 'Erro ao criar conta.');
        setShowToast(true);
        return;
      }

      // Login automático após cadastro
      try {
        const loginResponse = await fetch('http://localhost:3001/api/auth/logar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, senha: password })
        });
        const loginData = await loginResponse.json();
        if (loginResponse.ok && loginData.token) {
          localStorage.setItem('token', loginData.token);
        }
      } catch (_) {
        // Login automático falhou, usuário pode entrar manualmente
      }

      setToastColor('success');
      setToastMessage('Conta criada com sucesso! Bem-vindo(a)!');
      setShowToast(true);
      setTimeout(() => history.push('/home'), 1500);

    } catch (erro) {
      setToastColor('danger');
      setToastMessage('Não foi possível conectar ao servidor. Tente novamente.');
      setShowToast(true);
    }
  };

  return (
    <IonPage className="cadastro-page">
      <IonHeader className="ion-no-border">
        <IonToolbar className="cadastro-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" icon={arrowBackOutline} text="" className="cadastro-back-btn" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="cadastro-content">
        <div className="cadastro-hero">
          <h1 className="cadastro-hero-title">Faça parte<br />dessa causa.</h1>
          <p className="cadastro-hero-subtitle">
            Crie sua conta e ajude a transformar a vida de milhares de pets que estão nas ruas e abrigos à procura de um lar apaixonado.
          </p>
        </div>

        <div className="cadastro-form-container">
          <div className="cadastro-brand">
            <div className="cadastro-logo-icon-wrapper">
              <IonIcon icon={paw} className="cadastro-logo-icon" />
            </div>
            <span className="cadastro-logo-text">LarCerto</span>
          </div>

          <h2 className="cadastro-form-title">Junte-se à causa!</h2>
          <p className="cadastro-form-subtitle">
            Adote ou conecte corações, cadastre sua conta agora.
          </p>

          <form className="cadastro-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <IonLabel className="form-label">Nome completo *</IonLabel>
              <div className={`input-wrapper ${errors.name ? 'input-error-border' : ''}`}>
                <IonIcon icon={personOutline} className="input-icon" />
                <IonInput
                  type="text"
                  placeholder="Seu nome completo"
                  className="custom-input"
                  value={name}
                  onIonInput={(e) => {
                    setName(e.detail.value || '');
                    if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                  }}
                />
              </div>
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <IonLabel className="form-label">E-mail *</IonLabel>
              <div className={`input-wrapper ${errors.email ? 'input-error-border' : ''}`}>
                <IonIcon icon={mailOutline} className="input-icon" />
                <IonInput
                  type="email"
                  placeholder="seu@email.com"
                  className="custom-input"
                  value={email}
                  onIonInput={(e) => {
                    setEmail(e.detail.value || '');
                    if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                  }}
                />
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <IonLabel className="form-label">Telefone / WhatsApp</IonLabel>
              <div className="input-wrapper">
                <IonIcon icon={callOutline} className="input-icon" />
                <IonInput
                  type="tel"
                  placeholder="(79) 99999-9999"
                  className="custom-input"
                  value={phone}
                  onIonInput={handlePhoneInput}
                />
              </div>
            </div>

            <div className="form-group">
              <IonLabel className="form-label">Quero me cadastrar como *</IonLabel>
              <div className="input-wrapper select-wrapper">
                <IonIcon icon={pawOutline} className="input-icon" />
                <IonSelect
                  value={role}
                  placeholder="Adotante — quero adotar um pet"
                  className="custom-select"
                  interface="popover"
                  onIonChange={(e) => setRole(e.detail.value)}
                >
                  <IonSelectOption value="adotante">Adotante — quero adotar um pet</IonSelectOption>
                  <IonSelectOption value="doador">Doador — quero doar um pet</IonSelectOption>
                </IonSelect>
              </div>
            </div>

            <div className="form-group">
              <IonLabel className="form-label">Senha * (mín. 6 caracteres)</IonLabel>
              <div className={`input-wrapper ${errors.password ? 'input-error-border' : ''}`}>
                <IonIcon icon={lockClosedOutline} className="input-icon" />
                <IonInput
                  type="password"
                  placeholder="Crie uma senha forte"
                  className="custom-input"
                  value={password}
                  onIonInput={(e) => {
                    setPassword(e.detail.value || '');
                    if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                  }}
                />
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <IonLabel className="form-label">Confirmar senha *</IonLabel>
              <div className={`input-wrapper ${errors.confirmPassword ? 'input-error-border' : ''}`}>
                <IonIcon icon={checkmarkCircleOutline} className="input-icon" />
                <IonInput
                  type="password"
                  placeholder="Repita sua senha"
                  className="custom-input"
                  value={confirmPassword}
                  onIonInput={(e) => {
                    setConfirmPassword(e.detail.value || '');
                    if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
                  }}
                />
              </div>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <IonButton expand="block" className="btn-submit" type="submit">
              Criar minha conta
            </IonButton>

            <div className="cadastro-footer">
              <span className="footer-text">Já possui uma conta? </span>
              <a href="/login" className="footer-link">Acessar agora</a>
            </div>
          </form>
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

export default Cadastro;
