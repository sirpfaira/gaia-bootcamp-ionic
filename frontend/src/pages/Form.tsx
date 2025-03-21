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
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const FormPage = () => {
  const { user, setUser } = useContext(AppContext);
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registration form</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="content">
          <div
            style={{
              margin: "15px",
              width: "100%",
              padding: "0px 15px",
              border: "solid",
              borderColor: "grey",
              borderRadius: "10px",
              borderWidth: "1px",
            }}
          >
            <IonText color="primary">
              <h3>{`Name: ${user.name}, Age: ${user.age}`}</h3>
            </IonText>
          </div>

          <IonCard style={{ margin: "15px", width: "100%" }}>
            <IonCardHeader className="ion-padding">
              <IonCardTitle>Update Info</IonCardTitle>
              <IonCardSubtitle>Fill in your information</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <IonInput
                label="Full Name"
                labelPlacement="stacked"
                placeholder="John Doe"
                value={name}
                onIonChange={(e) => setName(e.target.value?.toString() || "")}
              ></IonInput>
              <IonInput
                label="Age"
                labelPlacement="stacked"
                               placeholder="20"
                value={age}
                onIonChange={(e) => setAge(Number(e.target.value) || 0)}
              ></IonInput>
            </IonCardContent>

            <IonButton
              style={{ margin: "15px" }}
              onClick={() => setUser({ name: name, age: age })}
            >
              Submit
            </IonButton>
          </IonCard>
        </div>
      </IonContent>
    </>
  );
};

export default FormPage;
