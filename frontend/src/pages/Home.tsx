import {
  IonButton,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonToast,
} from "@ionic/react";
import { send } from "ionicons/icons";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Message {
  text: string;
  me: boolean;
}

const MessageSchema = z.object({
  message: z.string().min(2, "Message must contain at least 2 characters"),
});

const HomePage = () => {
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(MessageSchema),
  });
  const [showToast] = useIonToast();
  const [showLoading, hideLoading] = useIonLoading();
  const [messages, setMessages] = useState<Message[]>([]);

  async function sendMessage(formData: z.infer<typeof MessageSchema>) {
    await showLoading();
    const apiUrl = import.meta.env.VITE_API_URL as string;
    await axios
      .post(`${apiUrl}/chat`, formData)
      .then((response) => {
        const data = response.data as string;
        setMessages([
          ...messages,
          { text: formData.message, me: true },
          { text: data, me: false },
        ]);
        reset({ message: "" });
      })
      .catch(async (e) => {
        await showToast({
          message: e.error_description || e.message || e.code,
          duration: 5000,
        });
      });
    await hideLoading();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Chat With Gemini AI</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
          }}
        >
          <div
            className="ion-padding"
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              overflowY: "auto",
            }}
          >
            {messages.map((message, index) => (
              <IonRow
                key={index}
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: message.me ? "flex-end" : "flex-start",
                }}
              >
                <IonChip
                  style={{
                    margin: "10px",
                    maxWidth: "80%",
                    background: message.me ? "#007aff" : "#f4f4f4",
                    color: message.me ? "#ffffff" : "#000000",
                    alignSelf: message.me ? "flex-end" : "flex-start",
                  }}
                >
                  <IonLabel>{message.text}</IonLabel>
                </IonChip>
              </IonRow>
            ))}
          </div>
          <form onSubmit={handleSubmit(sendMessage)}>
            <div
              style={{
                display: "flex",
                bottom: 0,
                background: "#ffffff",
                padding: "10px 20px",
                borderTop: "1px solid rgb(197, 198, 204)",
              }}
            >
              <IonInput
                fill="outline"
                placeholder="Send message at least 2 chars..."
                {...register("message")}
              />
              <IonButton
                style={{
                  margin: "0px 0 0 10px",
                }}
                type="submit"
              >
                <IonIcon icon={send}></IonIcon>
              </IonButton>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
