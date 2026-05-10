import { useEffect, useState } from "react";
import { getSiteImages, getCachedData } from "../services/api";

export function useSiteImages() {
  const cachedData = getCachedData("/site-images");
  
  const mapImages = (data) => {
    const mapped = {};
    (data || []).forEach((item) => {
      const remoteImage = item.imageDataUrl || item.imageUrl || item.image;
      if (item.imageKey) {
        mapped[item.imageKey] = remoteImage;
      }
    });
    return mapped;
  };

  const [images, setImages] = useState(() => mapImages(cachedData));
  const [loading, setLoading] = useState(!cachedData);

  useEffect(() => {
    if (!cachedData) {
      fetchImages();
    }
  }, [cachedData]);

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
