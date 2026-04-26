// SEO Metadata Configuration for Etili Village
// Used to set page-specific meta tags for better SEO

export const seoMetadata = {
  home: {
    title:
      "Etili Village - Authentic Community Tourism Experience in Sri Lanka",
    description:
      "Discover Etili Village, an award-winning community-based tourism enterprise in Sri Lanka's Uva Province. Experience authentic cultural encounters, wildlife adventures, and sustainable tourism.",
    keywords:
      "Etili Village, Sri Lanka tourism, community tourism, cultural experiences, Ella, Wellawaya",
    og: {
      title: "Etili Village - Authentic Community Tourism in Sri Lanka",
      description:
        "Award-winning community tourism enterprise offering authentic cultural experiences and sustainable stays.",
      type: "website",
    },
  },

  experiences: {
    title: "Experiences | Etili Village - Authentic Activities in Sri Lanka",
    description:
      "Explore unique experiences at Etili Village including cultural tours, wildlife encounters, traditional cooking classes, and more. Create unforgettable memories in Sri Lanka.",
    keywords:
      "experiences, activities, cultural tours, wildlife, adventure, Sri Lanka",
    og: {
      title: "Experiences at Etili Village",
      description:
        "Discover authentic and transformative experiences in Sri Lanka's heartland.",
      type: "website",
    },
  },

  accommodation: {
    title: "Accommodation | Etili Village - Comfortable Stays in Sri Lanka",
    description:
      "Choose from thoughtfully prepared rooms at Etili Village. Comfortable accommodation for couples, families, and travelers seeking a meaningful village escape near Ella and Wellawaya.",
    keywords:
      "accommodation, rooms, stay, lodge, resort, Ella, Sri Lanka, booking",
    og: {
      title: "Accommodation at Etili Village",
      description:
        "Comfortable and authentic accommodation options for your Sri Lankan getaway.",
      type: "website",
    },
  },

  stay: {
    title: "Stay | Etili Village - Complete Village Experience Packages",
    description:
      "Experience complete village stays at Etili Village combining accommodation, meals, and activities. Perfect for travelers seeking immersive cultural experiences.",
    keywords:
      "stay, packages, village experience, accommodation packages, Sri Lanka",
    og: {
      title: "Village Stay Packages at Etili Village",
      description:
        "Complete experience packages combining comfort, culture, and authentic village life.",
      type: "website",
    },
  },

  guides: {
    title: "Guides | Etili Village - Expert Local Guides in Sri Lanka",
    description:
      "Meet our experienced and passionate local guides who share authentic knowledge about Etili Village, local culture, wildlife, and the beautiful Uva Province.",
    keywords: "guides, local guides, tours, expert guides, Sri Lanka",
    og: {
      title: "Local Guides at Etili Village",
      description:
        "Passionate local guides offering authentic insights into village life and nature.",
      type: "website",
    },
  },

  gallery: {
    title: "Gallery | Etili Village - Photos & Images",
    description:
      "Browse our gallery featuring stunning photography of Etili Village, authentic village experiences, wildlife, cuisine, and guest moments.",
    keywords:
      "gallery, photos, images, village life, nature, Sri Lanka photography",
    og: {
      title: "Etili Village Photo Gallery",
      description:
        "Visual journey through authentic community tourism in Sri Lanka.",
      type: "website",
    },
  },

  about: {
    title: "About | Etili Village - Our Story & Mission",
    description:
      "Learn about Etili Village's journey as a community-based tourism enterprise dedicated to sustainable travel, cultural preservation, and local empowerment in Sri Lanka's Uva Province.",
    keywords:
      "about, mission, community, sustainability, rural tourism, Sri Lanka",
    og: {
      title: "About Etili Village",
      description:
        "Our commitment to authentic, sustainable, and community-centered tourism.",
      type: "website",
    },
  },

  contact: {
    title: "Contact | Etili Village - Get in Touch",
    description:
      "Plan your village escape at Etili Village. Share your preferences and we'll help you choose the perfect experience. Contact us today for bookings and inquiries.",
    keywords: "contact, booking, inquiries, reservations, WhatsApp, email",
    og: {
      title: "Contact Etili Village",
      description: "Get in touch to book your authentic Sri Lankan experience.",
      type: "website",
    },
  },

  comments: {
    title: "Reviews & Comments | Etili Village - Guest Testimonials",
    description:
      "Read real reviews and comments from our guests on TripAdvisor, Google, and other platforms. See why Etili Village is a top-rated community tourism destination.",
    keywords:
      "reviews, testimonials, ratings, guest comments, TripAdvisor, Google reviews",
    og: {
      title: "Guest Reviews & Testimonials",
      description:
        "See what our guests say about their Etili Village experience.",
      type: "website",
    },
  },

  activities: {
    title: "Activities | Etili Village - Things to Do in Sri Lanka",
    description:
      "Discover activities at Etili Village including nature walks, wildlife viewing, cultural immersion, cooking classes, and more exciting adventures.",
    keywords:
      "activities, things to do, nature, wildlife, adventure, Sri Lanka",
    og: {
      title: "Activities at Etili Village",
      description:
        "From nature to culture - diverse activities for all travelers.",
      type: "website",
    },
  },

  blog: {
    title: "Blog | Etili Village - Travel Tips & Stories",
    description:
      "Read travel guides, local insights, sustainability tips, and guest stories from Etili Village and the beautiful Uva Province of Sri Lanka.",
    keywords: "blog, travel tips, guides, stories, local insights, Sri Lanka",
    og: {
      title: "Etili Village Blog",
      description:
        "Stories, tips, and insights about authentic travel in Sri Lanka.",
      type: "website",
    },
  },

  impact: {
    title: "Impact | Etili Village - Community & Environment",
    description:
      "Learn how Etili Village creates positive impact through community empowerment, environmental conservation, and sustainable tourism practices.",
    keywords:
      "impact, community, sustainability, environment, social responsibility",
    og: {
      title: "Our Impact & Values",
      description: "How we're making a difference through responsible tourism.",
      type: "website",
    },
  },
};

// Helper function to get metadata for a page
export const getPageMetadata = (pageName) => {
  return seoMetadata[pageName] || seoMetadata.home;
};

// Helper to build structured data (JSON-LD)
export const getStructuredData = (type, data) => {
  const baseStructure = {
    "@context": "https://schema.org",
    "@type": type,
    name: "Etili Village",
    url: "https://etilivillage.com",
    description: "Award-winning community tourism enterprise in Sri Lanka",
  };

  switch (type) {
    case "Organization":
      return {
        ...baseStructure,
        logo: "https://etilivillage.com/logo.jpeg",
        sameAs: [
          "https://www.facebook.com/etilivillage",
          "https://www.instagram.com/etili_village_srilanka",
          "https://www.youtube.com/@etilivillage",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Service",
          telephone: "+94-11111111",
          email: "info@etilivillage.com",
        },
      };

    case "LocalBusiness":
      return {
        ...baseStructure,
        "@type": "LocalBusiness",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Wellawaya",
          addressRegion: "Uva Province",
          addressCountry: "LK",
        },
        telephone: "+94-11111111",
        priceRange: "$$",
      };

    case "TouristAttraction":
      return {
        ...baseStructure,
        "@type": "TouristAttraction",
        image: "https://etilivillage.com/og-image.jpg",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Wellawaya",
          addressRegion: "Uva Province",
          addressCountry: "LK",
        },
      };

    default:
      return baseStructure;
  }
};

export default seoMetadata;
