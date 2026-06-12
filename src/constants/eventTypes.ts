import {
  Utensils, Music, SquareMenu, BicepsFlexed, Star, Mountain, Hammer,
  CalendarDays, Laugh, Gamepad, Mic, HelpCircle,
  Footprints, Bike, PersonStanding, Drama, Film, Wine, Beer,
  ChefHat, Leaf, Flower2, Camera, Wrench, Gem, Scissors, Dumbbell,
  HeartPulse, Brain, Users, Gift, Globe, Trophy,
  Palette
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
  "talks-panels": { label: "Talks & Panels", slug: "talks-panels", icon: Mic },
  "art": { label: "Art", slug: "art", icon: Palette },

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
  pilates: { label: "Pilates", slug: "pilates", icon: HeartPulse },
  barre: { label: "Barre", slug: "barre", icon: PersonStanding },
  "indoor-cycling": { label: "Indoor Cycling", slug: "indoor-cycling", icon: Bike },

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
  { label: "Fitness", value: "fitness",  icon: BicepsFlexed  },
  { label: "Food & Drink", value: "food-drink", icon: Utensils  },
  { label: "Outdoors", value: "outdoors", icon: Mountain  },
  { label: "Workshops",  value: "workshops",  icon: Hammer },
];

// ── FILTER → SLUG GROUPS ───────────────────────────────────────────
export const FILTER_TO_TYPES = {
  events:  ["events","festival","holiday","fundraiser","networking","family","music","comedy","theater",
    "dance","film","open-mic","trivia","games","talks-panels","art"
  ],
  outdoors: ["outdoors","skiing","hiking","cycling","running","climbing"],
  fitness: ["fitness","yoga","wellness","meditation","pilates","barre", "indoor-cycling"],
  "food-drink": ["food-drink","wine-tasting","beer-tasting","dinner","brunch","cooking-class","farmers-market"],
  workshops:  ["workshops","pottery","painting","photography","woodworking","jewelry-making","textile-fiber"],
};

// ── HELPERS ────────────────────────────────────────────────────────
export function getParentCategory(type: string) {
  if (!type || type === "all") return "all";
  if (type in FILTER_TO_TYPES) return type;
  for (const [cat, types] of Object.entries(FILTER_TO_TYPES)) {
    if (types.includes(type) && type !== cat) return cat;
  }
  return "all";
}

export function getTypeInParam(selectedType: string | string[]): string[] | null {
  if (Array.isArray(selectedType)) {
    const result = selectedType.flatMap(t => getTypeInParam(t) ?? []);
    return result.length ? result : null;
  }
  if (selectedType in FILTER_TO_TYPES) {
    return FILTER_TO_TYPES[selectedType as keyof typeof FILTER_TO_TYPES];
  } else if (EVENT_TYPES.hasOwnProperty(selectedType)) {
    return [selectedType];
  } else {
    return null;
  }
}

// Look up icon for any slug — used in cards and modals
export function getIconForSlug(slug: string) {
    const icon = EVENT_TYPES[slug as keyof typeof EVENT_TYPES]?.icon;
    return icon ?? CalendarDays;
}

// Look up label for any slug
export function getLabelForSlug(slug: string) {
    const label = EVENT_TYPES[slug as keyof typeof EVENT_TYPES]?.label;
    return label ?? slug;
}

export const EVENT_TYPE_LIST = Object.values(EVENT_TYPES);