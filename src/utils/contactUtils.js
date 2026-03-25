export function buildWhatsAppMessage(formData) {
  return encodeURIComponent(
    `Hello, I would like to book or inquire about Etili Village Experience.
Name: ${formData.fullName || "-"}
Email: ${formData.email || "-"}
Phone: ${formData.phone || "-"}
Nationality: ${formData.nationality || "-"}
Preferred Date: ${formData.preferredDate || "-"}
Guests: ${formData.guests || "-"}
Experience: ${formData.experience || "-"}
Accommodation Needed: ${formData.accommodation || "-"}
Pickup Needed: ${formData.pickup || "-"}
Message: ${formData.message || "-"}`
  );
}

export function buildWhatsAppUrl(number, message) {
  return `https://wa.me/${number}?text=${message}`;
}