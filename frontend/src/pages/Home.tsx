import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Virtuoso } from "react-virtuoso";
import axios from "axios";
import { useEffect, useState } from "react";
import { person } from "ionicons/icons";

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

const HomePage = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    async function fetchComments() {
      await axios
        .get("https://jsonplaceholder.typicode.com/comments")
        .then((response) => setComments(response.data))
        .catch((error) => console.error(error));
    }
    fetchComments();
  }, []);
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Virtuoso</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Virtuoso
          style={{ height: "100%" }}
          totalCount={comments.length}
          itemContent={(index) => (
            <IonItem key={comments[index].id}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "15px",
                }}
              >
                <div style={{ display: "flex" }}>
                  <IonIcon icon={person} color="primary" />
                  <IonText color="secondary" style={{ marginLeft: "5px" }}>
                    {comments[index].email}
                  </IonText>
                </div>
                <IonText>{comments[index].body}</IonText>
              </div>
            </IonItem>
          )}
        />
      </IonContent>
    </>
  );
};

export default HomePage;
