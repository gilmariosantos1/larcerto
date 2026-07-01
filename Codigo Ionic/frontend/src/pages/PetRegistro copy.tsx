import React, { useState } from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonIcon,
} from '@ionic/react';
import {
    pawOutline,
    shieldCheckmarkOutline,
    peopleCircleOutline,
    checkmarkCircleOutline,
    cameraOutline,
    imageOutline,
} from 'ionicons/icons';
import './PetRegistro.css';

const PetRegistro: React.FC = () => {
    const [name, setName] = useState('');
    const [sex, setSex] = useState('');
    const [age, setAge] = useState('');
    const [size, setSize] = useState('');
    const [breed, setBreed] = useState('');
    const [story, setStory] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [photoName, setPhotoName] = useState('Nenhuma foto selecionada');

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setPhotoName(file.name);
        }
    };

    const handleSubmit = () => {
        console.log({
            name,
            sex,
            age,
            size,
            breed,
            story,
            state,
            city,
            neighborhood,
            photoName,
        });
    };

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar className="registro-toolbar">
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <div className="toolbar-brand">
                        <IonIcon icon={pawOutline} />
                        <span>LarCerto</span>
                    </div>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="registro-content">
                <div className="page-header">
                    <p className="badge">Cadastro de Pet</p>
                    <h1>Um lar seguro começa com um bom cadastro.</h1>
                    <p className="subtitle">
                        Preencha as informações do seu amiguinho para que ele encontre a família ideal.
                    </p>
                </div>

                <IonGrid className="info-grid">
                    <IonRow>
                        <IonCol size="12" sizeMd="6" sizeLg="3">
                            <IonCard className="info-card">
                                <div className="info-icon">
                                    <IonIcon icon={shieldCheckmarkOutline} />
                                </div>
                                <h3>Lar garantido</h3>
                                <p>Protegemos o processo para que o pet encontre um lar responsável.</p>
                            </IonCard>
                        </IonCol>
                        <IonCol size="12" sizeMd="6" sizeLg="3">
                            <IonCard className="info-card">
                                <div className="info-icon">
                                    <IonIcon icon={checkmarkCircleOutline} />
                                </div>
                                <h3>Processo seguro</h3>
                                <p>Seu anúncio fica disponível apenas para pessoas interessadas em adoção responsável.</p>
                            </IonCard>
                        </IonCol>
                        <IonCol size="12" sizeMd="6" sizeLg="3">
                            <IonCard className="info-card">
                                <div className="info-icon">
                                    <IonIcon icon={peopleCircleOutline} />
                                </div>
                                <h3>Gratuito & fácil</h3>
                                <p>Criar o perfil do pet é rápido e não custa nada.</p>
                            </IonCard>
                        </IonCol>
                        <IonCol size="12" sizeMd="6" sizeLg="3">
                            <IonCard className="info-card">
                                <div className="info-icon">
                                    <IonIcon icon={pawOutline} />
                                </div>
                                <h3>Você não está sozinho</h3>
                                <p>Contamos com uma comunidade pronta para ajudar em cada etapa.</p>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                <div className="registro-form">
                    <IonCard className="section-card">
                        <IonCardContent>
                            <div className="section-header">
                                <h2>Identidade do Pet</h2>
                                <p>Dados importantes para o perfil do seu companheiro.</p>
                            </div>
                            <IonItem className="input-item">
                                <IonLabel position="stacked">Nome</IonLabel>
                                <IonInput
                                    value={name}
                                    placeholder="Digite o nome do pet"
                                    onIonChange={(e) => setName(e.detail.value!)}
                                />
                            </IonItem>

                            <IonRow className="field-row">
                                <IonCol size="6">
                                    <IonItem className="input-item">
                                        <IonLabel position="stacked">Sexo</IonLabel>
                                        <IonSelect
                                            value={sex}
                                            placeholder="Selecione"
                                            onIonChange={(e) => setSex(e.detail.value!)}
                                        >
                                            <IonSelectOption value="M">Macho</IonSelectOption>
                                            <IonSelectOption value="F">Fêmea</IonSelectOption>
                                        </IonSelect>
                                    </IonItem>
                                </IonCol>
                                <IonCol size="6">
                                    <IonItem className="input-item">
                                        <IonLabel position="stacked">Idade</IonLabel>
                                        <IonInput
                                            value={age}
                                            placeholder="Ex: 2 anos"
                                            onIonChange={(e) => setAge(e.detail.value!)}
                                        />
                                    </IonItem>
                                </IonCol>
                            </IonRow>

                            <IonRow className="field-row">
                                <IonCol size="6">
                                    <IonItem className="input-item">
                                        <IonLabel position="stacked">Porte</IonLabel>
                                        <IonSelect
                                            value={size}
                                            placeholder="Selecione"
                                            onIonChange={(e) => setSize(e.detail.value!)}
                                        >
                                            <IonSelectOption value="pequeno">Pequeno</IonSelectOption>
                                            <IonSelectOption value="medio">Médio</IonSelectOption>
                                            <IonSelectOption value="grande">Grande</IonSelectOption>
                                        </IonSelect>
                                    </IonItem>
                                </IonCol>
                                <IonCol size="6">
                                    <IonItem className="input-item">
                                        <IonLabel position="stacked">Raça</IonLabel>
                                        <IonInput
                                            value={breed}
                                            placeholder="Digite a raça"
                                            onIonChange={(e) => setBreed(e.detail.value!)}
                                        />
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                        </IonCardContent>
                    </IonCard>

                    <IonCard className="section-card">
                        <IonCardContent>
                            <div className="section-header">
                                <h2>História & Personalidade</h2>
                                <p>Conte um pouco sobre o comportamento e a rotina do pet.</p>
                            </div>
                            <IonItem className="input-item">
                                <IonLabel position="stacked">História</IonLabel>
                                <IonTextarea
                                    value={story}
                                    placeholder="Descreva o pet em poucas palavras"
                                    onIonChange={(e) => setStory(e.detail.value!)}
                                    rows={6}
                                />
                            </IonItem>
                        </IonCardContent>
                    </IonCard>

                    <IonCard className="section-card">
                        <IonCardContent>
                            <div className="section-header">
                                <h2>Localização</h2>
                                <p>Informe onde o pet está localizado atualmente.</p>
                            </div>
                            <IonRow className="field-row">
                                <IonCol size="6">
                                    <IonItem className="input-item">
                                        <IonLabel position="stacked">Estado</IonLabel>
                                        <IonInput
                                            value={state}
                                            placeholder="Ex: SP"
                                            onIonChange={(e) => setState(e.detail.value!)}
                                        />
                                    </IonItem>
                                </IonCol>
                                <IonCol size="6">
                                    <IonItem className="input-item">
                                        <IonLabel position="stacked">Cidade</IonLabel>
                                        <IonInput
                                            value={city}
                                            placeholder="Ex: São Paulo"
                                            onIonChange={(e) => setCity(e.detail.value!)}
                                        />
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonItem className="input-item">
                                <IonLabel position="stacked">Bairro</IonLabel>
                                <IonInput
                                    value={neighborhood}
                                    placeholder="Digite o bairro"
                                    onIonChange={(e) => setNeighborhood(e.detail.value!)}
                                />
                            </IonItem>
                        </IonCardContent>
                    </IonCard>

                    <IonCard className="section-card">
                        <IonCardContent>
                            <div className="section-header">
                                <h2>Foto do Amiguinho</h2>
                                <p>Escolha uma foto bonita para deixar o anúncio mais atrativo.</p>
                            </div>
                            <div className="upload-box">
                                <div className="upload-info">
                                    <IonIcon icon={imageOutline} className="upload-icon" />
                                    <div>
                                        <p>{photoName}</p>
                                        <small>PNG, JPG ou JPEG. Até 5MB.</small>
                                    </div>
                                </div>
                                <div>
                                    <input
                                        id="pet-photo"
                                        type="file"
                                        accept="image/*"
                                        className="file-input"
                                        onChange={handlePhotoChange}
                                    />
                                    <IonButton fill="solid" className="btn-upload" onClick={() => document.getElementById('pet-photo')?.click()}>
                                        <IonIcon slot="start" icon={cameraOutline} />
                                        Adicionar foto
                                    </IonButton>
                                </div>
                            </div>
                        </IonCardContent>
                    </IonCard>

                    <div className="register-footer">
                        <IonButton expand="block" className="btn-next" onClick={handleSubmit}>
                            Próximo cadastro
                        </IonButton>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default PetRegistro;
