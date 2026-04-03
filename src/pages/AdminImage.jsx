import { useEffect, useState } from "react";
import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import { siteImageKeys } from "../data/siteImageKey";
import {
  getSiteImages,
  uploadSiteImage,
  deleteSiteImage,
} from "../services/api";

export default function AdminImages() {
  const [existingImages, setExistingImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploadingKey, setUploadingKey] = useState("");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const data = await getSiteImages();
      const mapped = {};
      (data || []).forEach((item) => {
        mapped[item.imageKey] = item;
      });
      setExistingImages(mapped);
    } catch (error) {
      console.error("Failed to load images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (imageKey, file) => {
    if (!file) return;

    setUploadingKey(imageKey);
    try {
      await uploadSiteImage(imageKey, file);
      await fetchImages();
      alert("Image uploaded successfully.");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image.");
    } finally {
      setUploadingKey("");
    }
  };

  const handleDelete = async (imageKey) => {
    if (!window.confirm("Delete this image?")) return;

    setUploadingKey(imageKey);
    try {
      await deleteSiteImage(imageKey);
      await fetchImages();
      alert("Image deleted successfully.");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete image.");
    } finally {
      setUploadingKey("");
    }
  };

  return (
    <main className="section">
      <Container>
        <SectionHeader
          eyebrow="Admin"
          title="Manage Website Images"
          description="Upload and replace images used across the website."
        />

        {loading ? (
          <p>Loading images...</p>
        ) : (
          <div className="admin-image-grid">
            {siteImageKeys.map((item) => {
              const current = existingImages[item.key] || {};
              const imageUrl =
                current.imageUrl || current.image || current.imageDataUrl;

              return (
                <div key={item.key} className="admin-image-card">
                  <h3>{item.label}</h3>

                  <div className="admin-image-preview">
                    {imageUrl ? (
                      <img src={imageUrl} alt={item.label} />
                    ) : (
                      <div className="admin-image-placeholder">No image</div>
                    )}
                  </div>

                  <label className="admin-upload-btn">
                    {uploadingKey === item.key
                      ? "Uploading..."
                      : "Upload Image"}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) =>
                        handleUpload(item.key, e.target.files?.[0])
                      }
                    />
                  </label>

                  {imageUrl && (
                    <button
                      className="admin-delete-btn"
                      type="button"
                      onClick={() => handleDelete(item.key)}
                      disabled={uploadingKey === item.key}
                    >
                      Delete current image
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </main>
  );
}
