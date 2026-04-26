/**
 * FAQ Data
 * Fetches from backend API instead of static data
 */

import { getFAQ as fetchFAQAPI } from "../services/api";

// Cache for FAQ
let faqCache = null;
let cachePromise = null;

/**
 * Get FAQ items from API
 * @returns {Promise<Array>} Array of FAQ items
 */
export const getFAQ = async () => {
  if (faqCache) {
    return faqCache;
  }

  if (cachePromise) {
    return cachePromise;
  }

  cachePromise = fetchFAQAPI()
    .then((data) => {
      faqCache = data || [];
      cachePromise = null;
      return faqCache;
    })
    .catch((error) => {
      cachePromise = null;
      console.error("Failed to fetch FAQ:", error);
      return [];
    });

  return cachePromise;
};

// For backward compatibility
export const faqItems = [];
