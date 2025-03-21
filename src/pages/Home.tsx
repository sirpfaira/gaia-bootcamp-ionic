import React from "react";
import {
  IonToolbar,
  IonHeader,
  IonTitle,
  IonContent,
  IonPage,
  IonFooter,
} from "@ionic/react";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome, Simba</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="content">Welcome to Bootcamp</div>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonTitle>Day 1 Assignment</IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
