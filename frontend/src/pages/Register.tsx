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
import { database } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router";

const RegisterSchema = z.object({
  name: z.string().min(3, "Name must contain at least 3 characters"),
  email: z.string().email(),
  password: z.string().min(6, "Password must contain at least 6 characters"),
});

export function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(RegisterSchema) });

  const [showLoading, hideLoading] = useIonLoading();
  const [showToast] = useIonToast();
  const history = useHistory();

  async function onSubmit(data: any) {
    console.log(data);
    await showLoading();
    try {
      const res = await createUserWithEmailAndPassword(
        database,
        data.email,
        data.password
      );
      const token = await res.user.getIdToken();
      localStorage.setItem("firebase-token", token);
      history.push("/");
    } catch (e: any) {
      await showToast({
        message: e.error_description || e.message,
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
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="content">
          <IonCard style={{ margin: "15px", width: "100%" }}>
            <IonCardHeader className="ion-padding">
              <IonCardTitle>
                <h3>Firebase + Ionic React</h3>
              </IonCardTitle>
              <IonCardSubtitle>Register new account</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <IonInput
                    label="Name"
                    labelPlacement="stacked"
                    placeholder="John Doe"
                    {...register("name")}
                  ></IonInput>
                  {errors.name && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {errors.name.message}
                    </p>
                  )}
                </div>
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
                  Register
                </IonButton>
                <span style={{ fontSize: "12px", marginTop: "10px" }}>
                  Already have an account? <a href="/login">Login</a>
                </span>
              </form>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
}
