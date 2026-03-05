import {
  Volleyball,
  Gamepad,
  Utensils,
  Music,
  SquareMenu,
  Laugh,
  Podcast,
  BicepsFlexed,
  Palette,
  Star,
} from "lucide-react";

// UI filters
export const EVENT_TYPE_FILTERS = [
  { label: "All", value: "All", icon: SquareMenu },
  { label: "Events", value: "events", icon: Star },
  { label: "Wellness", value: "Wellness & Fitness", icon: BicepsFlexed },
  { label: "Food & Bev", value: "Food & Bev", icon: Utensils },
  { label: "Music", value: "Music", icon: Music },
  { label: "Art", value: "Art", icon: Palette },
  { label: "Comedy", value: "Comedy", icon: Laugh },
  { label: "Games", value: "Games", icon: Gamepad },
  { label: "Sports", value: "Sports", icon: Volleyball },
  { label: "Talks & Panels", value: "Talks & Panels", icon: Podcast },
];

// Event types coming from DB - table.column is events.event_type
export const EVENT_TYPES_DB = {
  MUSIC: "Music",
  WELLNESS: "Wellness & Fitness",
  FOOD: "Food & Bev",
  ART: "Art",
  COMEDY: "Comedy",
  GAMES: "Games",
  SPORTS: "Sports",
  TALKS: "Talks & Panels",
};

// Custom UI filters - grouped and singular
export const FILTER_TO_TYPES = {
  All: null,
  events: [
    EVENT_TYPES_DB.MUSIC,
    EVENT_TYPES_DB.COMEDY,
    EVENT_TYPES_DB.GAMES,
    EVENT_TYPES_DB.TALKS,
  ],
  Music: [EVENT_TYPES_DB.MUSIC],
  "Wellness & Fitness": [EVENT_TYPES_DB.WELLNESS],
  "Food & Bev": [EVENT_TYPES_DB.FOOD],
  Art: [EVENT_TYPES_DB.ART],
  Comedy: [EVENT_TYPES_DB.COMEDY],
  Games: [EVENT_TYPES_DB.GAMES],
  Sports: [EVENT_TYPES_DB.SPORTS],
  "Talks & Panels": [EVENT_TYPES_DB.TALKS],
};

/**
 * Helper for hooks:
 * returns a comma-separated string for the API param `type_in`
 * or "" if "All" / no filter.
 */
export function getTypeInParam(selectedType) {
  const list = FILTER_TO_TYPES[selectedType] ?? null;
  return Array.isArray(list) && list.length ? list.join(",") : "";
}

export const EVENT_TYPE_LABELS = EVENT_TYPE_FILTERS.map((f) => f.label).filter(
  (v) => v !== "All"
);

export const EVENT_TYPE_VALUES = EVENT_TYPE_FILTERS.map((f) => f.value).filter(
  (v) => v !== "All"
);
