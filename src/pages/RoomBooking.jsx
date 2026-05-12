import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Container from "../components/common/Container";
import { getRooms, getExperiences } from "../services/api";
import {
  guestOptions,
  initialContactForm,
  yesNoMaybeOptions,
} from "../data/contactConfig";
import RoomBookingForm from "../components/contact/RoomBookingForm";
import { useSiteImages } from "../hooks/useSiteImages";

export default function RoomBooking() {
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
        
        // If ID is provided, pre-select the room
        if (id) {
          const selected = rooms.find(r => r.id === id || r.id.toString() === id);
          if (selected) {
            setFormData(prev => ({ ...prev, room: selected.name, accommodation: 'Yes' }));
          }
        } else if (location.state?.name) {
             setFormData(prev => ({ ...prev, room: location.state.name, accommodation: 'Yes' }));
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
    const message = `Hello, I'm interested in booking a stay at Etili Village.
Name: ${formData.fullName}
Email: ${formData.email}
Room: ${formData.room}
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
        body: JSON.stringify({ ...formData, type: 'room' }),
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

  const heroBackground = images?.stay_hero || "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80";

  return (
    <main>
      <section className="page-hero" style={{ backgroundImage: `url('${heroBackground}')`, height: '40vh' }}>
        <Container className="page-hero-content">
          <h1>Book Your Stay</h1>
        </Container>
      </section>

      <section className="section">
        <Container style={{ maxWidth: '900px' }}>
          <RoomBookingForm
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
