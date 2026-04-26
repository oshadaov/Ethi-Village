import { getRooms as fetchRoomsAPI } from "../services/api";
import { accommodationData } from "./accommodationData";

// Cache for rooms
let roomsCache = null;
let cachePromise = null;

/**
 * Get all rooms from API
 * @returns {Promise<Array>} Array of room objects
 */
export const getRooms = async () => {
  // Return cached data if available
  if (roomsCache) {
    return roomsCache;
  }

  // If already fetching, return existing promise
  if (cachePromise) {
    return cachePromise;
  }

  // Create new fetch promise
  cachePromise = fetchRoomsAPI()
    .then((data) => {
      // Use API data if available, otherwise fallback to static data
      roomsCache = (data && data.length > 0) ? data : accommodationData;
      cachePromise = null;
      return roomsCache;
    })
    .catch((error) => {
      cachePromise = null;
      console.error("Failed to fetch rooms from API, using static data:", error);
      // Fallback to static data on error
      return accommodationData;
    });

  return cachePromise;
};

// For backward compatibility
export const rooms = [];
