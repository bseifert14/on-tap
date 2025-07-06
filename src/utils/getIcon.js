import {
    Volleyball,
    Gamepad,
    Baby,
    Utensils,
    Music,
    SquareMenu,
  } from "lucide-react";

export const getIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'music':
        return Music;
      case 'sports':
        return Volleyball;
      case 'games':
        return Gamepad;
      case 'kid friendly':
        return Baby;
      case 'food & bev':
        return Utensils;
      default:
        return SquareMenu;
    }
  };