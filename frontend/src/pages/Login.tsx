import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
  useIonLoading,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { database } from "../config/firebase";
import { useHistory } from "react-router";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must contain at least 6 characters"),
});

export function LoginPage() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(LoginSchema) });

  const [showLoading, hideLoading] = useIonLoading();
  const [showToast] = useIonToast();

  async function onSubmit(data: any) {
    console.log(data);
    await showLoading();
    try {
      signInWithEmailAndPassword(database, data.email, data.password).then(
        async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          const token = await user.getIdToken();
          localStorage.setItem("firebase-token", token);
          history.push("/");
        }
      );
    } catch (e: any) {
      await showToast({
        message: e.error_description || e.message || e.code,
        duration: 5000,
      });
    } finally {
      await hideLoading();
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="content">
          <IonCard style={{ margin: "15px", width: "100%" }}>
            <IonCardHeader className="ion-padding">
              <IonCardTitle>
                <h3>Firebase + Ionic React</h3>
              </IonCardTitle>
              <IonCardSubtitle>Sign in to your account</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <IonInput
                    label="Email"
                    labelPlacement="stacked"
                    placeholder="johndoe@mail.com"
                    {...register("email")}
                  ></IonInput>
                  {errors.email && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <IonInput
                    label="Password"
                    labelPlacement="stacked"
                    type="password"
                    {...register("password")}
                  ></IonInput>
                  {errors.password && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <IonButton
                  type="submit"
                  expand="block"
                  size="small"
                  className="ion-no-margin"
                  style={{ marginTop: "15px" }}
                >
                  Login
                </IonButton>
                <span style={{ fontSize: "12px", marginTop: "10px" }}>
                  Do not have an account? <a href="/register">Register</a>
                </span>
              </form>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
}
