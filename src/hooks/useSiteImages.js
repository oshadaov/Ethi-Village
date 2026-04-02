import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

export function useSiteImages() {
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);

      const querySnapshot = await getDocs(collection(db, "site_images"));
      const mapped = {};

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const remoteImage = data.imageDataUrl || data.imageUrl || data.image;
        if (data.imageKey) {
          mapped[data.imageKey] = remoteImage;
        }
      });

      setImages(mapped);
    } catch (error) {
      console.error("Failed to fetch site images:", error);
    } finally {
      setLoading(false);
    }
  };

  return { images, loading, refreshImages: fetchImages };
}
