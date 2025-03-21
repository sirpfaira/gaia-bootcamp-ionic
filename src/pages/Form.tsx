import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const FormPage = () => (
  <>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Registration form</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div className="content">
        <IonCard style={{ margin: "15px", width: "100%" }}>
          <IonCardHeader className="ion-padding">
            <IonCardTitle>Register</IonCardTitle>
            <IonCardSubtitle>Fill in your information</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonInput
              label="Full Name"
              labelPlacement="stacked"
              placeholder="Enter full name here"
            ></IonInput>
            <IonInput
              label="Email Address"
              labelPlacement="stacked"
              placeholder="Enter email address here"
            ></IonInput>
          </IonCardContent>

          <IonButton style={{ margin: "15px" }}>Submit</IonButton>
        </IonCard>
      </div>
    </IonContent>
  </>
);

export default FormPage;
