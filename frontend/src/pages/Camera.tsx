import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Camera, CameraResultType } from "@capacitor/camera";
import { camera } from "ionicons/icons";

import { useState } from "react";

const CameraPage = () => {
  const [imagePath, setImagePath] = useState<string | null>(null);

  const captureImage = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });
    if (image) {
      setImagePath(image.webPath || null);
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Camera</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="content">
          <IonButton size="small" onClick={captureImage}>
            <IonIcon slot="start" icon={camera}></IonIcon>
            Capture Image
          </IonButton>
          {imagePath && (
            <IonImg
              src={imagePath}
              alt="Captured image"
              style={{ marginTop: "20px" }}
            ></IonImg>
          )}
        </div>
      </IonContent>
    </>
  );
};

export default CameraPage;
