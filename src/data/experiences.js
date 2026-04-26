import { getExperiences as fetchExperiencesAPI } from "../services/api";
import { activitiesData } from "./activitiesData";

// Cache for experiences
let experiencesCache = null;
let cachePromise = null;

/**
 * Get all experiences from API
 * @returns {Promise<Array>} Array of activity objects
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
      // Use API data if available, otherwise fallback to static data
      experiencesCache = (data && data.length > 0) ? data : activitiesData;
      cachePromise = null;
      return experiencesCache;
    })
    .catch((error) => {
      cachePromise = null;
      console.error("Failed to fetch experiences from API, using static data:", error);
      // Fallback to static data on error
      return activitiesData;
    });

  return cachePromise;
};

// For backward compatibility
export const experiences = activitiesData;
