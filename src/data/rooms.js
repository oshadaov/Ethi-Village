/**
 * Rooms/Accommodation Data
 * Fetches from backend API instead of static data
 */

import { getRooms as fetchRoomsAPI } from "../services/api";

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
      roomsCache = data || [];
      cachePromise = null;
      return roomsCache;
    })
    .catch((error) => {
      cachePromise = null;
      console.error("Failed to fetch rooms:", error);
      // Return empty array on error
      return [];
    });

  return cachePromise;
};

// For backward compatibility with direct imports that might exist
export const rooms = [];
