import { Volleyball, Gamepad, Utensils, Music, SquareMenu, Laugh, Podcast, BicepsFlexed, Palette } from "lucide-react";

export const EVENT_TYPE_FILTERS = [
  { label: "All", value: "All", icon: SquareMenu },
  { label: "Music", value: "Music", icon: Music },
  { label: "Sports", value: "Sports", icon: Volleyball },
  { label: "Food & Bev", value: "Food & Bev", icon: Utensils },
  { label: "Games", value: "Games", icon: Gamepad },
  { label: "Comedy", value: "Comedy", icon: Laugh },
  { label: "Talks & Panels", value: "Talks & Panels", icon: Podcast },
  { label: "Wellness & Fitness", value: "Wellness & Fitness", icon: BicepsFlexed },
  { label: "Art", value: "Art", icon: Palette },
];

export const EVENT_TYPE_LABELS = EVENT_TYPE_FILTERS.map(f => f.label).filter(v => v !== "All");
export const EVENT_TYPE_VALUES = EVENT_TYPE_FILTERS.map(f => f.value).filter(v => v !== "All");
