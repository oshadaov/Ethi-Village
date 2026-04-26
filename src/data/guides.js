/**
 * Guides Data
 * Fetches from backend API instead of static data
 */

import { getGuides as fetchGuidesAPI } from "../services/api";

// Cache for guides
let guidesCache = null;
let cachePromise = null;

/**
 * Get all guides from API
 * @returns {Promise<Array>} Array of guide objects
 */
export const getGuides = async () => {
  // Return cached data if available
  if (guidesCache) {
    return guidesCache;
  }

  // If already fetching, return existing promise
  if (cachePromise) {
    return cachePromise;
  }

  // Create new fetch promise
  cachePromise = fetchGuidesAPI()
    .then((data) => {
      guidesCache = data || [];
      cachePromise = null;
      return guidesCache;
    })
    .catch((error) => {
      cachePromise = null;
      console.error("Failed to fetch guides:", error);
      // Return empty array on error
      return [];
    });

  return cachePromise;
};

// For backward compatibility with direct imports that might exist
export const guides = [];
