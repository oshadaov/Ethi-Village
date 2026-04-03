/**
 * API Service
 * Centralized API calls for all backend endpoints
 */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8085/api/admin";

// Generic fetch helper with error handling
const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
};

// Experiences API
export const getExperiences = async () => {
  return fetchData("/experiences");
};

// Rooms/Accommodation API
export const getRooms = async () => {
  return fetchData("/rooms");
};

// Guides API
export const getGuides = async () => {
  return fetchData("/guides");
};

// Gallery API
export const getGallery = async () => {
  return fetchData("/gallery");
};

// Gallery Categories API
export const getGalleryCategories = async () => {
  return fetchData("/gallery/categories");
};

// FAQ API
export const getFAQ = async () => {
  return fetchData("/faq");
};

// Testimonials API
export const getTestimonials = async () => {
  return fetchData("/testimonials");
};

export default {
  getExperiences,
  getRooms,
  getGuides,
  getGallery,
  getGalleryCategories,
  getFAQ,
  getTestimonials,
};
