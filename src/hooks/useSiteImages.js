import { useEffect, useState } from "react";
import { getSiteImages } from "../services/api";

export function useSiteImages() {
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const data = await getSiteImages();
      const mapped = {};

      (data || []).forEach((item) => {
        const remoteImage = item.imageDataUrl || item.imageUrl || item.image;
        if (item.imageKey) {
          mapped[item.imageKey] = remoteImage;
        }
      });

      setImages(mapped);
    } catch (error) {
      console.error("Failed to fetch site images:", error);
      setImages({});
    } finally {
      setLoading(false);
    }
  };

  return { images, loading, refreshImages: fetchImages };
}
