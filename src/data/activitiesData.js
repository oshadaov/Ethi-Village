import { getExperiences as fetchExperiencesAPI } from "../services/api";

export const activitiesData = [
  {
    id: "relaxation",
    slug: "relaxation-rejuvenation",
    title: "Relaxation & Rejuvenation",
    category: "Wellness",
    image: "/images/activities/relaxation.png",
    shortDescription: "Escape the stressful urban life with books, games, and meditative views.",
    description: "Etili Village is a perfect spot for relaxation and rejuvenation. For those who want to escape from the stressful urban life, we provide an extensive selection of books, games, swings, shaded sitouts, and stunning views for peaceful walks or meditation.",
    duration: "Flexible",
    difficulty: "Easy",
    groupType: "All",
    priceText: "Complimentary for guests",
    highlights: ["Shaded sitouts", "Extensive book collection", "Swings with views", "Meditation spots"],
    includes: ["Books & Games", "Swings", "Quiet zones"],
    bestFor: ["Meditation", "Reading", "Quiet Time"]
  },
  {
    id: "farm-tour",
    slug: "organic-farm-tours",
    title: "Organic Farm Tours",
    category: "Learning",
    image: "/images/activities/farm_tour.png",
    shortDescription: "Meet our farmers and learn about organic cultivation of herbs and spices.",
    description: "Guests are welcome to visit the organic farm, meet our farmers, and learn more about organic methods of cultivating a range of herbs and spices, fruits and vegetables. We offer guided tours every day from 10 am.",
    duration: "1-2 Hours",
    difficulty: "Easy",
    groupType: "Small Groups",
    priceText: "Free for guests",
    highlights: ["Meet local farmers", "Organic methods", "Spice cultivation", "Fruit & Vegetable picking"],
    includes: ["Guided tour", "Herbal tea", "Farm samples"],
    bestFor: ["Nature Lovers", "Families", "Students"]
  },
  {
    id: "wildlife",
    slug: "wildlife-bird-watching",
    title: "Wildlife & Bird Watching",
    category: "Nature",
    image: "/images/activities/wildlife.png",
    shortDescription: "Spot kingfishers, hornbills, and even elephants in their natural habitat.",
    description: "Our village is full of wildlife and birdlife. We commonly see baya weavers, kingfishers, hornbills, a variety of owl, peacocks, parrots, woodpeckers, eagles, as well as Jungle Fowl, Sri Lanka’s national bird. On hikes up the mountain or lake side, you are more than likely to see elephants, monkeys, deer, wild boars, rabbits and mongooses.",
    duration: "Flexible",
    difficulty: "Moderate",
    groupType: "Small Groups",
    priceText: "Guided treks available",
    highlights: ["Endemic bird species", "Elephants & Monkeys", "Guided wildlife treks", "Jungle fowl sightings"],
    includes: ["Binoculars on request", "Local guide"],
    bestFor: ["Photographers", "Bird Watchers", "Nature Enthusiasts"]
  },
  {
    id: "hiking",
    slug: "hiking-kandeyaya-rock",
    title: "Hiking & Nature Walks",
    category: "Adventure",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Witness spectacular views of the Uva basin from Kandeyaya rock.",
    description: "There are a variety of walks in and around the village. These range from walking through rice paddy fields to more adventurous hikes. A 30-minute walk takes you to the top of Kandeyaya rock, allowing you to witness the whole spectacular views of the Uva basin.",
    duration: "1-3 Hours",
    difficulty: "Moderate",
    groupType: "Groups",
    priceText: "Guided",
    highlights: ["Kandeyaya rock summit", "Uva basin views", "Paddy field walks", "Sunrise treks"],
    includes: ["Local guide", "Refreshments"],
    bestFor: ["Active Guests", "Hikers", "View Seekers"]
  },
  {
    id: "kayaking",
    slug: "kayaking-waterways",
    title: "Kayaking & Serene Waterways",
    category: "Adventure",
    image: "https://images.unsplash.com/photo-1544551763-47a0159f9234?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Paddle through mangrove-lined waterways and observe local life.",
    description: "Paddle through the serene, mangrove-lined waterways of the village, passing traditional fishing boats and lush paddy fields for an intimate look at local life.",
    duration: "2 Hours",
    difficulty: "Easy",
    groupType: "Individual/Pairs",
    priceText: "Equipment provided",
    highlights: ["Mangrove exploration", "Paddy field views", "Traditional fishing boats", "Bird watching"],
    includes: ["Kayaks", "Life jackets", "Basic instruction"],
    bestFor: ["Quiet Exploration", "Water Lovers"]
  },
  {
    id: "excursions",
    slug: "safaris-excursions",
    title: "Safaris & Excursions",
    category: "Day Trips",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "Day trips to Yala, Udawalawe, and historical sites like Buduruwagala.",
    description: "Use Etili village as a base for day-trips to popular sights. The wildlife parks at Yala, Lunugamwehera and Udawalawe are within 1 hour. Historical sites like the Buddhist statues at Buduruwagala are also nearby.",
    duration: "Full Day",
    difficulty: "Easy",
    groupType: "Large Groups",
    priceText: "Inquire for transport",
    highlights: ["Yala Safari", "Udawalawe Safari", "Buduruwagala statues", "Diyaluma Falls"],
    includes: ["Transport arrangement", "Packed picnics"],
    bestFor: ["Explorers", "Safari Seekers", "History Buffs"]
  }
];

// Cache for activities
let activitiesCache = null;
let cachePromise = null;

/**
 * Get all activities from API
 * @returns {Promise<Array>} Array of activity objects
 */
export const getActivities = async () => {
  if (activitiesCache) {
    return activitiesCache;
  }

  if (cachePromise) {
    return cachePromise;
  }

  cachePromise = fetchExperiencesAPI()
    .then((data) => {
      activitiesCache = (data && data.length > 0) ? data : activitiesData;
      cachePromise = null;
      return activitiesCache;
    })
    .catch((error) => {
      cachePromise = null;
      console.error("Failed to fetch activities from API, using static data:", error);
      return activitiesData;
    });

  return cachePromise;
};

/**
 * Get activity by slug
 * @param {string} slug 
 * @returns {Promise<Object>} Activity object
 */
export const getActivityBySlug = async (slugOrId) => {
  const activities = await getActivities();
  return activities.find(
    (activity) =>
      activity.slug === slugOrId || String(activity.id) === String(slugOrId),
  );
};
