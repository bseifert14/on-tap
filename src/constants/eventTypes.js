import { Volleyball, Gamepad, Utensils, Music, SquareMenu, Laugh, Podcast, BicepsFlexed, Palette } from "lucide-react";

export const EVENT_TYPE_FILTERS = [
  { label: "All", value: "All", icon: SquareMenu },
  { label: "Art", value: "Art", icon: Palette },
  { label: "Comedy", value: "Comedy", icon: Laugh },
  { label: "Food & Bev", value: "Food & Bev", icon: Utensils },
  { label: "Games", value: "Games", icon: Gamepad },
  { label: "Health & Fitness", value: "Health & Fitness", icon: BicepsFlexed },
  { label: "Music", value: "Music", icon: Music },
  { label: "Sports", value: "Sports", icon: Volleyball },
  { label: "Talks & Panels", value: "Talks & Panels", icon: Podcast }
];

export const EVENT_TYPE_LABELS = EVENT_TYPE_FILTERS.map(f => f.label).filter(v => v !== "All");
export const EVENT_TYPE_VALUES = EVENT_TYPE_FILTERS.map(f => f.value).filter(v => v !== "All");
