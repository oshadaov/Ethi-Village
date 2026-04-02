import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import { db } from "../services/firebase";
import { siteImageKeys } from "../data/siteImageKey";

export default function AdminImages() {
  const [existingImages, setExistingImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploadingKey, setUploadingKey] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState(
    import.meta.env.VITE_ADMIN_EMAIL || "",
  );
  const [adminPassword, setAdminPassword] = useState(
    import.meta.env.VITE_ADMIN_PASSWORD || "",
  );
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    fetchImages();
  }, []);

  const doSignIn = (e) => {
    e.preventDefault();
    setAuthError("");

    if (
      adminEmail !== import.meta.env.VITE_ADMIN_EMAIL ||
      adminPassword !== import.meta.env.VITE_ADMIN_PASSWORD
    ) {
      setAuthError(
        "Admin email or password does not match the .env configured admin.",
      );
      return;
    }

    setIsAdmin(true);
  };

  const doSignOut = () => {
    setIsAdmin(false);
  };

  const fetchImages = async () => {
    try {
      setLoading(true);

      const querySnapshot = await getDocs(collection(db, "site_images"));
      const mapped = {};

      querySnapshot.forEach((docSnap) => {
        mapped[docSnap.id] = docSnap.data();
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
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });

      await setDoc(doc(db, "site_images", imageKey), {
        imageKey,
        imageDataUrl: dataUrl,
        fileName: file.name,
        updatedAt: new Date().toISOString(),
      });

      await fetchImages();
      alert("Image updated successfully (Firestore only).");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image.");
    } finally {
      setUploadingKey("");
    }
  };

  const handleDelete = async (imageKey) => {
    const current = existingImages[imageKey];

    if (!current) {
      alert("No image entry found for this key.");
      return;
    }

    if (!window.confirm("Delete this image from Firestore?")) {
      return;
    }

    try {
      setUploadingKey(imageKey);
      await deleteDoc(doc(db, "site_images", imageKey));
      await fetchImages();
      alert("Image deleted successfully.");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete image.");
    } finally {
      setUploadingKey("");
    }
  };

  if (!isAdmin) {
    return (
      <main className="section">
        <Container>
          <SectionHeader
            eyebrow="Admin"
            title="Admin Login"
            description="Sign in with admin credentials from .env to manage website images."
          />

          <form onSubmit={doSignIn} className="admin-auth-form">
            <label>
              Email
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
              />
            </label>

            {authError && <p className="form-error">{authError}</p>}

            <button type="submit">Sign In</button>
          </form>
        </Container>
      </main>
    );
  }

  return (
    <main className="section">
      <Container>
        <SectionHeader
          eyebrow="Admin"
          title="Manage Website Images"
          description="Upload and replace images used across the website."
        />

        <div className="admin-auth-status">
          <span>Signed in as: {adminEmail}</span>
          <button onClick={doSignOut}>Sign Out</button>
        </div>

        {loading ? (
          <p>Loading images...</p>
        ) : (
          <div className="admin-image-grid">
            {siteImageKeys.map((item) => {
              const current = existingImages[item.key];

              return (
                <div key={item.key} className="admin-image-card">
                  <h3>{item.label}</h3>

                  <div className="admin-image-preview">
                    {current?.imageDataUrl ? (
                      <img src={current.imageDataUrl} alt={item.label} />
                    ) : (
                      <div className="admin-image-placeholder">
                        No image uploaded
                      </div>
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

                  {current?.imageDataUrl && (
                    <>
                      <a
                        href={current.imageDataUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="admin-image-link"
                      >
                        Open current image
                      </a>
                      <button
                        className="admin-delete-btn"
                        type="button"
                        onClick={() => handleDelete(item.key)}
                        disabled={uploadingKey === item.key}
                      >
                        Delete current image
                      </button>
                    </>
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
