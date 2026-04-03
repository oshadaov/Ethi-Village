/**
 * Gallery Data
 * Fetches from backend API instead of static data
 */

import {
  getGallery as fetchGalleryAPI,
  getGalleryCategories as fetchGalleryCategoriesAPI,
} from "../services/api";

// Cache for gallery categories
let galleryCategoriesCache = null;
let galleryCategoriesPromise = null;

/**
 * Get gallery categories from API
 * @returns {Promise<Array>} Array of categories
 */
export const getGalleryCategories = async () => {
  if (galleryCategoriesCache) {
    return galleryCategoriesCache;
  }

  if (galleryCategoriesPromise) {
    return galleryCategoriesPromise;
  }

  galleryCategoriesPromise = fetchGalleryCategoriesAPI()
    .then((data) => {
      galleryCategoriesCache = data || [];
      galleryCategoriesPromise = null;
      return galleryCategoriesCache;
    })
    .catch((error) => {
      galleryCategoriesPromise = null;
      console.error("Failed to fetch gallery categories:", error);
      return ["All"];
    });

  return galleryCategoriesPromise;
};

// Cache for gallery items
let galleryItemsCache = null;
let galleryItemsPromise = null;

/**
 * Get gallery items from API
 * @returns {Promise<Array>} Array of gallery item objects
 */
export const getGalleryItems = async () => {
  if (galleryItemsCache) {
    return galleryItemsCache;
  }

  if (galleryItemsPromise) {
    return galleryItemsPromise;
  }

  galleryItemsPromise = fetchGalleryAPI()
    .then((data) => {
      galleryItemsCache = data || [];
      galleryItemsPromise = null;
      return galleryItemsCache;
    })
    .catch((error) => {
      galleryItemsPromise = null;
      console.error("Failed to fetch gallery items:", error);
      return [];
    });

  return galleryItemsPromise;
};

// For backward compatibility
export const galleryCategories = [
  "All",
  "Village Life",
  "Food",
  "Nature",
  "Guides",
  "Stay",
];
export const galleryItems = [];
