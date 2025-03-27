import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonChip,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { Virtuoso } from "react-virtuoso";
import axios from "axios";
import { useEffect, useState } from "react";


interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
  email: string;
}

const HomePage = () => {
  const [showToast] = useIonToast();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const apiUrl = import.meta.env.VITE_API_URL as string;
      await axios
        .get(`${apiUrl}/users`)
        .then((response) => {
          const data = response.data as User[];
          setUsers(data);
        })
        .catch(async (e) => {
          await showToast({
            message: e.error_description || e.message || e.code,
            duration: 5000,
          });
        });
    }
    fetchUsers();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Virtuoso
          style={{ height: "100%" }}
          totalCount={users.length}
          itemContent={(index) => (
            <IonCard key={index}>
              <IonCardContent className="ion-no-padding">
                <IonItem lines="none">
                  <IonAvatar slot="start">
                    <IonImg src={users[index].picture.large} />
                  </IonAvatar>
                  <IonLabel>
                    {users[index].name.title} {users[index].name.first}
                    {users[index].name.last}
                    <p>{users[index].email}</p>
                  </IonLabel>
                  <IonChip slot="end" color="primary">
                    {users[index].nat}
                  </IonChip>
                </IonItem>
              </IonCardContent>
            </IonCard>
          )}
        />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
