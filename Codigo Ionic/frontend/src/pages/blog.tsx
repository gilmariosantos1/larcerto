import React, {
  useMemo,
  useState,

} from "react";

import ArticleCard from "../components/ArticleCard";
import Footer from "../components/Footer";

import {

  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonAvatar,
  IonButton
} from '@ionic/react';
import { paw } from 'ionicons/icons';
import './blog.css';

import {
  IonContent,
  IonIcon,
  IonPage,
} from "@ionic/react";

import {
  searchOutline,
} from "ionicons/icons";


const Blog: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  const articles = [
    {
      id: 1,
      category: "Animais",
      date: "04 Jun, 2026",
      title: "Como preparar sua casa para um novo pet",
      image: "https://images.unsplash.com/photo-1558788353-f76d92427f16",
    },
    {
      id: 2,
      category: "Curiosidades",
      date: "03 Jun, 2026",
      title: "Vantagens de adotar animais adultos",
      image: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4",
    },
    {
      id: 3,
      category: "Saúde",
      date: "01 Jun, 2026",
      title: "A importância da vacinação",
      image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97",
    },
  ];

  const categories = [
    "Todos",
    "Animais",
    "Saúde",
    "Comportamento",
    "Histórias",
    "Curiosidades",
    "Dicas",
  ];

  const normalizeCategory = (value: string) => value.trim().toLowerCase();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredArticles = useMemo(() => {
    const searchText = search.toLowerCase();

    return articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchText) ||
        article.category.toLowerCase().includes(searchText);

      const matchesCategory =
        activeCategory === "Todos" ||
        normalizeCategory(article.category) === normalizeCategory(activeCategory);

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <IonPage>
      <IonContent fullscreen>...

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

        <main>

          <section
            id="inicio"
            className="hero"
          >

            <div className="hero-container">

              <h1>
               Mundo Animal em Foco
              </h1>

              <p>
                Bem-vindo ao espaço lar certo de conhecimento. Dicas essenciais, informações
                 sobre saúde vetrinária e curiosidades fascinentes para você entender e cuidar
                 cada vez melhor do seu amigo.
              </p>

            </div>

          </section>


          <section
            id="blog"
            className="content-section"
          >

            <div className="search-box">

              <IonIcon
                icon={searchOutline}
              />

              <input
                type="text"
                placeholder="Pesquisar por título ou assunto..."

                value={search}

                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
              />

            </div>


            <div className="category-list">

              {categories.map(
                (category) => (

                  <button
                    key={category}

                    className={
                      activeCategory ===
                        category
                        ? "category active"
                        : "category"
                    }

                    onClick={() =>
                      setActiveCategory(
                        category
                      )
                    }
                  >

                    {category}

                  </button>

                )
              )}

            </div>


            <div className="articles-grid">

              {filteredArticles.map(
                (article) => (

                  <ArticleCard
                    key={article.id}

                    image={
                      article.image
                    }

                    category={
                      article.category
                    }

                    date={
                      article.date
                    }

                    title={
                      article.title
                    }
                  />

                )
              )}

            </div>


            {filteredArticles.length === 0 && (

              <div className="empty-state">

                Nenhum conteúdo encontrado.

              </div>

            )}

          </section>

        </main>


        <Footer />
      </IonContent>

    </IonPage>
  );
};

export default Blog;
