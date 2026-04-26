import { getRooms as fetchRoomsAPI } from "../services/api";

export const accommodationData = [
  {
    id: 1,
    name: "The Mud House",
    type: "Traditional Stay",
    pricePerNight: 180,
    priceText: "$180/night",
    guests: 2,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    imageKey: "mud_house",
    description:
      "Located in front of the central lake of the village, giving you the opportunity to experience the fishing culture of the local community while preserving traditional housing design. Features a double room, kitchen, bathroom and outdoor deck overlooking the village.",
    amenities: [
      "1 Double Room",
      "Kitchen",
      "Bathroom",
      "Outdoor Deck",
      "Living Area",
      "Dining Area",
      "Lake Views",
      "Full-time Staff",
      "Daily Housekeeping",
    ],
    highlights: [
      "Fishing Culture Experience",
      "Traditional Design",
      "Central Lake Location",
      "Village Overlooking Views",
      "Peaceful Atmosphere",
      "Community Connection",
    ],
    minNights: 2,
    mealsIncluded: ["Breakfast", "Lunch", "Dinner"],
    staffServices: ["Meal Preparation", "House Keeping", "Guest Support"],
  },
  {
    id: 2,
    name: "The Tree House Chalet",
    type: "Luxury Stay",
    pricePerNight: 250,
    priceText: "$250/night",
    guests: 4,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    imageKey: "tree_house",
    description:
      "An enchanting family room chalet nestled among trees with opportunities to encounter elephants, monkeys, spot deers and a variety of wildlife. Features 1 family room, kitchen and ensuite bathroom with regular wildlife encounters.",
    amenities: [
      "1 Family Room",
      "Kitchen",
      "Ensuite Bathroom",
      "Living Area",
      "Dining Area",
      "Full-time Staff",
      "Daily Housekeeping",
      "Wildlife Viewing Deck",
      "Scenic Views",
    ],
    highlights: [
      "Wildlife Encounters",
      "Elephant Spotting Opportunities",
      "Monkey & Deer Sightings",
      "Natural Habitat Experience",
      "Tree-level Living",
      "Adventure & Nature",
    ],
    minNights: 2,
    mealsIncluded: ["Breakfast", "Lunch", "Dinner"],
    staffServices: ["Meal Preparation", "House Keeping", "Guest Support"],
  },
  {
    id: 3,
    name: "The Farmhouse",
    type: "Agricultural Experience",
    pricePerNight: 200,
    priceText: "$200/night",
    guests: 2,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    imageKey: "farmhouse",
    description:
      "An idyllic farmhouse with a double room and ensuite bathroom overlooking a serene lake. Experience organic farming techniques while enjoying authentic farm-to-table cuisine and delicious culinary traditions.",
    amenities: [
      "1 Double Room",
      "Ensuite Bathroom",
      "Kitchen",
      "Living Area",
      "Dining Area",
      "Lake View Balcony",
      "Full-time Staff",
      "Daily Housekeeping",
      "Garden Access",
    ],
    highlights: [
      "Organic Farming Experience",
      "Lake Overlooking Views",
      "Farm-to-Table Cuisine",
      "Agricultural Learning",
      "Culinary Culture",
      "Tranquil Setting",
    ],
    minNights: 2,
    mealsIncluded: ["Breakfast", "Lunch", "Dinner"],
    staffServices: ["Meal Preparation", "House Keeping", "Farm Guidance"],
  },
  {
    id: 4,
    name: "The Glamping Tent",
    type: "Glamping Experience",
    pricePerNight: 150,
    priceText: "$150/night",
    guests: 2,
    image:
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80",
    imageKey: "glamping_tent",
    description:
      "Experience comfortable wilderness living in our glamping tent with a double room and outdoor bathroom facilities. A perfect way to immerse yourself in nature while maintaining comfort and style.",
    amenities: [
      "1 Double Room",
      "Outdoor Bathroom",
      "Shower Facilities",
      "Living Space",
      "Comfortable Bedding",
      "Heating/Cooling",
      "Full-time Staff",
      "Daily Housekeeping",
      "Nature Immersion",
    ],
    highlights: [
      "Glamping Experience",
      "Comfortable Wilderness Stay",
      "Outdoor Living",
      "Nature Connection",
      "Star Gazing",
      "Adventure Spirit",
    ],
    minNights: 2,
    mealsIncluded: ["Breakfast", "Lunch", "Dinner"],
    staffServices: ["Meal Preparation", "House Keeping", "Guest Support"],
  },
];

// Cache for rooms
let roomsCache = null;
let cachePromise = null;

/**
 * Get all accommodation data from API
 * @returns {Promise<Array>} Array of accommodation objects
 */
export const getAccommodationData = async () => {
  if (roomsCache) {
    return roomsCache;
  }

  if (cachePromise) {
    return cachePromise;
  }

  cachePromise = fetchRoomsAPI()
    .then((data) => {
      roomsCache = (data && data.length > 0) ? data : accommodationData;
      cachePromise = null;
      return roomsCache;
    })
    .catch((error) => {
      cachePromise = null;
      console.error("Failed to fetch rooms from API, using static data:", error);
      return accommodationData;
    });

  return cachePromise;
};

/**
 * Get single accommodation by ID
 * @param {number|string} id - Accommodation ID
 * @returns {Promise<Object|null>} Accommodation object or null
 */
export const getAccommodationById = async (id) => {
  const rooms = await getAccommodationData();
  const numericId = parseInt(id);
  return rooms.find((room) => room.id === numericId) || null;
};
