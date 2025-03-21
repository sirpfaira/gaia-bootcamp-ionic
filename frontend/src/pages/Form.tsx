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
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterSchema = z.object({
  name: z.string().min(3, "Name must contain at least 3 characters"),
  email: z.string().email(),
  password: z.string().min(6, "Password must contain at least 6 characters"),
});

const FormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(RegisterSchema) });

  function onSubmit(data: any) {
    console.log(data);
  }
  return (
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
                <IonButton type="submit">Submit</IonButton>
              </form>
            </IonCardContent>

            {/* <IonButton style={{ margin: "15px" }}>Submit</IonButton> */}
          </IonCard>
        </div>
      </IonContent>
    </>
  );
};

export default FormPage;
