export const contactInfo = {
   whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "",
  whatsappDisplay: import.meta.env.VITE_WHATSAPP_DISPLAY || "",
  email: "hello@etilivillage.com",
  location: "Near Ella, Sri Lanka",
  locationNote: "Peaceful village surroundings with guided local access.",
};

export const initialContactForm = {
  fullName: "",
  email: "",
  phone: "",
  nationality: "",
  preferredDate: "",
  guests: "2",
  experience: "",
  accommodation: "No",
  pickup: "No",
  message: "",
};

export const guestOptions = [
  { value: "1", label: "1 Guest" },
  { value: "2", label: "2 Guests" },
  { value: "3", label: "3 Guests" },
  { value: "4", label: "4 Guests" },
  { value: "5+", label: "5+ Guests" },
];

export const yesNoMaybeOptions = [
  { value: "No", label: "No" },
  { value: "Yes", label: "Yes" },
  { value: "Maybe", label: "Maybe" },
];