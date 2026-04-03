import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Home from "../pages/Home";
import Experiences from "../pages/Experiences";
import Accommodation from "../pages/Accommodation";
import Guides from "../pages/Guides";
import Gallery from "../pages/Gallery";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import AdminDashboard from "../pages/AdminDashboard";
import AdminGuard from "./AdminGuard";
import FloatingWhatsApp from "../components/common/FloatingWhatsApp";

export default function AppRoutes() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminGuard>
              <AdminDashboard />
            </AdminGuard>
          }
        />
        <Route
          path="/admin"
          element={<Navigate to="/admin/images" replace />}
        />
        <Route
          path="/admin/imges"
          element={<Navigate to="/admin/images" replace />}
        />
        <Route
          path="/admin/images"
          element={
            <AdminGuard>
              <AdminDashboard />
            </AdminGuard>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminPath && <FloatingWhatsApp />}
      <Footer />
    </>
  );
}
