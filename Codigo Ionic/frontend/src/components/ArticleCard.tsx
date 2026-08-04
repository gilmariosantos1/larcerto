import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import "./ArticleCard.css";

interface ArticleCardProps {
  image: string;
  category: string;
  date: string;
  title: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ image, category, date, title }) => {
  const safeImage = image || "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80";

  return (
    <IonCard className="article-card">
      <img src={safeImage} alt={title} className="article-image" loading="lazy" />
      <IonCardHeader>
        <IonCardSubtitle>{category}</IonCardSubtitle>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{date}</IonCardContent>
    </IonCard>
  );
};

export default ArticleCard;