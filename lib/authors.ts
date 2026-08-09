export type Author = {
  slug: string;
  name: string;
  bio: string;
  avatar: string;
  role: string;
  location: string;
  social: {
    twitter?: string;
    instagram?: string;
    website?: string;
  };
};

export const authors: Record<string, Author> = {
  "elena-marchetti": {
    slug: "elena-marchetti",
    name: "Elena Marchetti",
    role: "Founder & Lead Writer",
    bio: "Elena is a travel writer and photographer who has spent the last decade wandering across six continents. She founded Wander Journal to share slow, intentional travel stories from the road.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    location: "Lisbon, Portugal",
    social: {
      twitter: "elenamarchetti",
      instagram: "elena.wanders",
      website: "https://wander-journal.example.com",
    },
  },
  "marcus-okafor": {
    slug: "marcus-okafor",
    name: "Marcus Okafor",
    role: "Adventure & Outdoors Editor",
    bio: "Marcus is a former mountain guide turned writer, specializing in trekking, climbing, and remote wilderness expeditions. His work has taken him from Patagonia to the Himalayas.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    location: "Chamonix, France",
    social: {
      twitter: "marcusokafor",
      instagram: "marcus.climbs",
    },
  },
  "sofia-reyes": {
    slug: "sofia-reyes",
    name: "Sofia Reyes",
    role: "Food & Culture Writer",
    bio: "Sofia writes about the intersection of food, culture, and place. A self-taught cook and lifelong traveler, she documents street food scenes and family recipes from around the world.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    location: "Mexico City, Mexico",
    social: {
      instagram: "sofia.eats",
      website: "https://wander-journal.example.com",
    },
  },
};

export function getAuthor(slug: string): Author | undefined {
  return authors[slug];
}

export function getAllAuthors(): Author[] {
  return Object.values(authors);
}
