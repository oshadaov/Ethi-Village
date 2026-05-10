/**
 * API Service
 * Centralized API calls for all backend endpoints
 */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

const CACHE_PREFIX = "ethi_cache_";
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

export const clearCache = () => {
  try {
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith(CACHE_PREFIX)) {
        sessionStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error("Error clearing cache:", error);
  }
};

export const getCachedData = (endpoint) => {
  const cacheKey = `${CACHE_PREFIX}${endpoint}`;
  try {
    const cachedData = sessionStorage.getItem(cacheKey);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }
  } catch (e) {
    // Ignore parse errors
  }
  return null;
};

// Generic fetch helper with error handling and caching
const fetchData = async (endpoint, forceRefresh = false) => {
  const cacheKey = `${CACHE_PREFIX}${endpoint}`;

  if (!forceRefresh) {
    try {
      const cachedData = sessionStorage.getItem(cacheKey);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_DURATION) {
          return data; // Return cached data
        }
      }
    } catch (e) {
      // Ignore parse errors, proceed to fetch
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    try {
      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({ data, timestamp: Date.now() })
      );
    } catch (e) {
      // Ignore quota errors
    }

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

// Site images API
export const getSiteImages = async () => {
  return fetchData("/site-images");
};

export const uploadSiteImage = async (imageKey, file) => {
  const formData = new FormData();
  formData.append("imageKey", imageKey);
  formData.append("image", file);

  const response = await fetch(`${API_BASE_URL}/site-images`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  clearCache();
  return response.json();
};

export const deleteSiteImage = async (imageKey) => {
  const response = await fetch(
    `${API_BASE_URL}/site-images/${encodeURIComponent(imageKey)}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  clearCache();
  return response.json();
};


// Blogs API
export const getBlogs = async () => {
  return fetchData("/blogs");
};

export const getBlogBySlug = async (slug) => {
  return fetchData(`/blogs/slug/${slug}`);
};

export default {
  getExperiences,
  getRooms,
  getGuides,
  getGallery,
  getGalleryCategories,
  getFAQ,
  getTestimonials,
  getSiteImages,
  uploadSiteImage,
  deleteSiteImage,
  getBlogs,
  getBlogBySlug,
  clearCache,
  getCachedData,
};
