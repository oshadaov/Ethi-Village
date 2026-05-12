export const contactInfo = {
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "94771111111",
  whatsappDisplay: import.meta.env.VITE_WHATSAPP_DISPLAY || "+94 77 1111111",
  email: import.meta.env.VITE_CONTACT_EMAIL || "info@etilivillage.com",
  phone: import.meta.env.VITE_CONTACT_PHONE || "+94-11111111",
  location: "Between Tissamaharama and Ella. 15 minutes drive from Wellawaya town.",
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
  room: "",
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