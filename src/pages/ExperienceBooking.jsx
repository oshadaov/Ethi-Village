import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Container from "../components/common/Container";
import { getRooms, getExperiences } from "../services/api";
import {
  guestOptions,
  initialContactForm,
  yesNoMaybeOptions,
} from "../data/contactConfig";
import ExperienceBookingForm from "../components/contact/ExperienceBookingForm";
import { useSiteImages } from "../hooks/useSiteImages";

export default function ExperienceBooking() {
  const { id } = useParams();
  const location = useLocation();
  const { images, loading } = useSiteImages();
  
  const [formData, setFormData] = useState(initialContactForm);
  const [roomsData, setRoomsData] = useState([]);
  const [experiencesData, setExperiencesData] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [rooms, exps] = await Promise.all([getRooms(), getExperiences()]);
        setRoomsData(rooms || []);
        setExperiencesData(exps || []);
        
        // If ID is provided, pre-select the experience
        if (id) {
          const selected = exps.find(e => e.id === id || e.id.toString() === id);
          if (selected) {
            setFormData(prev => ({ ...prev, experience: selected.title }));
          }
        } else if (location.state?.name) {
             setFormData(prev => ({ ...prev, experience: location.state.name }));
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadData();
  }, [id, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const message = `Hello, I'm interested in booking an experience at Etili Village.
Name: ${formData.fullName}
Email: ${formData.email}
Experience: ${formData.experience}
Date: ${formData.preferredDate}
Guests: ${formData.guests}
Message: ${formData.message}`;
    
    const whatsappUrl = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/booking/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'experience' }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to send inquiry');
      }
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error sending inquiry:", error);
      setSubmitError("There was a problem sending your inquiry. Please try again or use the WhatsApp option.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const heroBackground = images?.experience_hero || "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=1800&q=80";

  return (
    <main>
      <section className="page-hero" style={{ backgroundImage: `url('${heroBackground}')`, height: '40vh' }}>
        <Container className="page-hero-content">
          <h1>Book an Activity</h1>
        </Container>
      </section>

      <section className="section">
        <Container style={{ maxWidth: '900px' }}>
          <ExperienceBookingForm
            formData={formData}
            submitted={submitted}
            isSubmitting={isSubmitting}
            submitError={submitError}
            rooms={roomsData}
            experiences={experiencesData}
            guestOptions={guestOptions}
            yesNoMaybeOptions={yesNoMaybeOptions}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onWhatsAppSubmit={handleWhatsAppSubmit}
          />
        </Container>
      </section>
    </main>
  );
}
