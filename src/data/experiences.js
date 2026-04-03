/**
 * Experiences Data
 * Fetches from backend API instead of static data
 */

import { getExperiences as fetchExperiencesAPI } from "../services/api";

// Cache for experiences
let experiencesCache = null;
let cachePromise = null;

/**
 * Get all experiences from API
 * @returns {Promise<Array>} Array of experience objects
 */
export const getExperiences = async () => {
  // Return cached data if available
  if (experiencesCache) {
    return experiencesCache;
  }

  // If already fetching, return existing promise
  if (cachePromise) {
    return cachePromise;
  }

  // Create new fetch promise
  cachePromise = fetchExperiencesAPI()
    .then((data) => {
      experiencesCache = data || [];
      cachePromise = null;
      return experiencesCache;
    })
    .catch((error) => {
      cachePromise = null;
      console.error("Failed to fetch experiences:", error);
      // Return empty array on error
      return [];
    });

  return cachePromise;
};

// For backward compatibility with direct imports that might exist
export const experiences = [];
