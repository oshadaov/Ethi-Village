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
import Stay from "../pages/Stay";
import Impact from "../pages/Impact";
import Comments from "../pages/Comments";
import Blog from "../pages/Blog";
import BlogPostView from "../pages/BlogPostView";
import NotFound from "../pages/NotFound";
import AdminDashboard from "../pages/AdminDashboard";
import RoleGuard, { AdminLogin } from "./RoleGuard";
import FloatingWhatsApp from "../components/common/FloatingWhatsApp";

export default function AppRoutes() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stay" element={<Stay />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPostView />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Backward Compatibility Routes */}
        <Route path="/experiences" element={<Navigate to="/stay#activities" replace />} />
        <Route path="/accommodation" element={<Navigate to="/stay#accommodation" replace />} />
        <Route path="/guides" element={<Navigate to="/stay#activities" replace />} />
        <Route path="/about" element={<Navigate to="/impact" replace />} />
        <Route
          path="/admin/login"
          element={
            localStorage.getItem("adminAuth") === "true" ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <AdminLogin onLogin={() => window.location.href = "/admin/dashboard"} />
            )
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <RoleGuard requiredRole="admin">
              <AdminDashboard />
            </RoleGuard>
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
            <RoleGuard requiredRole="admin">
              <AdminDashboard />
            </RoleGuard>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminPath && <FloatingWhatsApp />}
      <Footer />
    </>
  );
}
