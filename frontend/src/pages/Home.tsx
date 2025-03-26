import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { Virtuoso } from "react-virtuoso";
import axios from "axios";
import { useEffect, useState } from "react";
import { person } from "ionicons/icons";
import { useHistory } from "react-router";
import { signOut } from "firebase/auth";
import { database } from "../config/firebase";

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

const HomePage = () => {
  const history = useHistory();
  const [showToast] = useIonToast();
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    async function fetchComments() {
      await axios
        .get("http://localhost:5000/comments")
        .then((response) => {
          const data = response.data as Comment[];
          setComments(data);
        })
        .catch((error) => console.error(error));
    }
    fetchComments();
  }, []);
  async function signOutUser() {
    try {
      await signOut(database);
      localStorage.removeItem("firebase-token");
      history.push("/login");
    } catch (e: any) {
      await showToast({
        message: e.error_description || e.message || e.code,
        duration: 5000,
      });
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonRow className="ion-justify-content-between ion-no-padding">
            <h5 className="ion-padding-horizontal">Hi User</h5>
            <IonButton fill="clear" size="small" onClick={signOutUser}>
              Logout
            </IonButton>
          </IonRow>
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
    </IonPage>
  );
};

export default HomePage;
