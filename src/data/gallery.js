// src/data/gallery.js

import village01 from "../assets/images/gallery/village/village-01.jpg";
import village02 from "../assets/images/gallery/village/village-02.jpg";
import food01 from "../assets/images/gallery/food/food-01.jpg";
import food02 from "../assets/images/gallery/food/food-02.jpg";
import nature01 from "../assets/images/gallery/nature/nature-01.jpg";
import nature02 from "../assets/images/gallery/nature/nature-02.jpg";
import guide01 from "../assets/images/gallery/guides/guide-01.jpg";
import guide02 from "../assets/images/gallery/guides/guide-02.jpg";
import stay01 from "../assets/images/gallery/stay/stay-01.jpg";
import stay02 from "../assets/images/gallery/stay/stay-02.jpg";

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
    image: village01,
    alt: "Guests exploring village pathways in Etili",
    description:
      "A quiet and authentic glimpse into the daily rhythm of village life.",
  },
  {
    id: 2,
    title: "Local Community Moment",
    category: "Village Life",
    image: village02,
    alt: "A cultural moment with local villagers in Etili",
    description:
      "Meaningful interactions that make the experience feel personal and real.",
  },
  {
    id: 3,
    title: "Traditional Sri Lankan Meal",
    category: "Food",
    image: food01,
    alt: "Traditional Sri Lankan village meal served at Etili",
    description:
      "Fresh flavors, local ingredients, and a warm host-family atmosphere.",
  },
  {
    id: 4,
    title: "Cooking Experience",
    category: "Food",
    image: food02,
    alt: "Traditional cooking experience with local hosts in Etili",
    description:
      "Hands-on food preparation guided by local knowledge and tradition.",
  },
  {
    id: 5,
    title: "Peaceful Lakeside View",
    category: "Nature",
    image: nature01,
    alt: "Scenic natural landscape near Etili village",
    description:
      "A calm and refreshing environment that invites slower travel.",
  },
  {
    id: 6,
    title: "Nature and Open Skies",
    category: "Nature",
    image: nature02,
    alt: "Green countryside and sky around Etili village experience",
    description:
      "Beautiful rural surroundings that shape the peaceful feeling of the destination.",
  },
  {
    id: 7,
    title: "Guide in Action",
    category: "Guides",
    image: guide01,
    alt: "Local guide sharing stories with guests in Etili",
    description:
      "Guides help transform each visit into a more meaningful cultural experience.",
  },
  {
    id: 8,
    title: "Warm Guest Welcome",
    category: "Guides",
    image: guide02,
    alt: "Local guide welcoming visitors to Etili village",
    description:
      "Hospitality and human connection are at the heart of every journey.",
  },
  {
    id: 9,
    title: "Garden View Stay",
    category: "Stay",
    image: stay01,
    alt: "Accommodation surrounded by nature in Etili",
    description:
      "Comfortable stays designed for rest, calm, and easy access to experiences.",
  },
  {
    id: 10,
    title: "Countryside Room Detail",
    category: "Stay",
    image: stay02,
    alt: "Comfortable village accommodation interior in Etili",
    description:
      "Simple, warm, and peaceful spaces that complete the village escape.",
  },
];