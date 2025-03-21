import {
  IonContent,
  IonHeader,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const HomePage = () => (
  <>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Home</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div className="content">
        <IonText color="primary">
          <h2 className="">Welcome to our site</h2>
        </IonText>
        <IonText color="secondary">
          <p className="ion-text-center">
            We are happy to have you here. Please navigate to the
            <IonText color="success">
              <b> Form Tab </b>
            </IonText>
            to register your information.
          </p>
        </IonText>
      </div>
    </IonContent>
  </>
);

export default HomePage;
