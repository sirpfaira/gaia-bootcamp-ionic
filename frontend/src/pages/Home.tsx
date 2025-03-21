import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

type Post = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

const HomePage = () => {
  const { user } = useContext(AppContext);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      await axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => setPosts(response.data))
        .catch((error) => console.error(error));
    }
    fetchPosts();
  }, []);
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {user && (
          <IonItem style={{ marginBottom: "5px" }}>
            <IonText color="primary">
              <h3>{`Good day, ${user.name}`}</h3>
            </IonText>
          </IonItem>
        )}
        <IonList>
          {posts.slice(0, 10).map((item) => (
            <IonItem key={item.id}>
              <IonLabel>{item.title}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </>
  );
};

export default HomePage;
