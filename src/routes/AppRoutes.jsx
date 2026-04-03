import { Routes, Route, Navigate } from "react-router-dom";
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
import AdminImages from "../pages/AdminImage";
import AdminDashboard from "../pages/AdminDashboard";
import FloatingWhatsApp from "../components/common/FloatingWhatsApp";

export default function AppRoutes() {
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
        <Route path="/admin/dashboard" element={<AdminDashboard />} />  
        <Route
          path="/admin"
          element={<Navigate to="/admin/images" replace />}
        />
        <Route
          path="/admin/imges"
          element={<Navigate to="/admin/images" replace />}
        />
        <Route path="/admin/images" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FloatingWhatsApp />
      <Footer />
    </>
  );
}
