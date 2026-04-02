// src/data/gallery.js

import { images } from "../assets/images";

export const galleryCategories = [
  "All",
  "Village Life",
  "Food",
  "Nature",
  "Guides",
  "Stay",
];

export const galleryItems = [
  {
    id: 1,
    title: "Morning Village Walk",
    category: "Village Life",
    image: images.village01,
    alt: "Guests exploring village pathways in Etili",
    description:
      "A quiet and authentic glimpse into the daily rhythm of village life.",
    imageKey: "gallery_1",
  },
  {
    id: 2,
    title: "Local Community Moment",
    category: "Village Life",
    image: images.village02,
    alt: "A cultural moment with local villagers in Etili",
    description:
      "Meaningful interactions that make the experience feel personal and real.",
    imageKey: "gallery_2",
  },
  {
    id: 3,
    title: "Traditional Sri Lankan Meal",
    category: "Food",
    image: images.food01,
    alt: "Traditional Sri Lankan village meal served at Etili",
    description:
      "Fresh flavors, local ingredients, and a warm host-family atmosphere.",
    imageKey: "gallery_3",
  },
  {
    id: 4,
    title: "Cooking Experience",
    category: "Food",
    image: images.food02,
    alt: "Traditional cooking experience with local hosts in Etili",
    description:
      "Hands-on food preparation guided by local knowledge and tradition.",
    imageKey: "gallery_4",
  },
  {
    id: 5,
    title: "Peaceful Lakeside View",
    category: "Nature",
    image: images.nature01,
    alt: "Scenic natural landscape near Etili village",
    description:
      "A calm and refreshing environment that invites slower travel.",
    imageKey: "gallery_5",
  },
  {
    id: 6,
    title: "Nature and Open Skies",
    category: "Nature",
    image: images.nature02,
    alt: "Green countryside and sky around Etili village experience",
    description:
      "Beautiful rural surroundings that shape the peaceful feeling of the destination.",
    imageKey: "gallery_6",
  },
  {
    id: 7,
    title: "Guide in Action",
    category: "Guides",
    image: images.guide01,
    alt: "Local guide sharing stories with guests in Etili",
    description:
      "Guides help transform each visit into a more meaningful cultural experience.",
    imageKey: "gallery_7",
  },
  {
    id: 8,
    title: "Warm Guest Welcome",
    category: "Guides",
    image: images.guide02,
    alt: "Local guide welcoming visitors to Etili village",
    description:
      "Hospitality and human connection are at the heart of every journey.",
    imageKey: "gallery_8",
  },
  {
    id: 9,
    title: "Garden View Stay",
    category: "Stay",
    image: images.stay01,
    alt: "Accommodation surrounded by nature in Etili",
    description:
      "Comfortable stays designed for rest, calm, and easy access to experiences.",
    imageKey: "gallery_9",
  },
  {
    id: 10,
    title: "Countryside Room Detail",
    category: "Stay",
    image: images.stay02,
    alt: "Comfortable village accommodation interior in Etili",
    description:
      "Simple, warm, and peaceful spaces that complete the village escape.",
    imageKey: "gallery_10",
  },
];
