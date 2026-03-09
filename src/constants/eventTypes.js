// import {
//   Volleyball,
//   Gamepad,
//   Utensils,
//   Music,
//   SquareMenu,
//   Laugh,
//   Podcast,
//   BicepsFlexed,
//   Palette,
//   Star,
//   Mountain,
//   Hammer,
// } from "lucide-react";

// // UI filters
// export const EVENT_TYPE_FILTERS = [
//   { label: "All", value: "All", icon: SquareMenu },
//   { label: "Events", value: "events", icon: Star },
//   { label: "Fitness", value: "Wellness & Fitness", icon: BicepsFlexed },
//   { label: "Food & Drink", value: "Food & Bev", icon: Utensils },
//   { label: "Music", value: "Music", icon: Music },

//   // NEED TO ADD TO DATABASE
//   { label: "Outdoors", value: "outdoors", icon: Mountain },
//   { label: "Workshops", value: "workshops", icon: Hammer },
//   { label: "Music", value: "Music", icon: Music },
//   // { label: "Art", value: "Art", icon: Palette },
//   // { label: "Comedy", value: "Comedy", icon: Laugh },
//   // { label: "Games", value: "Games", icon: Gamepad },
//   // { label: "Sports", value: "Sports", icon: Volleyball },
//   // { label: "Talks & Panels", value: "Talks & Panels", icon: Podcast },
// ];

// // Event types coming from DB - table.column is events.event_type
// export const EVENT_TYPES_DB = {
//   MUSIC: "music",
//   WELLNESS: "Wellness & Fitness",
//   FOOD: "Food & Bev",

//   OUTDOORS: "outdoors",
//   WORKSHOPS: "workshops",

//   ART: "Art",
//   COMEDY: "Comedy",
//   GAMES: "Games",
//   SPORTS: "Sports",
//   TALKS: "Talks & Panels",
// };

// Custom UI filters - grouped and singular
// export const FILTER_TO_TYPES = {
// All: null,
// events: [
// EVENT_TYPES_DB.MUSIC,
// EVENT_TYPES_DB.COMEDY,
// EVENT_TYPES_DB.GAMES,
// EVENT_TYPES_DB.TALKS,
// ],
// Music: [EVENT_TYPES_DB.MUSIC],
// "Wellness & Fitness": [EVENT_TYPES_DB.WELLNESS],
// "Food & Bev": [EVENT_TYPES_DB.FOOD],

// outdoors: [EVENT_TYPES_DB.OUTDOORS],
// workshops: [EVENT_TYPES_DB.WORKSHOPS],


// Art: [EVENT_TYPES_DB.ART],
// Comedy: [EVENT_TYPES_DB.COMEDY],
// Games: [EVENT_TYPES_DB.GAMES],
// Sports: [EVENT_TYPES_DB.SPORTS],
// "Talks & Panels": [EVENT_TYPES_DB.TALKS],
// };


// export const FILTER_TO_TYPES = {
//   events: ["events", "festival", "holiday", "fundraiser", "networking", "family", EVENT_TYPES_DB.MUSIC],
//   outdoors: ["outdoors", "skiing", "hiking", "cycling", "running", "climbing"],
//   fitness:  ["fitness", "yoga", "wellness", "meditation"],
//   "food-drink": ["food-drink", "wine-tasting", "beer-tasting", "dinner", "brunch", "cooking-class", "farmers-market"],
//   workshops:  ["workshops", "pottery", "painting", "photography", "woodworking", "jewelry-making", "textile-fiber"],
// };

/**
 * Helper for hooks:
 * returns a comma-separated string for the API param `type_in`
 * or "" if "All" / no filter.
 */
// export function getTypeInParam(selectedType) {
//   const list = FILTER_TO_TYPES[selectedType] ?? null;
//   return Array.isArray(list) && list.length ? list.join(",") : "";
// }

// export const EVENT_TYPE_LABELS = EVENT_TYPE_FILTERS.map((f) => f.label).filter(
//   (v) => v !== "All"
// );

// export const EVENT_TYPE_VALUES = EVENT_TYPE_FILTERS.map((f) => f.value).filter(
//   (v) => v !== "All"
// );


import {
  Utensils, Music, SquareMenu, BicepsFlexed, Star, Mountain, Hammer,
  CalendarDays, Trees, Laugh, Gamepad, Mic, HelpCircle, Theater,
  Footprints, Bike, PersonStanding, Drama, Film, Wine, Beer,
  ChefHat, Leaf, Flower2, Camera, Wrench, Gem, Scissors, Dumbbell,
  HeartPulse, Brain, Users, Gift, Globe, Trophy, Volleyball
} from "lucide-react";

// ── MASTER EVENT TYPE REGISTRY ─────────────────────────────────────
// Single source of truth for every event type in the system
export const EVENT_TYPES = {
  // ── Events
  events: { label: "Events", slug: "events", icon: CalendarDays},
  games : { label: "Games", slug: "games", icon: Gamepad },
  festival: { label: "Festival", slug: "festival", icon: Star },
  holiday: { label: "Holiday", slug: "holiday", icon: Gift },
  fundraiser: { label: "Fundraiser", slug: "fundraiser", icon: HeartPulse },
  networking: { label: "Networking", slug: "networking", icon: Users },
  family: { label: "Family",  slug: "family",  icon: Users },
  music: { label: "Music", slug: "music", icon: Music },
  comedy: { label: "Comedy",  slug: "comedy",  icon: Laugh },
  theater: { label: "Theater", slug: "theater", icon: Drama },
  dance: { label: "Dance", slug: "dance", icon: PersonStanding},
  film: { label: "Film",  slug: "film",  icon: Film },
  "open-mic":  { label: "Open Mic",  slug: "open-mic", icon: Mic  },
  trivia: { label: "Trivia",  slug: "trivia",  icon: HelpCircle  },

  // ── Outdoors
  outdoors: { label: "Outdoors", slug: "outdoors", icon: Mountain },
  skiing: { label: "Skiing", slug: "skiing", icon: Mountain },
  hiking: { label: "Hiking",  slug: "hiking", icon: Footprints },
  cycling: { label: "Cycling", slug: "cycling", icon: Bike },
  running: { label: "Running", slug: "running", icon: Trophy },
  climbing: { label: "Climbing",  slug: "climbing",  icon: Globe },

  // ── Fitness
  fitness: { label: "Fitness", slug: "fitness", icon: BicepsFlexed },
  yoga: { label: "Yoga",  slug: "yoga",  icon: Flower2 },
  wellness: { label: "Wellness",  slug: "wellness", icon: Dumbbell },
  meditation: { label: "Meditation", slug: "meditation", icon: Brain },

  // ── Food & Drink
  "food-drink": { label: "Food & Drink", slug: "food-drink", icon: Utensils },
  "wine-tasting": { label: "Wine Tasting", slug: "wine-tasting", icon: Wine },
  "beer-tasting": { label: "Beer Tasting", slug: "beer-tasting", icon: Beer },
  dinner: { label: "Dinner", slug: "dinner",  icon: Utensils },
  brunch: { label: "Brunch", slug: "brunch",  icon: ChefHat },
  "cooking-class": { label: "Cooking Class", slug: "cooking-class",  icon: ChefHat },
  "farmers-market": { label: "Farmers Market", slug: "farmers-market", icon: Leaf },

  // ── Workshops
  workshops: { label: "Workshops", slug: "workshops", icon: Hammer },
  pottery: { label: "Pottery", slug: "pottery", icon: Gem },
  painting: { label: "Painting",  slug: "painting",  icon: Wrench },
  photography: { label: "Photography",  slug: "photography", icon: Camera },
  woodworking: { label: "Woodworking",  slug: "woodworking", icon: Hammer },
  "jewelry-making": { label: "Jewelry Making", slug: "jewelry-making", icon: Gem },
  "textile-fiber": { label: "Textile & Fiber", slug: "textile-fiber",  icon: Scissors },
};

// ── UI FILTER BAR ──────────────────────────────────────────────────
// Top-level tabs shown in the filter bar
export const EVENT_TYPE_FILTERS = [
  { label: "All", value: "all", icon: SquareMenu  },
  { label: "Events",  value: "events", icon: CalendarDays},
  { label: "Outdoors", value: "outdoors", icon: Mountain  },
  { label: "Fitness", value: "fitness",  icon: Dumbbell  },
  { label: "Food & Drink", value: "food-drink", icon: Utensils  },
  { label: "Workshops",  value: "workshops",  icon: Hammer },
];

// ── FILTER → SLUG GROUPS ───────────────────────────────────────────
export const FILTER_TO_TYPES = {
  events:  ["events","festival","holiday","fundraiser","networking","family","music","comedy","theater","dance","film","open-mic","trivia"],
  outdoors: ["outdoors","skiing","hiking","cycling","running","climbing"],
  fitness: ["fitness","yoga","wellness","meditation"],
  "food-drink": ["food-drink","wine-tasting","beer-tasting","dinner","brunch","cooking-class","farmers-market"],
  workshops:  ["workshops","pottery","painting","photography","woodworking","jewelry-making","textile-fiber"],
};

// ── HELPERS ────────────────────────────────────────────────────────
export function getTypeInParam(selectedType) {
  if (!selectedType || selectedType === "all") return "";
  const list = FILTER_TO_TYPES[selectedType] ?? null;
  return Array.isArray(list) && list.length ? list.join(",") : "";
}

// Look up icon for any slug — used in cards, modals, etc.
export function getIconForSlug(slug) {
  return EVENT_TYPES[slug]?.icon ?? CalendarDays;
}

// Look up label for any slug
export function getLabelForSlug(slug) {
  return EVENT_TYPES[slug]?.label ?? slug;
}

export const EVENT_TYPE_LIST = Object.values(EVENT_TYPES);